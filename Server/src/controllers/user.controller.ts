import { NextFunction, Request, Response } from 'express'
import { AsyncHandler } from '../utils/AsyncHandler'
import { User } from '../Lib/Models/User'
import UserServices from '../services/user.service'
import { ApiError } from '../utils/ApiError'
import { ApiResponse } from '../utils/ApiResponse'

const userServices = new UserServices()


/**
 * Update user profile
 * @description Modify an existing user profile's information, including bio and profile picture.
 * @param String(id) - user id
 * @param Object(user)- user fields to update
 * @returns Promise<User> - updated user details
 */

export const updateUser = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.body as User
        const id = req.params.id
        await userServices.updateUserDetails(id, user)

        ApiResponse(req, res, 200, 'User updated successfully', {
            user: user
        })

    } catch (error) {
        ApiError(new Error(`${(error instanceof Error)}`), req, next, 403)
    }
})

/**
 * Fetch authenticated user details
 * @description - Returns information about the currently authenticated user.
 * @param req - The request object containing the user token.
 * @returns res - The response object containing the user data.
 */

export const getUser = AsyncHandler(async (_: Request, res: Response) => {
    await Promise.resolve()
    ApiResponse(_, res, 200, 'User fetched successfully')
})

/**
 * Fetch all user profiles
 * @description - Retrieve a list of all users with their profile details.
 * @param req - The request object containing the user token.
 * @returns res - The response object containing the user data.
 */

export const getAllUsers = AsyncHandler(async (_: Request, res: Response) => {
    await Promise.resolve()

    ApiResponse(_, res, 200, 'Users fetched successfully')
})

/**
 * Delete user profile
 * @description - Delete an existing user profile.
 * @param req - The request object containing the user token.
 * @returns res - The response object containing the user data.
 */

export const removeUser = AsyncHandler(async (_: Request, res: Response) => {
    await Promise.resolve()
    ApiResponse(_, res, 200, 'User deleted successfully')
})


/**
 * Fetch user's followers
 * @description - Retrieve a list of users who follow the specified user.
 * @param req - The request object containing the user token.
 * @returns res - The response object containing the user data.
 */

export const getFollowers = AsyncHandler(async (_: Request, res: Response) => {
    await Promise.resolve()
    ApiResponse(_, res, 200, 'Followers fetched successfully')
})

/**
 * Fetch user's following
 * @description - Retrieve a list of users whom the specified user is following.
 * @param req - The request object containing the user token.
 * @returns res - The response object containing the user data.
 */

export const getFollowing = AsyncHandler(async (_: Request, res: Response) => {
    await Promise.resolve()
    ApiResponse(_, res, 200, 'Following fetched successfully')
})

/**
 * Follow a user
 * @description - Follow a specific user.
 * @param req - The request object containing the user token.
 * @returns res - The response object containing the user data.
 */

export const followUser = AsyncHandler(async (_: Request, res: Response) => {
    await Promise.resolve()
    ApiResponse(_, res, 200, 'User followed successfully')
})

/**
 * Unfollow a user
 * @description - Unfollow a specific user.
 * @param req - The request object containing the user token.
 * @returns res - The response object containing the user data.
 */

export const unfollowUser = AsyncHandler(async (_: Request, res: Response) => {
    await Promise.resolve()
    ApiResponse(_, res, 200, 'User unfollowed successfully')
})
