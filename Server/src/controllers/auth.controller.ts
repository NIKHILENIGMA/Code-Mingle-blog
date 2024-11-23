import { Request, Response } from 'express'
import { AsyncHandler } from '../utils/AsyncHandler'
import { ApiResponse } from '../utils/ApiResponse'
import { ApiError } from '../utils/ApiError'
import { ILoginUser, ISignupUser } from '../Lib/Models/User'
import { cookieOptions } from '../constant/cookieOptions'
import AuthService from '../services/auth.service'
import { ProtectedRequest } from '../types/app-request'
import { KeyStore } from '../Lib/Models/KeyStore'
import TokenServices from '../services/token.service'
import MailService from '../services/mail.service'
// import logger from '../utils/logger'

const authServices = new AuthService()
const tokenService = new TokenServices()
const mailService = new MailService()

/**
 * Create a new User
 * @description Accepts user details (username, email, password) to create a new account.
 * @param {Request} req - The request object containing user data.
 * @param {Response} res - The response object containing the newly created user.
 * @returns {Promise<void>} - A promise that resolves when the user is created.
 * @throws {ApiError} - Throws an error if user creation fails.
 */

export const signup = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
        const user = req.body as ISignupUser

        const newUser = await authServices.createUser(user)

        const tokens = await tokenService.generateTokens(newUser.id)

        // Check if user was created successfully
        if (!tokens || !newUser) {
            throw new ApiError(500, 'Error occur while creating user account')
        }

        res.status(200)
            .cookie('access_token', tokens.accessToken, cookieOptions)
            .cookie('refresh_token', tokens.refreshToken, cookieOptions)
            .json(new ApiResponse(201, { newUser, tokens }, 'User created successfully'))
    } catch (error) {
        throw new ApiError(500, `Error creating user: ${(error as Error).message}`)
    }
})

/**
 * Fetch authenticated user details
 * @description Accepts login credentials (email, password) and returns a token if valid.
 * @param req - The request object containing user login credientials.
 * @returns res - The response object containing the user data and tokens.
 */

export const login = AsyncHandler(async (req: Request, res: Response) => {
    try {
        const user = req.body as ILoginUser

        const userData = await authServices.loginUser(user)

        const tokens = await tokenService.generateTokens(userData.id)

        if (!tokens || !userData) {
            throw new ApiError(500, 'Error logging in user')
        }

        res.status(200)
            .cookie('access_token', tokens.accessToken, cookieOptions)
            .cookie('refresh_token', tokens.refreshToken, cookieOptions)
            .json(new ApiResponse(200, { tokens, userData }, 'User logged in successfully'))
    } catch (error) {
        throw new ApiError(500, (error as Error).message)
    }
})

/**
 * Logout a user
 * @description - Invalidates the current user session or token.
 * @param req - The request object containing the user token.
 * @returns res - The response object containing the log out status.
 */

export const logout = AsyncHandler(async (req: ProtectedRequest, res: Response): Promise<void> => {
    try {
        const keyStoreId: number = (req.keyStore as KeyStore).id

        await tokenService.removeTokenById(keyStoreId)

        res.status(200)
            .clearCookie('access_token', cookieOptions)
            .clearCookie('refresh_token', cookieOptions)
            .json(new ApiResponse(200, null, 'User logged out successfully'))
    } catch (error) {
        throw new ApiError(500, (error as Error).message)
    }
})

/**
 * Password recovery request
 * @description - Sends a password recovery email to the user.
 * @param req - The request object containing the user email.
 * @returns res - The response object containing the password recovery status.
 */

export const forgotPassword = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    // User Requests Password Reset:
    const { email } = req.body as { email: string }

    const user = await authServices.verifyUser(email)

    // Generate a password reset token
    const resetToken = await tokenService.generateResetToken(user.id)

    // Send password reset email
    await mailService.sendPasswordResetEmail(email, resetToken)

    res.status(200).json(new ApiResponse(200, null, 'Password reset email sent successfully'))
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

export const resetPassword = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
        const { token, newPassword } = req.body as { token: string; newPassword: string }

        // Verify the reset token
        const userId = await tokenService.verifyResetToken(token)

        await authServices.changePassword(userId, newPassword)

        res.status(200).json(new ApiResponse(200, null, 'Password reset successful'))
    } catch (error) {
        throw new ApiError(500, `Error resetting password: ${(error as Error).message}`)
    }
})
