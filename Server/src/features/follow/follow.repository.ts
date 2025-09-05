import prisma from '@/config/db.config'

export interface FollowRepository {
    followUser(userId: string, followId: string): Promise<void>
    unfollowUser(userId: string, followId: string): Promise<void>
    getFollowers(userId: string): Promise<void>
    getFollowing(userId: string): Promise<void>
}

export class PrismaFollowRepository implements FollowRepository {
    async followUser(userId: string, followId: string) {
        await prisma.follow.create({
            data: {
                followerId: userId,
                followingId: followId
            }
        })
    }

    async unfollowUser(userId: string, followId: string) {
        await prisma.follow.deleteMany({
            where: {
                followerId: userId,
                followingId: followId
            }
        })
    }

    async getFollowers(userId: string) {
        await prisma.follow.findMany({
            where: {
                followingId: userId
            },
            include: {
                follower: true
            }
        })
    }

    async getFollowing(userId: string) {
        await prisma.follow.findMany({
            where: {
                followerId: userId
            },
            include: {
                following: true
            }
        })
    }
}
