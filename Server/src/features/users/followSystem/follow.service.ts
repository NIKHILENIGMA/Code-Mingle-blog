import { NextFunction, Request } from 'express'
import { ApiError } from '../../../utils/ApiError'
import responseMessage from '../../../constant/responseMessage'
import prisma from '../../../Lib/database/PrismaConnection'
import { FollowDTO } from './follow.types'

const { METHOD_FAILED } = responseMessage

export default class FollowService {
    constructor() {}

    /**
     * Follow a user by creating a follow relationship in the database.
     *
     * @param req - The request object containing user information and parameters.
     * @param next - The next middleware function in the stack.
     * @param follow - An object containing the follower ID and the following ID.
     *
     * @throws {Error} If the follow operation fails due to a database error.
     * @returns {Promise<Follow | void>} A promise that resolves to the created follow relationship or void if an error occurs.
     */
    public async followUser(req: Request, next: NextFunction, follow: { followerId: string; followingId: string }): Promise<FollowDTO | void> {
        try {
            const followUser = await prisma.follow.create({
                data: {
                    followerId: follow.followerId,
                    followingId: follow.followingId
                }
            })
            return followUser
        } catch (error) {
            return ApiError(
                error instanceof Error ? error : new Error(METHOD_FAILED('Service failed to follow a user').message),
                req,
                next,
                METHOD_FAILED().code
            )
        }
    }

    /**
     * Unfollow a user by deleting the follow relationship in the database.
     *
     * @param req - The request object containing user information and parameters.
     * @param next - The next middleware function in the stack.
     * @param where - An object containing the follower ID and the following ID.
     *
     * @throws {Error} If the unfollow operation fails due to a database error.
     * @returns {Promise<Follow | void>} A promise that resolves to the deleted follow relationship or void if an error occurs.
     */
    public async unfollowUser(req: Request, next: NextFunction, where: { followerId: string; followingId: string }): Promise<FollowDTO | void> {
        try {
            const unfollowedUser = await prisma.follow.delete({
                where: {
                    followerId_followingId: {
                        followerId: where.followerId,
                        followingId: where.followingId
                    }
                }
            })

            return unfollowedUser
        } catch (error) {
            return ApiError(
                error instanceof Error ? error : new Error(METHOD_FAILED('Service failed to unfollow a user').message),
                req,
                next,
                METHOD_FAILED().code
            )
        }
    }

    /**
     * Get a list of followers for a user.
     *
     * @param req - The request object containing user information and parameters.
     * @param next - The next middleware function in the stack.
     * @param userId - The user ID to get followers for.
     *
     * @throws {Error} If the operation fails due to a database error.
     * @returns {Promise<Follow[] | void>} A promise that resolves to a list of followers or void if an error occurs.
     */
    public async getUserFollowers(req: Request, next: NextFunction, userId: string): Promise<FollowDTO[] | void> {
        try {
            const followers = await prisma.follow.findMany({
                where: {
                    followingId: userId
                }
            })
            return followers
        } catch (error) {
            return ApiError(
                error instanceof Error ? error : new Error(METHOD_FAILED('Service failed to get followers').message),
                req,
                next,
                METHOD_FAILED().code
            )
        }
    }

    /**
     * Get a list of users that a user is following.
     *
     * @param req - The request object containing user information and parameters.
     * @param next - The next middleware function in the stack.
     * @param userId - The user ID to get following for.
     *
     * @throws {Error} If the operation fails due to a database error.
     * @returns {Promise<Follow[] | void>} A promise that resolves to a list of following users or void if an error occurs.
     */
    public async getUserFollowing(req: Request, next: NextFunction, userId: string): Promise<FollowDTO[] | void> {
        try {
            const following = await prisma.follow.findMany({
                where: {
                    followerId: userId
                }
            })
            return following
        } catch (error) {
            return ApiError(
                error instanceof Error ? error : new Error(METHOD_FAILED('Service Failed to get users').message),
                req,
                next,
                METHOD_FAILED().code
            )
        }
    }

    /**
     * Get the follow status of a user.
     *
     * @param req - The request object containing user information and parameters.
     * @param next - The next middleware function in the stack.
     * @param where - An object containing the follower ID and the following ID.
     *
     * @throws {Error} If the operation fails due to a database error.
     * @returns {Promise<Follow | void>} A promise that resolves to the follow status or void if an error occurs.
     */
    public async getFollowStatus(req: Request, next: NextFunction, where: { followerId: string; followingId: string }): Promise<FollowDTO | void> {
        try {
            const followStatus = await prisma.follow.findUnique({
                where: {
                    followerId_followingId: {
                        followerId: where.followerId,
                        followingId: where.followingId
                    }
                }
            })
            if (!followStatus) {
                return
            }
            return followStatus
        } catch (error) {
            return ApiError(
                error instanceof Error ? error : new Error(METHOD_FAILED('Service failed to get follow status').message),
                req,
                next,
                METHOD_FAILED().code
            )
        }
    }
}
