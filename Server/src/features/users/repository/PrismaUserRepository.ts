import prisma from '@/config/prisma.config'
import { User } from '@prisma/client'
import { Permission, UserDTO } from '../authentication/auth.types'
import { Dashboard } from '../profile/profile.types'
import { DatabaseError } from '@/utils/Errors'
// import { DatabaseError } from '@/utils/Errors'

interface NewUser {
    firstName: string | undefined
    lastName: string | undefined
    username: string
    email: string
    password: string
    lastLoginAt?: Date | null
    roleId: string
}

export interface IUserRepository {
    create(payload: NewUser): Promise<User>
    update(userId: string, payload: Partial<User>): Promise<User>
    delete(userId: string): Promise<User>
    updatePassword(userId: string, newPassword: string): Promise<boolean>
    updateUserDetails(userId: string, payload: Partial<User>): Promise<void>
    getUserPermissions(roleId: string): Promise<unknown>
    getUserById(userId: string): Promise<User | null>
    getUserByEmail(email: string): Promise<User | null>
    getUserByUsername(username: string): Promise<UserDTO | null>
    getAllUsers(take?: number, skip?: number): Promise<UserDTO[] | null>
    getFollowingStatus(viewerId: string, profileId: string): Promise<boolean>
    getUserByEmailOrUsername(emailOrUsername: string): Promise<UserDTO | null>
    getDashboardDetails(userId: string): Promise<Dashboard | null>
}

export class PrismaUserRepository implements IUserRepository {
    private readonly userSelect = {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        username: true,
        bio: true,
        profileImage: true,
        coverImage: true,
        lastLoginAt: true,
        roleId: true,
        createdAt: true,
        updatedAt: true
    }

    public async create(payload: NewUser): Promise<User> {
        try {
            const user = await prisma.user.create({
                data: payload
            })

            return user
        } catch (error) {
            throw new DatabaseError(`Error creating user: ${(error as Error).message}`, 'PrismaUserRepository.create')
        }
    }

    public async update(userId: string, payload: Partial<User>): Promise<User> {
        const updatedUser = await prisma.user.update({
            where: {
                id: userId
            },
            data: payload
        })

        return updatedUser
    }

    public async delete(userId: string): Promise<User> {
        const deletedUser = await prisma.user.delete({
            where: {
                id: userId
            }
        })

        return deletedUser
    }

    public async updatePassword(userId: string, newPassword: string): Promise<boolean> {
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                password: newPassword
            }
        })
        return true
    }

    public async updateUserDetails(userId: string, payload: Partial<User>): Promise<void> {
        await prisma.user.update({
            where: {
                id: userId
            },
            data: payload
        })
    }

    public async getUserPermissions(roleId: string): Promise<Permission[]> {
        const rolePermissions = await prisma.rolePermission.findMany({
            where: {
                roleId
            },
            include: {
                permission: true
            }
        })

        const permissions: Permission[] = rolePermissions.map((rp) => ({
            id: rp.permission.id,
            name: rp.permission.name,
            resource: rp.permission.resource,
            actions: rp.permission.actions
        }))

        return permissions
    }

    public async getDashboardDetails(userId: string): Promise<Dashboard | null> {
        const dashboard = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                profileImage: true,
                coverImage: true,
                socialLinks: {
                    select: {
                        linkedin: true,
                        github: true,
                        instagram: true,
                        twitter: true,
                        youtube: true,
                        website: true
                    }
                },
                followers: {
                    select: {
                        follower: {
                            select: { id: true, username: true, profileImage: true }
                        }
                    }
                },
                following: {
                    select: {
                        following: {
                            select: { id: true, username: true, profileImage: true }
                        }
                    }
                },
                posts: {
                    where: { status: 'PUBLISHED' }, // Filter only published posts
                    select: {
                        id: true,
                        title: true,
                        content: true,
                        postCoverImage: true,
                        createdAt: true
                    }
                }
            }
        })

        return dashboard
    }

    public async getFollowingStatus(viewerId: string, profileId: string): Promise<boolean> {
        const isFollowing = (await prisma.follow.findUnique({
            where: { followerId_followingId: { followerId: viewerId, followingId: profileId } }
        }))
            ? true
            : false

        return isFollowing
    }

    public async getUserById(userId: string): Promise<User | null> {
        return await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
    }

    public async getUserByEmail(email: string): Promise<User | null> {
        try {
            return await prisma.user.findUnique({
                where: {
                    email
                }
            })
        } catch (error) {
            throw new DatabaseError(`Error fetching user by email: ${(error as Error).message}`, 'PrismaUserRepository.getUserByEmail')
        }
    }

    public async getUserByUsername(username: string): Promise<UserDTO | null> {
        return await prisma.user.findUnique({
            where: {
                username
            },
            select: this.userSelect
        })
    }

    public async getAllUsers(take?: number, skip?: number): Promise<UserDTO[] | null> {
        return await prisma.user.findMany({
            take,
            skip,
            select: this.userSelect
        })
    }
    public async getUserByEmailOrUsername(emailOrUsername: string): Promise<UserDTO | null> {
        return await prisma.user.findFirst({
            where: {
                OR: [{ email: emailOrUsername }, { username: emailOrUsername }]
            },
            select: this.userSelect
        })
    }
}
