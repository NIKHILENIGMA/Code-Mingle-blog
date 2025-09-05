import { Request, Response } from 'express'
import { appConfig } from '@/config'
import {
    ResetPasswordCredentials,
    SignupCredientials,
    LoginCredientials,
    ForgotPasswordCredientials,
    LoginDTO,
    ChangePassword,
    OAuthProvider,
    CreateUserByGoogleOAuthPayload
} from './auth.types'
import { forgotPasswordSchema, resetPasswordSchema, signupSchema } from './auth.validator'
import { ApiResponse, AsyncHandler, entitiesValidation, tokenManagement } from '@/utils'
import { BadRequestError, ConflictError, DatabaseError, ForbiddenError, NotFoundError, UnauthorizedError } from '@/utils/Errors'
import { ENUMS } from '@/types'
import {
    ACCESS_COOKIE_NAME,
    ACCESS_TOKEN_VALIDITY_IN_SEC,
    IS_PRODUCTION,
    REFRESH_COOKIE_NAME,
    REFRESH_TOKEN_VALIDITY_IN_SEC
} from '@/config/app.config'
import { authServices } from '../authentication/auth.service'
import { googleService, sessionService } from '@/api'
import { HTTP_STATUS_CODES } from '@/constant'
import { logger } from '@/utils/logger'
import { changePassword } from '@/features/authentication/auth.validator'
import { EUserProvider } from '@/types/common/enum.types'

/**
 * Registers a new user with traditional email/password authentication.
 * 
 * This endpoint handles the complete user registration process including
 * credential validation, duplicate email checking, and user creation.
 * It validates the request body against the signup schema and ensures
 * email uniqueness before creating the user account.
 * 
 * @param req - Express request object containing signup credentials
 * @param req.body - Signup credentials object
 * @param req.body.firstName - User's first name
 * @param req.body.lastName - User's last name
 * @param req.body.email - User's email address (must be unique)
 * @param req.body.password - User's password (will be hashed)
 * @param res - Express response object
 * @throws {ConflictError} When a user with the provided email already exists
 * @throws {DatabaseError} When user creation fails in the database
 * @throws {ValidationError} When request body validation fails
 * 
 * @example
 * POST /auth/signup
 * Content-Type: application/json
 * 
 * {
 *   "firstName": "John",
 *   "lastName": "Doe",
 *   "email": "john.doe@example.com",
 *   "password": "securePassword123"
 * }
 */
export const signup = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    // Extract the user credentials from the request body
    const signupCredientials = req.body as SignupCredientials

    const hostname = req.headers.host

    logger.info(`Signup request received from host: ${hostname}`)

    // Validate the request body against the signup schema
    const credientials = entitiesValidation<SignupCredientials>(signupSchema, signupCredientials)

    // Check if the user already exists
    const existingUser = await authServices.verifyUserByEmail(credientials.email)
    if (existingUser) {
        // If the user already exists, throw an error
        throw new ConflictError('User with this email already exists')
    }

    // Register the user
    const newUser = await authServices.registerUser(credientials)
    if (!newUser) {
        // If the user registration fails, throw an error
        throw new DatabaseError('Failed to create user')
    }

    // Send a success response
    return ApiResponse(req, res, HTTP_STATUS_CODES.CREATED, 'User created successfully', null)
})

/**
 * Authenticates a user with email and password credentials.
 * 
 * This endpoint performs user authentication by validating credentials,
 * generating JWT tokens, creating a user session, and setting secure
 * HTTP-only cookies. It invalidates any existing sessions for the user
 * to ensure single-session security.
 * 
 * @param req - Express request object containing login credentials
 * @param req.body - Login credentials object
 * @param req.body.email - User's email address
 * @param req.body.password - User's password
 * @param res - Express response object
 * @returns Promise resolving to user data and authentication tokens
 * @throws {DatabaseError} When authentication fails or token generation fails
 * @throws {UnauthorizedError} When credentials are invalid
 * 
 * @example
 * POST /auth/login
 * Content-Type: application/json
 * 
 * {
 *   "email": "john.doe@example.com",
 *   "password": "securePassword123"
 * }
 */
export const login = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    // Get the user credentials
    const credientials = req.body as LoginCredientials

    // Attempt to log in the user
    const loggedInUser = await authServices.loginUser(credientials)
    if (!loggedInUser) {
        // If the login fails, throw an error
        throw new DatabaseError('User name or password is invalid')
    }

    // Generate access and refresh tokens for the user
    const accessToken = await tokenManagement.createAccessToken(loggedInUser.user, loggedInUser.permissions)
    const refreshToken = await tokenManagement.createRefreshToken(loggedInUser.user.id, loggedInUser.user.email)
    if (!accessToken || !refreshToken) {
        throw new DatabaseError('Failed to generate tokens for the user')
    }

    // This will invalidate all existing sessions for the user and create a new session for the logged-in user
    await sessionService.createSessionForLoginUser({
        userId: loggedInUser.user.id,
        userAgent: req.headers['user-agent'] || '',
        ipAddress: req.ip,
        accessToken: accessToken,
        refreshToken: refreshToken
    })

    // Set the tokens in the cookies
    res.cookie(ACCESS_COOKIE_NAME, accessToken, {
        httpOnly: true,
        secure: !IS_PRODUCTION,
        sameSite: 'strict',
        maxAge: 1000 * ACCESS_TOKEN_VALIDITY_IN_SEC
    }).cookie(REFRESH_COOKIE_NAME, refreshToken, {
        httpOnly: true,
        secure: !IS_PRODUCTION,
        sameSite: 'strict',
        maxAge: 1000 * REFRESH_TOKEN_VALIDITY_IN_SEC
    })

    const response: LoginDTO = {
        user: {
            id: loggedInUser.user.id,
            firstName: loggedInUser.user.firstName!,
            lastName: loggedInUser.user.lastName,
            email: loggedInUser.user.email,
            username: loggedInUser.user.username,
            profileImage: loggedInUser.user.profileImage,
            roleId: loggedInUser.user.roleId!,
            verifiedEmail: loggedInUser.user.verifiedEmail
        },
        tokens: {
            accessToken,
            refreshToken
        }
    }

    return ApiResponse(req, res, 200, 'User logged in successfully', response)
})

/**
 * Logs out the current authenticated user.
 * 
 * This endpoint handles secure user logout by invalidating all active
 * sessions for the user and clearing authentication cookies. It ensures
 * complete session cleanup to prevent unauthorized access.
 * 
 * @param req - Express request object with authenticated user
 * @param req.user - Authenticated user object from middleware
 * @param req.user.id - User's unique identifier
 * @param res - Express response object
 * @throws {UnauthorizedError} When user is not authenticated
 * 
 * @example
 * POST /auth/logout
 * Authorization: Bearer <access_token>
 */
export const logout = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    // Get the current user ID
    const userId: string | undefined = req.user?.id
    if (!userId) {
        throw new UnauthorizedError('User not logged in')
    }
    // Invalidate the session
    await sessionService.invalidateAllSessionsByUserId(userId)

    res.clearCookie(ACCESS_COOKIE_NAME, {
        httpOnly: true,
        secure: !(appConfig.ENV === ENUMS.EApplicationEnvironment.PRODUCTION),
        sameSite: 'strict'
    }).clearCookie(REFRESH_COOKIE_NAME, {
        httpOnly: true,
        secure: !(appConfig.ENV === ENUMS.EApplicationEnvironment.PRODUCTION),
        sameSite: 'strict'
    })

    ApiResponse(req, res, 200, 'User logged out successfully', null)
})

/**
 * Refreshes an expired access token using a valid refresh token.
 * 
 * This endpoint handles token refresh functionality by validating the
 * refresh token, generating new access and refresh tokens, and updating
 * the user session. It ensures continuous authentication without requiring
 * re-login when access tokens expire.
 * 
 * @param req - Express request object containing cookies
 * @param req.cookies - HTTP cookies object
 * @param req.cookies.access_token - Current access token (optional)
 * @param req.cookies.refresh_token - Valid refresh token for regeneration
 * @param res - Express response object
 * @returns Promise resolving to new authentication tokens
 * @throws {UnauthorizedError} When refresh token is missing or invalid
 * @throws {ForbiddenError} When session has expired or is invalid
 * 
 * @example
 * POST /auth/refresh
 * Cookie: refresh_token=<valid_refresh_token>
 */
export const refreshAccessToken = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    // Check if the user is already logged in
    const tokens = req.cookies as {
        access_token?: string
        refresh_token?: string
    }

    // If the user is already logged in, respond with the access token
    if (tokens['access_token']) {
        return ApiResponse(req, res, 200, 'User already logged in', {
            accessToken: tokens['access_token']
        })
    }
    // Get the refresh token from the request
    if (!tokens?.['refresh_token']) {
        throw new UnauthorizedError('Refresh token not found')
    }

    // Verify the refresh token
    const decodedToken = await tokenManagement.verifyRefreshToken(tokens['refresh_token'])
    if (!decodedToken) {
        throw new UnauthorizedError('Invalid refresh token')
    }

    const session = await sessionService.getSessionByUserId(decodedToken.sub)
    if (!session) {
        throw new ForbiddenError('Session has expired or is invalid')
    }
    logger.info(`Refreshing access token for user ID: ${decodedToken.sub}`, {
        userId: decodedToken.sub,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'] || ''
    })

    // Verify the refresh token
    const userExist = await authServices.getUserDetailsAndPermissions(decodedToken.email)

    // Generate new access and refresh tokens
    const newAccessToken = await tokenManagement.createAccessToken(userExist.user, userExist.permissions)
    const newRefreshToken = await tokenManagement.createRefreshToken(userExist.user.id, userExist.user.email)

    // Update the session with the new tokens
    await sessionService.updateSession(session.id, {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
    })

    // Set the new tokens in the cookies
    res.cookie('access_token', newAccessToken, {
        httpOnly: true,
        secure: !IS_PRODUCTION,
        sameSite: 'strict',
        maxAge: 1000 * ACCESS_TOKEN_VALIDITY_IN_SEC
    }).cookie('refresh_token', newRefreshToken, {
        httpOnly: true,
        secure: !IS_PRODUCTION,
        sameSite: 'strict',
        maxAge: 1000 * REFRESH_TOKEN_VALIDITY_IN_SEC
    })

    ApiResponse(req, res, 200, 'Token refreshed successfully', {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
    })
})


/**
 * Changes the password for an authenticated user.
 * 
 * This endpoint allows authenticated users to change their password by
 * providing their current password and a new password. It validates the
 * request data and ensures the new password confirmation matches before
 * updating the user's password in the database.
 * 
 * @param req - Express request object with authenticated user
 * @param req.user - Authenticated user object from middleware
 * @param req.user.id - User's unique identifier
 * @param req.body - Password change credentials
 * @param req.body.oldPassword - User's current password for verification
 * @param req.body.newPassword - New password to set
 * @param req.body.confirmPassword - Confirmation of new password
 * @param res - Express response object
 * @throws {UnauthorizedError} When user is not authenticated
 * @throws {ForbiddenError} When password confirmation doesn't match
 * @throws {ValidationError} When request body validation fails
 * 
 * @example
 * PUT /auth/change-password
 * Authorization: Bearer <access_token>
 * Content-Type: application/json
 * 
 * {
 *   "oldPassword": "currentPassword123",
 *   "newPassword": "newSecurePassword456",
 *   "confirmPassword": "newSecurePassword456"
 * }
 */
export const changeUserPassword = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.id
    if (!userId) {
        throw new UnauthorizedError('User not logged in')
    }

    // Validate the request body
    const { oldPassword, newPassword, confirmPassword } = req.body as ChangePassword
    if (newPassword !== confirmPassword) {
        throw new ForbiddenError('New password and confirm password do not match')
    }

    const validateData = entitiesValidation<ChangePassword>(changePassword, {
        oldPassword,
        newPassword,
        confirmPassword
    })

    // Validate and change the user's password
    await authServices.updateUserPassword(userId, validateData.oldPassword, validateData.newPassword)

    ApiResponse(req, res, 200, 'Password changed successfully', null)
})

/**
 * Retrieves the current authenticated user's information.
 * 
 * This endpoint returns the profile information of the currently
 * authenticated user. It extracts user data from the request object
 * (populated by authentication middleware) and returns relevant
 * user profile details.
 * 
 * @param req - Express request object with authenticated user
 * @param req.user - Authenticated user object from middleware
 * @param res - Express response object
 * @returns User profile information object
 * @throws {UnauthorizedError} When user is not authenticated
 * 
 * @example
 * GET /auth/me
 * Authorization: Bearer <access_token>
 * 
 * Response:
 * {
 *   "id": "user123",
 *   "firstName": "John",
 *   "lastName": "Doe",
 *   "email": "john.doe@example.com",
 *   "username": "johndoe",
 *   "profileImage": "https://example.com/profile.jpg",
 *   "roleId": "role456",
 *   "verifiedEmail": true
 * }
 */
export const currentUser = (req: Request, res: Response): void => {
    // Get the current user from the request
    const user = req.user

    // If the user is not authenticated, throw an error
    if (!user) {
        throw new UnauthorizedError('User not authenticated')
    }

    const response = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        profileImage: user.profileImage,
        roleId: user.roleId,
        verifiedEmail: user.verifiedEmail
    }

    // Respond with the current user information
    ApiResponse(req, res, 200, 'Current user retrieved successfully', response)
}

/**
 * Handles Google OAuth signup callback for new user registration.
 * 
 * This endpoint processes the OAuth authorization code received from Google
 * after user consent, exchanges it for tokens, verifies user information,
 * and creates a new user account. It handles the complete OAuth signup flow
 * including session creation and cookie management.
 * 
 * @param req - Express request object containing OAuth authorization code
 * @param req.body - Request body object
 * @param req.body.code - Authorization code from Google OAuth flow
 * @param res - Express response object
 * @returns Promise resolving to user data and authentication tokens
 * @throws {NotFoundError} When authorization code is missing or token exchange fails
 * @throws {ConflictError} When user with email already exists
 * @throws {DatabaseError} When user creation or token generation fails
 * 
 * @example
 * POST /auth/google/signup/callback
 * Content-Type: application/json
 * 
 * {
 *   "code": "4/0AX4XfWh7..."
 * }
 */
export const googleSignUpCallback = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { code } = req.body as { code?: string }
    if (typeof code !== 'string' || !code) {
        throw new NotFoundError('Authorization code is required')
    }

    // Exchange the authorization code for tokens
    const OAuthToken  = await googleService.exchangeGoogleCodeForToken(code)
    if (!OAuthToken) {
        throw new NotFoundError('Failed to exchange authorization code for tokens', 'AuthController.googleSignUpCallback')
    }

    if (!OAuthToken.tokens.id_token) {
        throw new NotFoundError('ID token not found in the OAuth response', 'AuthController.googleSignUpCallback')
        
    }
    // Check if the user already exists in the database
    const userExist = await authServices.verifyUserByEmail(OAuthToken.userInfo.email!)
    if (userExist) {
        throw new ConflictError('User with this email already exists', 'AuthController.googleSignUpCallback')
    }

    // If the user does not exist, create a new user with the OAuth data
    const payload: CreateUserByGoogleOAuthPayload = {
        given_name: OAuthToken.userInfo.given_name || '',
        family_name: OAuthToken.userInfo.family_name || '',
        email: OAuthToken.userInfo.email || '',
        picture: OAuthToken.userInfo.picture || '',
        sub: OAuthToken.userInfo.sub || '',
        provider: OAuthProvider.GOOGLE,
        accessToken: OAuthToken.tokens.access_token!,
        refreshToken: OAuthToken.tokens.refresh_token! || undefined,
        tokenExpiry: new Date(Date.now() + OAuthToken.tokens.expiry_date! * 1000) // Convert seconds to milliseconds
    }

    // If the user does not exist, create a new user with the OAuth data
    const { user, permissions } = await googleService.createUserWithGoogleOAuth(payload)

    if (!user || !permissions) {
        throw new DatabaseError('Failed to create user with Google OAuth', 'AuthController.googleSignUpCallback')
    }

    // Generate access and refresh tokens for the user
    const accessToken = await tokenManagement.createAccessToken(user, permissions)
    const refreshToken = await tokenManagement.createRefreshToken(user.id, user.email)

    if (!accessToken || !refreshToken) {
        throw new DatabaseError('Failed to generate tokens for the user', 'AuthController.googleSignUpCallback')
    }

    // Create a new session for the user
    await sessionService.createSessionForLoginUser({
        userId: user.id,
        userAgent: req.headers['user-agent'] || '',
        ipAddress: req.ip,
        accessToken: accessToken,
        refreshToken: refreshToken
    })

    // Set the tokens in the cookies
    res.cookie(ACCESS_COOKIE_NAME, accessToken, {
        httpOnly: true,
        secure: !IS_PRODUCTION,
        sameSite: 'strict',
        maxAge: 1000 * ACCESS_TOKEN_VALIDITY_IN_SEC
    }).cookie(REFRESH_COOKIE_NAME, refreshToken, {
        httpOnly: true,
        secure: !IS_PRODUCTION,
        sameSite: 'strict',
        maxAge: 1000 * REFRESH_TOKEN_VALIDITY_IN_SEC
    })

    // Respond with the user information and tokens
    const response = {
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
            profileImage: user.profileImage,
            roleId: user.roleId!,
            verifiedEmail: user.verifiedEmail
        },
        tokens: {
            accessToken,
            refreshToken
        }
    }
    ApiResponse(req, res, 200, 'User signed up successfully', response)
})

/**
 * Handles Google OAuth login callback for existing users.
 * 
 * This endpoint processes the OAuth authorization code for user authentication,
 * verifies that the user exists and has their Google account linked, then
 * generates authentication tokens and creates a new session. It ensures
 * secure OAuth login flow for existing users.
 * 
 * @param req - Express request object containing OAuth authorization code
 * @param req.body - Request body object
 * @param req.body.code - Authorization code from Google OAuth flow
 * @param res - Express response object
 * @throws {NotFoundError} When authorization code is missing, token exchange fails, or user doesn't exist
 * @throws {ForbiddenError} When Google account is not linked to the user
 * @throws {DatabaseError} When user details retrieval or token generation fails
 * 
 * @example
 * POST /auth/google/login/callback
 * Content-Type: application/json
 * 
 * {
 *   "code": "4/0AX4XfWh7..."
 * }
 */
export const googleLoginCallback = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    // Get the authorization code from the request body
    const { code } = req.body as { code?: string }
    if (code !== typeof 'string' && !code) {
        throw new NotFoundError('Authorization code is required')
    }
    // Exchange the authorization code for tokens
    const OAuthToken = await googleService.exchangeGoogleCodeForToken(code)
    if (!OAuthToken) {
        throw new NotFoundError('Failed to exchange authorization code for tokens', 'AuthController.googleLoginCallback')
    }

    if (!OAuthToken.tokens.id_token) {
        throw new NotFoundError('ID token not found in the OAuth response', 'AuthController.googleLoginCallback')
    }

    if (!OAuthToken.userInfo.email) {
        throw new NotFoundError('Email not found in the OAuth response', 'AuthController.googleLoginCallback')
    }

    // Check if the user already exists in the database
    const userExist = await authServices.verifyUserByEmail(OAuthToken.userInfo.email)
    if (!userExist) {
        throw new NotFoundError('User with this email does not exist')
    }
    // If the user exists and has not linked their Google account, link the Google account
    const isLinked = await googleService.isGoogleAccountLinked(userExist.id, OAuthToken.userInfo?.sub, EUserProvider.GOOGLE)
    if (!isLinked) {
        throw new ForbiddenError('Google account is not linked to this user', 'AuthController.googleLoginCallback')
    }

    // If the user exists, generate access and refresh tokens
    const { user, permissions } = await authServices.getUserDetailsAndPermissions(userExist.email)
    if (!user || !permissions) {
        throw new DatabaseError('Failed to retrieve user details and permissions', 'AuthController.googleLoginCallback')
    }

    // Generate access and refresh tokens for the user
    const accessToken = await tokenManagement.createAccessToken(user, permissions)
    const refreshToken = await tokenManagement.createRefreshToken(user.id, user.email)

    if (!accessToken || !refreshToken) {
        throw new DatabaseError('Failed to generate tokens for the user', 'AuthController.googleLoginCallback')
    }

    // Create a new session for the user
    await sessionService.createSessionForLoginUser({
        userId: user.id,
        userAgent: req.headers['user-agent'] || '',
        ipAddress: req.ip,
        accessToken: accessToken,
        refreshToken: refreshToken
    })

    // Set the tokens in the cookies
    res.cookie(ACCESS_COOKIE_NAME, accessToken, {
        httpOnly: true,
        secure: !IS_PRODUCTION,
        sameSite: 'strict',
        maxAge: 1000 * ACCESS_TOKEN_VALIDITY_IN_SEC
    }).cookie(REFRESH_COOKIE_NAME, refreshToken, {
        httpOnly: true,
        secure: !IS_PRODUCTION,
        sameSite: 'strict',
        maxAge: 1000 * REFRESH_TOKEN_VALIDITY_IN_SEC
    })

    ApiResponse(req, res, 200, 'User logged in successfully', null)
})

// Todo: Implement Google account linking functionality
export const linkGoogleAccount = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.id
    if (!userId) {
        throw new UnauthorizedError('User not logged in')
    }

    // Get the authorization code from the request body
    const { code } = req.body as { code?: string }
    if (!code  || typeof code !== 'string') {
        throw new BadRequestError('Invalid authorization code', 'AuthController.linkGoogleAccount')
    }

    await googleService.linkGoogleAccount(userId, code)

    ApiResponse(req, res, 200, 'Google account linked successfully', null)
})


// Todo: Implement email service to send reset password email (for now, just return a success message)
export const forgotPassword = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    // User Requests Password Reset:
    const userEmail = req.body as ForgotPasswordCredientials

    // Validate the request body
    const validateData = entitiesValidation<ForgotPasswordCredientials>(forgotPasswordSchema, userEmail)

    if (!validateData) {
        throw new DatabaseError('Invalid email address')
    }

    await Promise.resolve()
    // Generate a password reset token
    ApiResponse(req, res, 200, 'Password reset email sent', validateData)
})

// Todo: Implement reset password functionality
export const resetPassword = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    // Get the reset token and new password
    const resetCredentials = req.body as ResetPasswordCredentials

    // Validate the request body
    const validateData = entitiesValidation<ResetPasswordCredentials>(resetPasswordSchema, resetCredentials)
    if (!validateData) {
        throw new DatabaseError('Invalid reset token or new password')
    }
    // Verify the reset token

    await authServices.resetPasswordService({
        userId: validateData.id,
        token: validateData.token,
        newPassword: validateData.newPassword
    })

    ApiResponse(req, res, 200, 'Password reset successfully', {
        message: 'Password reset successfully'
    })
})
