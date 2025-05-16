import { Request, Response } from 'express'
import { appConfig } from '@/config'
import { ResetPasswordCredentials, AuthResponse, SignupCredientials, LoginCredientials, ForgotPasswordCredientials } from './auth.types'
import { authServices } from '../authentication/auth.service'
import { forgotPasswordSchema, resetPasswordSchema, signupSchema } from '@/api/validators'
import { ApiResponse, AsyncHandler, entitiesValidation } from '@/utils'
import { DatabaseError, UnauthorizedError } from '@/utils/Errors'
import { ENUMS } from '@/types'
import { ACCESS_TOKEN_VALIDITY_IN_SEC, REFRESH_TOKEN_VALIDITY_IN_SEC } from '@/config/app.config'

export const signup = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    // Extract the user credentials from the request body
    const body = req.body as SignupCredientials

    // Validate the request body against the signup schema
    const credientials = entitiesValidation<SignupCredientials>(signupSchema, body)

    // Register the user
    await authServices.registerUser(credientials)

    // Send a success response
    return ApiResponse(req, res, 200, 'User created successfully', {})
})

export const login = AsyncHandler(async (req: Request, res: Response) => {
    // Get the user credentials
    const credientials = req.body as LoginCredientials

    const options = {
        userAgent: req.headers['user-agent'] || '',
        ipAddress: req.ip || ''
    }
    // Attempt to log in the user
    // Generate access and refresh tokens
    const tokens = await authServices.loginUser(credientials, options)

    // If the login fails, throw an error
    if (!tokens) {
        throw new DatabaseError('User name or password is invalid')
    }

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

    return ApiResponse(req, res, 200, 'User logged in successfully', {
        token: 'tokens.accessToken'
    })
})

export const logout = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    // Get the current user ID
    const sessionId: string | undefined = req.session?.id
    if (!sessionId || sessionId === undefined) {
        throw new UnauthorizedError('User not logged in')
    }
    // Invalidate the session
    await authServices.logoutUser(sessionId)

    res.clearCookie('access_token', {
        httpOnly: true,
        secure: !(appConfig.ENV === ENUMS.EApplicationEnvironment.PRODUCTION),
        sameSite: 'strict',
        maxAge: 1000 * ACCESS_TOKEN_VALIDITY_IN_SEC
    }).clearCookie('refresh_token', {
        httpOnly: true,
        secure: !(appConfig.ENV === ENUMS.EApplicationEnvironment.PRODUCTION),
        sameSite: 'strict',
        maxAge: 1000 * REFRESH_TOKEN_VALIDITY_IN_SEC
    })

    ApiResponse(req, res, 200, 'User logged out successfully', {
        message: 'User logged out successfully'
    })
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
        ApiResponse(req, res, 200, 'User already logged in', {
            token: tokens.access_token
        })
    }
    // Get the refresh token from the request
    const refreshToken = req.cookies['refresh_token'] as string
    if (!refreshToken) {
        throw new UnauthorizedError('Refresh token not found')
    }

    // Verify the refresh token
    const newTokens = await authServices.verifyRefreshToken(refreshToken)

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
        token: 'newTokens.accessToken'
    })
})
