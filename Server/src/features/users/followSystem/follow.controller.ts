import { Request, Response } from 'express'
import { AsyncHandler } from '@/utils/AsyncHandler'
import { ApiResponse } from '@/utils/ApiResponse'
import { User } from '@/Lib/Models/User'
import followService from './follow.service'
import { BadRequestError, DatabaseError, NotFoundError, UnauthorizedError } from '@/utils/Errors'

interface FollowStatus {
    followStatus: boolean
}

export const followUser = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    // Get the user id to follow
    const followerId: string | undefined = req.user?.id
    if (!followerId || followerId === undefined) {
        throw new UnauthorizedError('User is not loggedin ')
    }

    // Get the user id to follow
    const followingId: string = req.params.id
    if (!followingId) {
        throw new NotFoundError('The user ID to follow is required.')
    }

    // Check userid is not same
    if (followerId === followingId) {
        throw new BadRequestError('You cannot follow yourself.')
    }

    const status = req.body as FollowStatus
    if (!status || status.followStatus === undefined) {
        throw new NotFoundError('Follow status is required.')
    }

    // Check if the user is already following
    if (status.followStatus === true) {
        throw new BadRequestError('User is already following.')
    }

    // Follow the user
    await followService.followUser({ followerId, followingId })

    ApiResponse(req, res, 200, 'Follow user successfully', {})
})

export const unfollowUser = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const followerId = (req.user as User)?.id
    if (!followerId) {
        throw new UnauthorizedError('User is not loggedin')
    }

    // Get the user id to unfollow
    const followingId: string = req.params.followingId
    if (!followingId) {
        throw new NotFoundError('The user ID to unfollow is required.')
    }

    // Check status
    const status = req.body as FollowStatus
    if (!status || status.followStatus === undefined) {
        throw new NotFoundError('Follow status is required.')
    }

    // Check if the user is not following
    if (status.followStatus === false) {
        throw new BadRequestError('User is not following.')
    }

    // Unfollow the user
    await followService.unfollowUser({ followerId, followingId })

    // Return the unfollowed user
    ApiResponse(req, res, 200, 'Unfollow user successfully', {})
})

export const getFollowers = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.id
    if (!userId) {
        throw new UnauthorizedError('User is not loggedin')
    }

    // Get the followers of the user
    const followers = await followService.getUserFollowers(userId)
    if (!followers) {
        throw new DatabaseError('User followers not found')
    }

    // Return the followers of the user
    ApiResponse(req, res, 200, 'User followers fetch successfully', { followers })
})

export const getFollowing = AsyncHandler(async (req: Request, res: Response) => {
    // Get the user id to get following
    const userId = req.user?.id
    if (!userId) {
        throw new UnauthorizedError('User is not loggedin')
    }

    // Get the following of the user
    const following = await followService.getUserFollowing(userId)
    if (!following) {
        throw new DatabaseError('User following not found')
    }

    // Return the following of the user
    ApiResponse(req, res, 200, 'User following fetch successfully', { following })
})

export const getFollowStatus = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    // Get the user id to get following
    const followerId = (req.user as User)?.id
    if (!followerId) {
        throw new UnauthorizedError('User is not loggedin')
    }

    // Get the following of the user
    const followingId: string = req.params.id
    if (!followingId) {
        throw new NotFoundError('The user ID to get follow status is required.')
    }

    // Get the follow status
    const status = await followService.getFollowStatus({
        followerId,
        followingId
    })
    if (!status) {
        throw new DatabaseError('User follow status not found')
    }

    ApiResponse(req, res, 200, 'User theme preference updated successfully', { followStatus: status })
})
