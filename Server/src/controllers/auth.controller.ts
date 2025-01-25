import { NextFunction, Request, Response } from 'express'
import { ApiResponse } from '../utils/ApiResponse'
import { ApiError } from '../utils/ApiError'
import { AsyncHandler } from '../utils/AsyncHandler'
import { ProtectedRequest } from '../types/app-request'
import { IForgotPasswordRequest, ILoginUserRequest, IResetPasswordRequest, ISignupUserRequest } from '../types/app-request'
import AuthService from '../services/auth.service'
import TokenServices from '../services/token.service'
import MailService from '../services/mail.service'
import responseMessage from '../constant/responseMessage'
import config, { tokenInfo } from '../config/config'
import { EApplicationEnvironment } from '../constant/application'
import { User } from '../Lib/Models/User'

const authServices = new AuthService()
const tokenService = new TokenServices()
const mailService = new MailService()

const { METHOD_FAILED, NOT_FOUND, SUCCESS, UNAUTHORIZED } = responseMessage

/**
 ** Create a new User
 * @description Accepts user details (username, email, password) to create a new account.
 * @param {Request} req - The request object containing user data.
 * @param {Response} res - The response object containing the newly created user.
 * @returns {Promise<void>} - A promise that resolves when the user is created.
 * @throws {ApiError} - Throws an error if user creation fails.
 */

export const signup = AsyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { body } = req as ISignupUserRequest

        const newUser = await authServices.userRegisterService(req, next, body)

        if (!newUser) {
            ApiError(new Error(METHOD_FAILED('create user').message), req, next, METHOD_FAILED().code)
        }

        return ApiResponse(req, res, 200, 'User created successfully', {
            user: newUser
        })
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('register  user').message), req, next, METHOD_FAILED().code)
    }
})

/**
 * Handles user login requests.
 *
 * @param req - The request object containing user login details.
 * @param res - The response object to send the response.
 * @param next - The next middleware function in the stack.
 *
 * @returns A response with a status code and a message indicating the result of the login attempt.
 *
 * @throws Will throw an error if there is an issue with logging in the user.
 */

export const login = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body } = req as ILoginUserRequest

        const userId = await authServices.userLoginService(req, next, body)

        if (!userId) {
            return ApiError(new Error(METHOD_FAILED('finding user').message), req, next, METHOD_FAILED().code)
        }

        const tokens = await tokenService.generateAccessAndRefreshTokenService(req, next, userId)

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
 ** Controller to get the current authenticated user.
 *
 * @param req - The request object, extended to include the authenticated user.
 * @param res - The response object.
 * @param next - The next middleware function.
 *
 * @returns A response with the current user details or an error if the user is not found.
 *
 * @throws Will throw an error if there is an issue retrieving the current user.
 */
export const currentUser = (req: ProtectedRequest, res: Response, next: NextFunction) => {
    try {
        const user = req.user as User

        if (!user) {
            return ApiError(new Error(UNAUTHORIZED.message), req, next, UNAUTHORIZED.code)
        }

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Current user').message, {
            user
        })
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('current user').message), req, next, METHOD_FAILED().code)
    }
}

/**
 * Handles user logout by clearing authentication cookies and removing the refresh token.
 *
 * @param {ProtectedRequest} req - The request object, which includes user and cookies information.
 * @param {Response} res - The response object used to send the response back to the client.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Promise<void>} - A promise that resolves when the logout process is complete.
 *
 * @throws {Error} - Throws an error if the user is not found or if there is an issue during the logout process.
 */

export const logout = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const cookies = req.cookies as Record<string, string>
        const refreshToken = cookies['refresh_token']

        const currentUserId = (req.user as Record<string, string>)?.id

        if (!currentUserId) {
            return ApiError(new Error(NOT_FOUND('user').message), req, next, NOT_FOUND().code)
        }

        if (refreshToken) {
            await tokenService.removeRefreshToken(req, next, currentUserId, refreshToken)
        }

        res.clearCookie('access_token').clearCookie('refresh_token')

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('User logged out successfully').message)
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('logout').message), req, next, METHOD_FAILED().code)
    }
})

/**
 * Handles the forgot password functionality.
 *
 * @param req - The request object containing the user's email.
 * @param res - The response object used to send the response.
 * @param next - The next middleware function in the stack.
 * @returns A promise that resolves to void.
 *
 * @throws Will throw an error if any of the steps fail.
 */
export const forgotPassword = AsyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // User Requests Password Reset:
        const { body } = req as IForgotPasswordRequest

        const user = await authServices.userForgotPasswordService(req, next, body.email)

        if (!user) {
            return ApiError(new Error(NOT_FOUND('user with email').message), req, next, NOT_FOUND().code)
        }
        // Generate a password reset token
        const resetToken = await tokenService.generateResetToken(req, next, user.id)

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
 * Handles the password reset process.
 *
 * This function is an asynchronous request handler that resets a user's password.
 * It expects a request body containing a reset token and a new password.
 *
 * @param req - The request object, containing the reset token and new password in the body.
 * @param res - The response object used to send the status and response message.
 *
 * @returns A JSON response indicating the success of the password reset operation.
 *
 * @throws Will throw an error if the reset token is invalid or if the password change operation fails.
 */

export const resetPassword = AsyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { body } = req as IResetPasswordRequest

        const { token, newPassword } = body

        // Verify the reset token
        const userId = await tokenService.verifyResetTokenService(req, next, token)

        if (!userId) {
            return ApiError(new Error(METHOD_FAILED('verify reset token').message), req, next, METHOD_FAILED().code)
        }

        await authServices.changePasswordService(req, next, userId, newPassword)

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Password reset').message)
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('reset password').message), req, next, METHOD_FAILED().code)
    }
})

/**
 * Controller to refresh the access token.
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
    try {
        const tokens = req.cookies as Record<string, string>
        // console.log(refreshCookie);

        const { access_token, refresh_token } = tokens

        if (access_token) {
            return ApiResponse(req, res, SUCCESS().code, SUCCESS('User already logged in').message, {
                token: access_token
            })
        }

        const newTokens = await tokenService.refreshTokenService(req, next, refresh_token)

        if (!newTokens) {
            return ApiError(new Error(METHOD_FAILED('refresh token').message), req, next, METHOD_FAILED().code)
        }

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
