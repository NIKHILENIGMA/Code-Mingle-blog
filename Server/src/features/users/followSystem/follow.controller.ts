import { NextFunction, Response } from 'express'
import { AsyncHandler } from '../../../utils/AsyncHandler'
import { ApiError } from '../../../utils/ApiError'
import responseMessage from '../../../constant/responseMessage'
import { ApiResponse } from '../../../utils/ApiResponse'
import { ProtectedRequest } from '../../../types/app-request'
import { User } from '../../../Lib/Models/User'
import FollowService from './follow.service'

// Follow service instance
const followServices = new FollowService()
// Response messages 
const { INTERNAL_SERVICE, SUCCESS, NOT_FOUND, UNAUTHORIZED, METHOD_FAILED } = responseMessage

/**
 * Follow a user by their user ID.
 *
 * @param req - The request object containing user information and parameters.
 * @param res - The response object used to send back the desired HTTP response.
 * @param next - The next middleware function in the stack.
 *
 * @throws {Error} If the user ID to follow is not provided or if the follower ID is not found.
 * @returns {Promise<Response>} A promise that resolves to the HTTP response indicating success or failure.
 */
export const followUser = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction): Promise<void> => {
    // Get the user id to follow
    const followringId: string = req.params.userId
    if (!followringId) {
        return ApiError(new Error(NOT_FOUND('User id is required').message), req, next, NOT_FOUND().code)
    }

    // Get the follower id
    const followerId: string = (req.user as User)?.id
    if (!followerId) {
        return ApiError(new Error(UNAUTHORIZED.message), req, next, UNAUTHORIZED.code)
    }

    // Payload to follow a user
    const payload = {
        followerId: followerId,
        followingId: followringId
    }

    // Follow the user
    try {
        const following = await followServices.followUser(req, next, payload)
        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Current user get successfully').message, following?.followingId)
    } catch (error) {
        return ApiError(new Error(INTERNAL_SERVICE((error as Error)?.message).message), req, next, INTERNAL_SERVICE().code)
    }
})

/**
 * Unfollow a user by their user ID.
 *
 * @param req - The request object containing user information and parameters.
 * @param res - The response object used to send back the desired HTTP response.
 * @param next - The next middleware function in the stack.
 *
 * @throws {Error} If the user ID to unfollow is not provided or if the follower ID is not found.
 * @returns {Promise<Response>} A promise that resolves to the HTTP response indicating success or failure.
 */
export const unfollowUser = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction): Promise<void> => {
    const followerId = (req.user as User)?.id
    if (!followerId) {
        return ApiError(new Error(UNAUTHORIZED.message), req, next, UNAUTHORIZED.code)
    }

    // Get the user id to unfollow
    const followingId: string = req.params.userId
    if (!followingId) {
        return ApiError(new Error(NOT_FOUND('User id is required').message), req, next, NOT_FOUND().code)
    }

    const where = {
        followerId,
        followingId
    }

    // Unfollow the user
    try {
        const unfollowUser = await followServices.unfollowUser(req, next, where)

        if (!unfollowUser) {
            return ApiError(new Error(METHOD_FAILED('User not found').message), req, next, METHOD_FAILED().code)
        }

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('User preference updated successfully').message)
    } catch (error) {
        return ApiError(new Error(INTERNAL_SERVICE((error as Error)?.message).message), req, next, INTERNAL_SERVICE().code)
    }
})

/**
 * Get the followers of the current user.
 *
 * @param req - The request object containing user information and parameters.
 * @param res - The response object used to send back the desired HTTP response.
 * @param next - The next middleware function in the stack.
 *
 * @throws {Error} If the user ID is not found.
 * @returns {Promise<Response>} A promise that resolves to the HTTP response indicating success or failure.
 */
export const getFollowers = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction): Promise<void> => {
    // Get the user id to get followers
    const userId = (req.user as User)?.id
    if (!userId) {
        return ApiError(new Error(UNAUTHORIZED.message), req, next, UNAUTHORIZED.code)
    }

    // Get the followers of the user
    try {
        const followers = await followServices.getUserFollowers(req, next, userId)
        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Current user theme preference get successfully').message, { followers })
    } catch (error) {
        return ApiError(new Error(INTERNAL_SERVICE((error as Error)?.message).message), req, next, INTERNAL_SERVICE().code)
    }
})

/**
 * Get the following of the current user.
 *
 * @param req - The request object containing user information and parameters.
 * @param res - The response object used to send back the desired HTTP response.
 * @param next - The next middleware function in the stack.
 *
 * @throws {Error} If the user ID is not found.
 * @returns {Promise<Response>} A promise that resolves to the HTTP response indicating success or failure.
 */
export const getFollowing = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    // Get the user id to get following
    const userId = (req.user as User)?.id
    if (!userId) {
        return ApiError(new Error(UNAUTHORIZED.message), req, next, UNAUTHORIZED.code)
    }

    // Get the following of the user
    try {
        const following = await followServices.getUserFollowing(req, next, userId)
        return ApiResponse(req, res, SUCCESS().code, SUCCESS('User theme preference updated successfully').message, { following })
    } catch (error) {
        return ApiError(new Error(INTERNAL_SERVICE((error as Error)?.message).message), req, next, INTERNAL_SERVICE().code)
    }
})

/**
 * Get the follow status of the current user.
 *
 * @param req - The request object containing user information and parameters.
 * @param res - The response object used to send back the desired HTTP response.
 * @param next - The next middleware function in the stack.
 *
 * @throws {Error} If the user ID is not found.
 * @returns {Promise<Response>} A promise that resolves to the HTTP response indicating success or failure.
 */

export const getFollowStatus = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction): Promise<void> => {
    // Get the user id to get following
    const followerId = (req.user as User)?.id
    if (!followerId) {
        return ApiError(new Error(UNAUTHORIZED.message), req, next, UNAUTHORIZED.code)
    }

    // Get the following of the user
    const followingId: string = req.params.userId
    if (!followingId) {
        return ApiError(new Error(NOT_FOUND('User id is required').message), req, next, NOT_FOUND().code)
    }

    // Payload to get the follow status
    const where = {
        followerId,
        followingId
    }

    // Get the follow status
    try {
        const status = await followServices.getFollowStatus(req, next, where)
        if (!status) {
            return ApiResponse(req, res, SUCCESS().code, SUCCESS('User theme preference updated successfully').message, false)
        }

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('User theme preference updated successfully').message, true)
    } catch (error) {
        return ApiError(new Error(INTERNAL_SERVICE((error as Error)?.message).message), req, next, INTERNAL_SERVICE().code)
    }
})
