import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../../../utils/ApiError'
import { ApiResponse } from '../../../utils/ApiResponse'
import { AsyncHandler } from '../../../utils/AsyncHandler'
import {
    SignupCredentials,
    LoginCredentials,
    ForgotPasswordCredentials,
    ResetCredentials,
    AuthResponse
} from './auth.types'
import config, { tokenInfo } from '../../../config/config'
import { EApplicationEnvironment, responseMessage } from '../../../constant'
import { ProtectedRequest } from '../../../types/app-request'
import { UserDTO } from '../../../types/types'
import AuthService from '../authentication/auth.service'
import TokenServices from '../../../features/common/token.service'
import MailService from '../../../features/mail/ResetPassword/mail.service'

// Initialize the services
const authServices = new AuthService()
const tokenServices = new TokenServices()
const mailService = new MailService()

// Destructure the response messages
const { INTERNAL_SERVICE, SUCCESS, METHOD_FAILED, NOT_FOUND } = responseMessage

/**
 *! Handles user signup requests.
 *
 * This function is an asynchronous request handler that creates a new user account.
 * It expects a request body containing the user's first name, last name, email, and password.
 *
 * @param {Request} req - The request object containing the user's signup details.
 * @param {Response} res - The response object used to send the response back to the client.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Promise<void>} A promise that resolves to void.
 *
 * @throws {Error} Will throw an error if there is an issue with creating the user account.
 */
export const signup = AsyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Get the user credentials
    const userCredentials = req.body as SignupCredentials

    // Register the user
    try {
        const newUser = await authServices.userRegisterService(req, next, userCredentials)

        if (!newUser) {
            ApiError(new Error(METHOD_FAILED('create user').message), req, next, METHOD_FAILED().code)
        }

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('User created successfully').message, {
            user: newUser
        })
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(INTERNAL_SERVICE('register  user').message), req, next, INTERNAL_SERVICE().code)
    }
})

/**
 *! Handles user login requests.
 *
 * @param {Request} req - The request object containing user login details.
 * @param {Response} res - The response object to send the response.
 * @param {NextFunction} next - The next middleware function in the stack.
 *
 * @returns A response with a status code and a message indicating the result of the login attempt.
 *
 * @throws Will throw an error if there is an issue with logging in the user.
 */

export const login = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // Get the user credentials
    const userCredientials = req.body as LoginCredentials

    // Attempt to log in the user
    try {
        const userId = await authServices.userLoginService(req, next, userCredientials)

        if (!userId) {
            return ApiError(new Error(METHOD_FAILED('finding user').message), req, next, METHOD_FAILED().code)
        }

        const tokens = await tokenServices.generateAccessAndRefreshTokenService(req, next, userId)

        if (!tokens) {
            return ApiError(new Error(METHOD_FAILED('generating tokens').message), req, next, METHOD_FAILED().code)
        }

        res.cookie('access_token', tokens.accessToken, {
            httpOnly: true,
            secure: !(config.ENV === EApplicationEnvironment.PRODUCTION),
            sameSite: 'strict',
            maxAge: 1000 * parseInt(tokenInfo.access_validity as string)
        }).cookie('refresh_token', tokens.refreshToken, {
            httpOnly: true,
            secure: !(config.ENV === EApplicationEnvironment.PRODUCTION),
            sameSite: 'strict',
            maxAge: 1000 * parseInt(tokenInfo.refresh_validity as string)
        })

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('User logged in successfully').message, {
            token: tokens.accessToken
        })
    } catch (error) {
        ApiError(new Error(`Error logging in user: ${(error as Error).message}`), req, next)
    }
})

/**
 *! Handles user logout by clearing authentication cookies and removing the refresh token.
 *
 * @param {ProtectedRequest} req - The request object, which includes user and cookies information.
 * @param {Response} res - The response object used to send the response back to the client.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Promise<void>} - A promise that resolves when the logout process is complete.
 *
 * @throws {Error} - Throws an error if the user is not found or if there is an issue during the logout process.
 */

export const logout = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction): Promise<void> => {
    // Get the refresh token from the cookies
    const cookies = req.cookies as Record<string, string>
    const refreshToken = cookies['refresh_token']

    // Get the current user ID
    const currentUserId = (req.user as Record<string, string>)?.id
    if (!currentUserId) {
        return ApiError(new Error(NOT_FOUND('user').message), req, next, NOT_FOUND().code)
    }

    // Attempt to log out the user
    try {
        if (refreshToken) {
            await tokenServices.removeRefreshToken(req, next, currentUserId, refreshToken)
        }

        res.clearCookie('access_token').clearCookie('refresh_token')

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('User logged out successfully').message)
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('logout').message), req, next, METHOD_FAILED().code)
    }
})

/**
 *! Handles the forgot password functionality.
 *
 * @param {Request} req - The request object containing the user's email.
 * @param {Response} res - The response object used to send the response.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Promise<void>} A promise that resolves to void.
 *
 * @throws {Error} Will throw an error if any of the steps fail.
 */
export const forgotPassword = AsyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // User Requests Password Reset:
        const userEmail = req.body as ForgotPasswordCredentials

        const user = (await authServices.userForgotPasswordService(req, next, userEmail.email)) as UserDTO

        if (!user) {
            return ApiError(new Error(NOT_FOUND('user with email').message), req, next, NOT_FOUND().code)
        }
        // Generate a password reset token
        const resetToken = await tokenServices.generateResetToken(req, next, user.id)

        if (!resetToken) {
            return ApiError(new Error(METHOD_FAILED('generate reset token').message), req, next, METHOD_FAILED().code)
        }

        // Send password reset email
        await mailService.sendPasswordResetEmail(req, next, user.email, resetToken)

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Password reset email sent').message, { token: resetToken })
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('forgot password').message), req, next, METHOD_FAILED().code)
    }
})

/**
 *! Handles the password reset process.
 *
 * This function is an asynchronous request handler that resets a user's password.
 * It expects a request body containing a reset token and a new password.
 *
 * @param {Request} req - The request object, containing the reset token and new password in the body.
 * @param {Response} res - The response object used to send the status and response message.
 * @returns {Promise<void>} A JSON response indicating the success of the password reset operation.
 *
 * @throws {Error} Will throw an error if the reset token is invalid or if the password change operation fails.
 */

export const resetPassword = AsyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Get the reset token and new password
    const resetCredentials = req.body as ResetCredentials

    try {
        // Verify the reset token
        const userId = await tokenServices.verifyResetTokenService(req, next, resetCredentials.token)

        if (!userId) {
            return ApiError(new Error(METHOD_FAILED('verify reset token').message), req, next, METHOD_FAILED().code)
        }

        await authServices.changePasswordService(req, next, userId, resetCredentials.newPassword)

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Password reset').message)
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('reset password').message), req, next, METHOD_FAILED().code)
    }
})

/**
 *! Controller to refresh the access token.
 *
 * This controller checks if the user is already logged in by verifying the presence of an access token in the cookies.
 * If the access token is present, it responds with a message indicating that the user is already logged in.
 * If the access token is not present, it attempts to refresh the tokens using the refresh token.
 *
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 * @param next - The next middleware function.
 *
 * @returns A promise that resolves to void.
 *
 * @throws Will throw an error if the token refresh process fails.
 */

export const refreshAccessToken = AsyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Check if the user is already logged in
    const tokens: AuthResponse = req.cookies as AuthResponse

    try {
        // If the user is already logged in, respond with the access token
        if (tokens.access_token) {
            return ApiResponse(req, res, SUCCESS().code, SUCCESS('User already logged in').message, {
                token: tokens.access_token
            })
        }

        // If the access token is not present, attempt to refresh the tokens
        const newTokens = await tokenServices.refreshTokenService(req, next, tokens.refresh_token)
        if (!newTokens) {
            return ApiError(new Error(METHOD_FAILED('refresh token').message), req, next, METHOD_FAILED().code)
        }

        // Set the new tokens in the cookies
        res.cookie('access_token', newTokens.accessToken, {
            httpOnly: true,
            secure: !(config.ENV === EApplicationEnvironment.PRODUCTION),
            sameSite: 'strict',
            maxAge: 1000 * parseInt(tokenInfo.access_validity as string)
        }).cookie('refresh_token', newTokens.refreshToken, {
            httpOnly: true,
            secure: !(config.ENV === EApplicationEnvironment.PRODUCTION),
            sameSite: 'strict',
            maxAge: 1000 * parseInt(tokenInfo.refresh_validity as string)
        })

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Token refreshed successfully').message, {
            token: newTokens.accessToken
        })
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('refresh token').message), req, next, METHOD_FAILED().code)
    }
})
