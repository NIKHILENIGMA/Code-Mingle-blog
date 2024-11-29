import { NextFunction, Request, Response } from 'express'
import { ApiResponse } from '../utils/ApiResponse'
import { ApiError } from '../utils/ApiError'
import { AsyncHandler } from '../utils/AsyncHandler'
import { ProtectedRequest } from '../types/app-request'
import { ILoginUser, ISignupUserBody, IForgotPassword } from '../Lib/Models/User'
import AuthService from '../services/auth.service'
import TokenServices from '../services/token.service'
import MailService from '../services/mail.service'
import responseMessage from '../constant/responseMessage'
import config, { tokenInfo } from '../config/config'
import { EApplicationEnvironment } from '../constant/application'


const authServices = new AuthService()
const tokenService = new TokenServices()
const mailService = new MailService()

/**
 * Interface for Signup User Request
 * @interface ISignupUserRequest
 * @extends {Request}
 * @property {ISignupUserBody} body - The user details to create a new account.
 */
interface ISignupUserRequest extends Request {
    body: ISignupUserBody
}

interface ILoginUserRequest extends Request {
    body: ILoginUser
}

interface IForgotPasswordRequest extends Request {
    body: IForgotPassword
}

/**
 * Create a new User
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
            ApiError(new Error(responseMessage.METHOD_FAILED('new user')), req, next, 403)
        }

        return ApiResponse(req, res, 200, 'User created successfully', {
            user: newUser
        })
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(responseMessage.METHOD_FAILED('register  user')), req, next, 500)
    }
})

/**
 * Fetch authenticated user details
 * @description Accepts login credentials (email, password) and returns a token if valid.
 * @param req - The request object containing user login credientials.
 * @returns res - The response object containing the user data and tokens.
 */

export const login = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body } = req as ILoginUserRequest

        const userData = await authServices.userLoginService(req, next, body)

        if (!userData) {
            return ApiError(new Error(responseMessage.METHOD_FAILED('retriving user')), req, next, 403)
        }

        const tokens = await tokenService.generateAccessAndRefreshTokenService(req, next, userData.id)

        if (!tokens) {
            return ApiError(new Error(responseMessage.METHOD_FAILED('generating tokens')), req, next, 403)
        }

        res
          .cookie('access_token', tokens.accessToken, {
            httpOnly: true,
            secure: !(config.ENV === EApplicationEnvironment.PRODUCTION),
            sameSite: 'strict',
            maxAge: 1000 * parseInt(tokenInfo.access_validity as string)
        })
          .cookie('refresh_token', tokens.refreshToken, {
            httpOnly: true,
            secure: !(config.ENV === EApplicationEnvironment.PRODUCTION),
            sameSite: 'strict',
            maxAge: 1000 * parseInt(tokenInfo.refresh_validity as string)  
        })

        return ApiResponse(req, res, 200, 'User logged in successfully', {
            token: tokens.accessToken,
            user: userData
        })
    } catch (error) {
        ApiError(new Error(`Error logging in user: ${(error as Error).message}`), req, next, 403)
    }
})

/**
 * Logout a user
 * @description - Invalidates the current user session or token.
 * @param req - The request object containing the user token.
 * @returns res - The response object containing the log out status.
 */

export const logout = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const cookies = req.cookies as Record<string, string>
        const refreshToken = cookies['refresh_token']

        const currentUserId = (req.user as Record<string, string>)?.id

        if (!currentUserId) {
            return ApiError(new Error(responseMessage.NOT_FOUND('user')), req, next, 404)
        }

        if (refreshToken) {
            await tokenService.removeRefreshToken(req, next, currentUserId, refreshToken)
        }

        return ApiResponse(req, res, 200, 'User logged out successfully')
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(responseMessage.METHOD_FAILED('logout')), req, next, 500)
    }
})

/**
 * Password recovery request
 * @description - Sends a password recovery email to the user.
 * @param req - The request object containing the user email.
 * @returns res - The response object containing the password recovery status.
 */

export const forgotPassword = AsyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // User Requests Password Reset:
        const { body } = req as IForgotPasswordRequest

        const user = await authServices.userForgotPasswordService(req, next, body.email)

        if (!user) {
            return ApiError(new Error(responseMessage.NOT_FOUND('user with email')), req, next, 404)
        }
        // Generate a password reset token
        const resetToken = await tokenService.generateResetToken(req, next, user.id)

        if (!resetToken) {
            return ApiError(new Error(responseMessage.INVALID_TOKEN), req, next, 403)
        }

        // Send password reset email
        await mailService.sendPasswordResetEmail(user.email, resetToken)

        return ApiResponse(req, res, 200, 'Password reset email sent successfully')
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(responseMessage.METHOD_FAILED('forgot password')), req, next, 500)
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
        const { token, newPassword } = req.body as { token: string; newPassword: string }

        // Verify the reset token
        const userId = await tokenService.verifyResetToken(req, next, token)

        if (!userId) {
            return ApiError(new Error(responseMessage.INVALID_TOKEN), req, next, 403)
        }

        await authServices.changePasswordService(req, next, userId, newPassword)

        return ApiResponse(req, res, 200, responseMessage.SUCCESS('Password reset'))
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(responseMessage.METHOD_FAILED('reset password')), req, next, 500)
    }
})

export const refreshAccessToken = AsyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const tokens = req.cookies as Record<string, string>
        // console.log(refreshCookie);

        const { access_token, refresh_token } = tokens

        if (access_token) {
            return ApiResponse(req, res, 200, 'User already logged in', {
                token: access_token
            })
        }

        const newTokens = await tokenService.refreshTokenService(req, next, refresh_token)

        if (!newTokens) {
            return ApiError(new Error(responseMessage.INVALID_TOKEN), req, next, 403)
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

        return ApiResponse(req, res, 200, 'Token refreshed successfully', {
            token: newTokens.accessToken
        })
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(responseMessage.METHOD_FAILED('refresh token')), req, next, 500)
    }
})
