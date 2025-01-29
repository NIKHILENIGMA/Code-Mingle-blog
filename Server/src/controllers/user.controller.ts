import { NextFunction, Request, Response } from 'express'
import { AsyncHandler } from '../utils/AsyncHandler'
import { UpdateUserDTO, User } from '../Lib/Models/User'
import UserServices from '../services/user.service'
import { ApiError } from '../utils/ApiError'
import { ApiResponse } from '../utils/ApiResponse'
import { ProtectedRequest } from '../types/app-request'
import responseMessage from '../constant/responseMessage'


const { SUCCESS, INTERNAL_SERVICE } = responseMessage

const userServices = new UserServices()

/**
 * Update user profile
 * @description Modify an existing user profile's information, including bio and profile picture.
 * @param String(id) - user id
 * @param Object(user)- user fields to update
 * @returns Promise<User> - updated user details
 */

export const updateUser = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const userId = (req.user as User)?.id
    const userDetails = req.body as UpdateUserDTO
    try {
        
        await userServices.updateUserDetails(userId, userDetails)

        ApiResponse(req, res, SUCCESS().code, SUCCESS('User updated successfully').message)
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(INTERNAL_SERVICE('login service').message), req, next, INTERNAL_SERVICE().code)
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
