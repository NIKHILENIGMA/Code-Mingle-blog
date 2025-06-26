import { Request, Response } from 'express'
import { appConfig } from '@/config'
import { ResetPasswordCredentials, AuthResponse, SignupCredientials, LoginCredientials, ForgotPasswordCredientials, LoginDTO } from './auth.types'
import { forgotPasswordSchema, resetPasswordSchema, signupSchema } from '@/api/validators'
import { ApiResponse, AsyncHandler, entitiesValidation, tokenManagement } from '@/utils'
import { ConflictError, DatabaseError, NotFoundError, UnauthorizedError } from '@/utils/Errors'
import { ENUMS } from '@/types'
import { ACCESS_TOKEN_VALIDITY_IN_SEC, REFRESH_TOKEN_VALIDITY_IN_SEC } from '@/config/app.config'
import { User } from '@prisma/client'
import { authServices } from '../authentication/auth.service'
import { googleService, sessionService } from '@/api'

export function generateUniqueUsername(name: string): string {
    const nouns: string[] = ['lion', 'rocket', 'ninja', 'owl', 'tiger']
    const noun: string = nouns[Math.floor(Math.random() * nouns.length)]
    const randomString: string = Math.random().toString(36).substring(2, 10)
    const time: number = new Date().getMilliseconds()

    return `${name}_${noun}_${randomString}_${time}`
}

export const signup = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    // Extract the user credentials from the request body
    const body = req.body as SignupCredientials

    // Validate the request body against the signup schema
    const credientials = entitiesValidation<SignupCredientials>(signupSchema, body)

    const existingUser = await authServices.verifyUserByEmail(credientials.email)
    if (existingUser) {
        // If the user already exists, throw an error
        throw new ConflictError('User with this email already exists')
    }

    // Register the user
    await authServices.registerUser(credientials)

    // Send a success response
    return ApiResponse(req, res, 200, 'User created successfully', null)
})

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
    const tokens = await tokenManagement.getTokens(loggedInUser.user, loggedInUser.permissions)
    if (!tokens) {
        throw new DatabaseError('Failed to generate tokens for the user')
    }

    // Invalidate all existing sessions for the user
    await sessionService.invalidateAllSessionsByUserId(loggedInUser.user.id)

    // Create a new session for the user
    await sessionService.createSession({
        userId: loggedInUser.user.id,
        userAgent: req.headers['user-agent'] || '',
        ipAddress: req.ip,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
    })

    // Set the tokens in the cookies
    res.cookie('access_token', tokens.accessToken, {
        httpOnly: true,
        secure: !(appConfig.ENV === ENUMS.EApplicationEnvironment.PRODUCTION),
        sameSite: 'strict',
        maxAge: 1000 * ACCESS_TOKEN_VALIDITY_IN_SEC
    }).cookie('refresh_token', tokens.refreshToken, {
        httpOnly: true,
        secure: !(appConfig.ENV === ENUMS.EApplicationEnvironment.PRODUCTION),
        sameSite: 'strict',
        maxAge: 1000 * REFRESH_TOKEN_VALIDITY_IN_SEC
    })

    const response: LoginDTO = {
        user: {
            id: loggedInUser.user.id,
            firstName: loggedInUser.user.firstName,
            lastName: loggedInUser.user.lastName,
            email: loggedInUser.user.email,
            username: loggedInUser.user.username,
            profileImage: loggedInUser.user.profileImage,
            roleId: loggedInUser.user.roleId!,
            verifiedEmail: loggedInUser.user.verifiedEmail
        },
        tokens
    }

    return ApiResponse(req, res, 200, 'User logged in successfully', response)
})

export const logout = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    // Get the current user ID
    const sessionId: string | undefined = req.session?.id
    if (!sessionId || sessionId === undefined) {
        throw new UnauthorizedError('User not logged in')
    }
    // Invalidate the session
    await sessionService.invalidateAllSessionsByUserId(sessionId)

    res.clearCookie('access_token', {
        httpOnly: true,
        secure: !(appConfig.ENV === ENUMS.EApplicationEnvironment.PRODUCTION),
        sameSite: 'strict'
    }).clearCookie('refresh_token', {
        httpOnly: true,
        secure: !(appConfig.ENV === ENUMS.EApplicationEnvironment.PRODUCTION),
        sameSite: 'strict'
    })

    ApiResponse(req, res, 200, 'User logged out successfully', null)
})

export const forgotPassword = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    // User Requests Password Reset:
    const userEmail = req.body as ForgotPasswordCredientials

    // Validate the request body
    const validateData = entitiesValidation<ForgotPasswordCredientials>(forgotPasswordSchema, userEmail)

    // Check if the email is valid
    const resetPayload = await authServices.forgotPasswordService(validateData.email)

    // Generate a password reset token
    ApiResponse(req, res, 200, 'Password reset email sent', resetPayload)
})

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

export const refreshAccessToken = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    // Check if the user is already logged in
    const tokens: AuthResponse = req.cookies as AuthResponse

    // If the user is already logged in, respond with the access token
    if (tokens.access_token) {
        return ApiResponse(req, res, 200, 'User already logged in', {
            token: tokens.access_token
        })
    }
    // Get the refresh token from the request
    const { refresh_token } = req.cookies as AuthResponse
    if (!refresh_token) {
        throw new UnauthorizedError('Refresh token not found')
    }

    // Verify the refresh token
    const newTokens = await authServices.verifyRefreshToken(refresh_token)

    // Set the new tokens in the cookies
    res.cookie('access_token', newTokens.accessToken, {
        httpOnly: true,
        secure: !(appConfig.ENV === ENUMS.EApplicationEnvironment.PRODUCTION),
        sameSite: 'strict',
        maxAge: 1000 * ACCESS_TOKEN_VALIDITY_IN_SEC
    }).cookie('refresh_token', newTokens.refreshToken, {
        httpOnly: true,
        secure: !(appConfig.ENV === ENUMS.EApplicationEnvironment.PRODUCTION),
        sameSite: 'strict',
        maxAge: 1000 * REFRESH_TOKEN_VALIDITY_IN_SEC
    })

    ApiResponse(req, res, 200, 'Token refreshed successfully', {
        token: newTokens.accessToken
    })
})

export const googleCallback = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    // Get the authorization code from the request body
    const { code } = req.body as { code?: string }
    if (code !== typeof 'string' && !code) {
        throw new NotFoundError('Authorization code is required')
    }
    // Exchange the authorization code for tokens
    const token = await googleService.exchangeGoogleCodeForToken(code)

    // Decode the JWT token to get user information
    const jwtPayload = googleService.decodeGoogleJWTToken(token)

    // Check if the user already exists in the database
    const userExist: User | null = await authServices.verifyUserByEmail(jwtPayload.email)

    // If the user exists, update their information with OAuth data
    if (userExist) {
        const updatedUser = await googleService.updateUserWithOAuth({
            userId: userExist.id,
            profileImage: userExist.profileImage !== null ? userExist.profileImage : jwtPayload.picture, // Use the picture from the JWT if profileImage is null
            provider: 'GOOGLE',
            providerId: jwtPayload.sub,
            providerAcessToken: token.access_token,
            providerRefreshToken: token.refresh_token || undefined,
            providerTokenExpiry: new Date(jwtPayload.exp * 1000)
        })

        // Generate access and refresh tokens
        if (!updatedUser) {
            throw new DatabaseError('User not found or could not be updated with OAuth data')
        }

        const tokens = await authServices.getTokens(updatedUser.user, updatedUser.permissions)
        if (!tokens) {
            throw new DatabaseError('Failed to generate tokens for the user')
        }

        res.cookie('accessToken', tokens.accessToken, {
            httpOnly: true,
            secure: !(appConfig.ENV === ENUMS.EApplicationEnvironment.PRODUCTION),
            sameSite: 'strict',
            maxAge: 1000 * ACCESS_TOKEN_VALIDITY_IN_SEC
        }).cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            secure: !(appConfig.ENV === ENUMS.EApplicationEnvironment.PRODUCTION),
            sameSite: 'strict',
            maxAge: 1000 * REFRESH_TOKEN_VALIDITY_IN_SEC
        })

        const response: LoginDTO = {
            user: {
                id: updatedUser.user.id,
                firstName: updatedUser.user.firstName,
                lastName: updatedUser.user.lastName,
                email: updatedUser.user.email,
                username: updatedUser.user.username,
                profileImage: updatedUser.user.profileImage,
                roleId: updatedUser.user.roleId!,
                verifiedEmail: updatedUser.user.verifiedEmail
            },
            tokens: {
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken
            }
        }

        ApiResponse(req, res, 200, 'User logged in successfully', response)
    } else {
        const generatedUserName: string = generateUniqueUsername(jwtPayload.given_name)
        // If the user does not exist, create a new user with OAuth data
        const { user, permissions } = await googleService.createUserWithOAuth({
            firstName: jwtPayload.given_name || '',
            lastName: jwtPayload.family_name || '',
            email: jwtPayload.email,
            username: generatedUserName,
            profileImage: jwtPayload.picture || '',
            provider: 'GOOGLE',
            providerId: jwtPayload.sub,
            providerAcessToken: token.access_token,
            providerRefreshToken: token.refresh_token || undefined,
            providerTokenExpiry: new Date(jwtPayload.exp * 1000)
        })

        const tokens = await authServices.getTokens(user, permissions)
        if (!tokens) {
            throw new DatabaseError('Failed to generate tokens for the user')
        }

        res.cookie('accessToken', tokens.accessToken, {
            httpOnly: true,
            secure: !(appConfig.ENV === ENUMS.EApplicationEnvironment.PRODUCTION),
            sameSite: 'strict',
            maxAge: 1000 * ACCESS_TOKEN_VALIDITY_IN_SEC
        }).cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            secure: !(appConfig.ENV === ENUMS.EApplicationEnvironment.PRODUCTION),
            sameSite: 'strict',
            maxAge: 1000 * REFRESH_TOKEN_VALIDITY_IN_SEC
        })

        const response: LoginDTO = {
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
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken
            }
        }

        ApiResponse(req, res, 200, 'User logged in successfully', response)
    }
})
