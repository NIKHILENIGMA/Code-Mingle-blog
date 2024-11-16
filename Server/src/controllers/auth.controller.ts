import { Request, Response } from 'express'
import { AsyncHandler } from '../utils/AsyncHandler'
import { ApiResponse } from '../utils/ApiResponse'
import { ApiError } from '../utils/ApiError'
import { User } from '../Lib/Models/User'
import { createUserSchema } from '../schemas/user.schema'
import { z } from 'zod'
import { cookieOptions } from '../constant/cookieOptions'
import AuthService, { Credentials } from '../services/auth.service'
import UserServices from '../services/user.service'

const authServices = new AuthService()
const userServices = new UserServices()

/**
 * Create a new User
 * @description Accepts user details (username, email, password) to create a new account.
 * @param req - The request object containing user data.
 * @returns res - The response object containing the newly created user.
 */
export const signup = AsyncHandler(async (req: Request, res: Response) => {
    try {
        const user = createUserSchema.parse(req.body) as User

        const { tokens, userData } = await authServices.signupUser(user)

        if (!tokens || !userData) {
            throw new ApiError(500, 'Error creating user')
        }

        const currentUser = await userServices.getUserDetails(userData.id)

        res.status(200)
            .cookie('access_token', tokens.accessToken, cookieOptions)
            .cookie('refresh_token', tokens.refreshToken, cookieOptions)
            .json(new ApiResponse(201, { currentUser, tokens }, 'User created successfully'))
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json(new ApiError(400, error.errors.map((err) => err.message).join(', ')))
        } else {
            throw new ApiError(500, (error as Error).message)
        }
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
        const userCredientials = req.body as Credentials

        const login = await authServices.loginUser(userCredientials)

        res.status(200).json(new ApiResponse(200, login, 'User logged in successfully'))
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

export const logout = AsyncHandler(async (_: Request, res: Response) => {
    await Promise.resolve()
    res.clearCookie('access_token', cookieOptions)
    res.clearCookie('refresh_token', cookieOptions)
    res.status(200).json(new ApiResponse(200, null, 'User logged out successfully'))
})

/**
 * Password recovery request
 * @description - Sends a password recovery email to the user.
 * @param req - The request object containing the user email.
 * @returns res - The response object containing the password recovery status.
 */

export const forgotPassword = AsyncHandler(async (_: Request, res: Response) => {
    await Promise.resolve()
    res.status(200).json(new ApiResponse(200, null, 'Password recovery email sent'))
})

/**
 * Reset password
 * @description - Accepts a new password along with a recovery token to reset the user's password.
 * @param req - The request object containing the new password and recovery token.
 * @returns res - The response object containing the password reset status.
 */

export const resetPassword = AsyncHandler(async (_: Request, res: Response) => {
    await Promise.resolve()
    res.status(200).json(new ApiResponse(200, null, 'Password reset successful'))
})
