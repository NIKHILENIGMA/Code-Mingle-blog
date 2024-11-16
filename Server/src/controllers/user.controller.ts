import { Request, Response } from 'express'
import { z } from 'zod'
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

export const updateUser = AsyncHandler(async (req: Request, res: Response) => {
    try {
        const user = req.body as User
        const id = req.params.id
        await userServices.updateUserDetails(id, user)

        res.status(200).json(new ApiResponse(200, user, id))
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
 * @description - Returns information about the currently authenticated user.
 * @param req - The request object containing the user token.
 * @returns res - The response object containing the user data.
 */

export const getUser = AsyncHandler(async (_: Request, res: Response) => {
    await Promise.resolve()
    res.status(200).json(new ApiResponse(200, null, 'User details fetched successfully'))
})

/**
 * Fetch all user profiles
 * @description - Retrieve a list of all users with their profile details.
 * @param req - The request object containing the user token.
 * @returns res - The response object containing the user data.
 */

export const getAllUsers = AsyncHandler(async (_: Request, res: Response) => {
    await Promise.resolve()
    res.status(200).json(new ApiResponse(200, null, 'All users fetched successfully'))
})

/**
 * Delete user profile
 * @description - Delete an existing user profile.
 * @param req - The request object containing the user token.
 * @returns res - The response object containing the user data.
 */

export const removeUser = AsyncHandler(async (_: Request, res: Response) => {
    await Promise.resolve()
    res.status(200).json(new ApiResponse(200, null, 'User deleted successfully'))
})


/**
 * Fetch user's followers
 * @description - Retrieve a list of users who follow the specified user.
 * @param req - The request object containing the user token.
 * @returns res - The response object containing the user data.
 */

export const getFollowers = AsyncHandler(async (_: Request, res: Response) => {
    await Promise.resolve()
    res.status(200).json(new ApiResponse(200, null, 'Followers fetched successfully'))
})

/**
 * Fetch user's following
 * @description - Retrieve a list of users whom the specified user is following.
 * @param req - The request object containing the user token.
 * @returns res - The response object containing the user data.
 */

export const getFollowing = AsyncHandler(async (_: Request, res: Response) => {
    await Promise.resolve()
    res.status(200).json(new ApiResponse(200, null, 'Following fetched successfully'))
})

/**
 * Follow a user
 * @description - Follow a specific user.
 * @param req - The request object containing the user token.
 * @returns res - The response object containing the user data.
 */

export const followUser = AsyncHandler(async (_: Request, res: Response) => {
    await Promise.resolve()
    res.status(200).json(new ApiResponse(200, null, 'User followed successfully'))
})

/**
 * Unfollow a user
 * @description - Unfollow a specific user.
 * @param req - The request object containing the user token.
 * @returns res - The response object containing the user data.
 */

export const unfollowUser = AsyncHandler(async (_: Request, res: Response) => {
    await Promise.resolve()
    res.status(200).json(new ApiResponse(200, null, 'User unfollowed successfully'))
})
