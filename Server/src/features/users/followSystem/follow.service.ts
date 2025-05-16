import prisma from '@/config/prisma.config'
import { StandardError } from '@/utils/Errors/StandardError'
import { InternalServerError } from '@/utils/Errors'
import { FollowDTO } from './follow.types'
import { FollowRepository, PrismaFollowRepository } from '../repository/PrismaFollowRepository'

class FollowService {
    constructor(private followRepository: FollowRepository) {
        this.followRepository = followRepository
    }

    public async followUser(follow: { followerId: string; followingId: string }): Promise<FollowDTO | void> {
        try {
            const followUser = await this.followRepository.followUser(follow.followerId, follow.followingId)
            return followUser
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }

            throw new InternalServerError('An unexpected error occurred while following a user')
        }
    }

    public async unfollowUser(where: { followerId: string; followingId: string }): Promise<FollowDTO | void> {
        try {
            const unfollowedUser = await this.followRepository.unfollowUser(where.followerId, where.followingId)

            return unfollowedUser
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }

            throw new InternalServerError('An unexpected error occurred while unfollowing a user')
        }
    }

    public async getUserFollowers(userId: string): Promise<FollowDTO[] | void> {
        try {
            const followers = await prisma.follow.findMany({
                where: {
                    followingId: userId
                }
            })
            return followers
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }

            throw new InternalServerError('An unexpected error occurred while getting followers')
        }
    }

    public async getUserFollowing(userId: string): Promise<FollowDTO[] | void> {
        try {
            const following = await prisma.follow.findMany({
                where: {
                    followerId: userId
                }
            })
            return following
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }

            throw new InternalServerError('An unexpected error occurred while getting following')
        }
    }

    public async getFollowStatus(where: { followerId: string; followingId: string }): Promise<FollowDTO | void> {
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
            if (error instanceof StandardError) {
                throw error
            }

            throw new InternalServerError('An unexpected error occurred while getting follow status')
        }
    }
}

const followService = new FollowService(new PrismaFollowRepository())
export default followService
