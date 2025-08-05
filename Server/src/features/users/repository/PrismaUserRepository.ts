import prisma from '@/config/prisma.config'
import { User, UserProvider } from '@prisma/client'
import { Permission, UserDTO } from '../authentication/auth.types'
import { Dashboard } from '../profile/profile.types'
import { DatabaseError, NotFoundError } from '@/utils/Errors'
import { comparePassword, hashedPassword } from '@/utils/HashPassword'
import { StandardError } from '@/utils/Errors/StandardError'

interface NewUser {
    firstName: string | undefined
    lastName: string | undefined
    username: string
    email: string
    password?: string
    lastLoginAt?: Date | null
    roleId: string
}

export interface IUserRepository {
    create(payload: NewUser): Promise<User>
    update(userId: string, payload: Partial<User>): Promise<User>
    delete(userId: string): Promise<User>
    updatePassword(userId: string, oldPassword: string, newPassword: string): Promise<boolean>
    updateUserDetails(userId: string, payload: Partial<User>): Promise<void>
    getUserPermissions(roleId: string): Promise<unknown>
    getUserById(userId: string): Promise<User | null>
    getUserForLogin(email: string): Promise<{
        user: User
        permissions: Permission[]
    } | null>
    getUserByEmail(email: string): Promise<User | null>
    getUserByUsername(username: string): Promise<UserDTO | null>
    getAllUsers(take?: number, skip?: number): Promise<UserDTO[] | null>
    getFollowingStatus(viewerId: string, profileId: string): Promise<boolean>
    getUserByEmailOrUsername(emailOrUsername: string): Promise<Partial<User> | null>
    getDashboardDetails(userId: string): Promise<Dashboard | null>
    getUserLoginByGoogle(email: string): Promise<UserProvider | null>
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
        verifiedEmail: true,
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

    public async updatePassword(userId: string, oldPassword: string, newPassword: string): Promise<boolean> {
        const updatedPassword = await prisma.$transaction(async (tx) => {
            const user = await tx.user.findFirst({
                where: {
                    id: userId
                }
            })
            if (!user) {
                throw new DatabaseError('User not found', 'PrismaUserRepository.updatePassword')
            }
            if (!user.password) {
                throw new DatabaseError('User does not have a password set', 'PrismaUserRepository.updatePassword')
            }

            // Compare the old password
            const match = await comparePassword(user.password, oldPassword)
            if (!match) {
                throw new DatabaseError('Old password is incorrect', 'PrismaUserRepository.updatePassword')
            }

            // Update the password
            const hashPassword: string = await hashedPassword(newPassword)
            return await tx.user.update({
                where: {
                    id: userId
                },
                data: {
                    password: hashPassword
                }
            })
        })

        return updatedPassword !== null
    }

    public async updateUserDetails(userId: string, payload: Partial<User>): Promise<void> {
        await prisma.user.update({
            where: {
                id: userId
            },
            data: payload
        })
    }

    public async getUserForLogin(email: string): Promise<{
        user: User
        permissions: Permission[]
    } | null> {
        const result = await prisma.user.findUnique({
            where: { email },
            include: {
                role: {
                    include: {
                        rolePerms: {
                            include: {
                                permission: true
                            }
                        }
                    }
                }
            }
        })

        if (!result) return null

        return {
            user: result,
            permissions:
                result.role?.rolePerms.map((rp) => ({
                    id: rp.permission.id,
                    name: rp.permission.name,
                    resource: rp.permission.resource as Permission['resource'],
                    actions: rp.permission.actions
                })) || []
        }
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
            resource: rp.permission.resource as Permission['resource'],
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
        const user = await prisma.user.findUnique({
            where: {
                username
            },
            select: this.userSelect
        })

        if (!user) return null

        return {
            ...user,
            firstName: user.firstName ?? '',
            lastName: user.lastName ?? '',
            profileImage: user.profileImage ?? '',
            roleId: user.roleId ?? ''
        }
    }

    public async getAllUsers(take?: number, skip?: number): Promise<UserDTO[] | null> {
        const users = await prisma.user.findMany({
            take,
            skip,
            select: this.userSelect
        })

        return users.map((user) => ({
            ...user,
            firstName: user.firstName ?? '',
            lastName: user.lastName ?? '',
            bio: user.bio ?? '',
            profileImage: user.profileImage ?? '',
            coverImage: user.coverImage ?? '',
            roleId: user.roleId ?? ''
        }))
    }
    public async getUserByEmailOrUsername(emailOrUsername: string): Promise<Partial<User> | null> {
        const user = await prisma.user.findFirst({
            where: {
                OR: [{ email: emailOrUsername }, { username: emailOrUsername }]
            },
            select: this.userSelect
        })

        if (!user) return null

        return {
            ...user,
            firstName: user.firstName ?? '',
            lastName: user.lastName ?? '',
            profileImage: user.profileImage ?? '',
            coverImage: user.coverImage ?? '',
            roleId: user.roleId ?? ''
        }
    }

    public async getUserLoginByGoogle(email: string): Promise<UserProvider | null> {
        try {
            return await prisma.$transaction(async (tx) => {
                try {
                    const user = await tx.user.findUnique({
                        where: { email }
                    })

                    if (!user) {
                        throw new NotFoundError('User not found', 'PrismaUserRepository.getUserGoogleLogin')
                    }

                    const provider = await tx.userProvider.findFirst({
                        where: { userId: user.id, provider: 'GOOGLE' }
                    })

                    return provider

                } catch (error) {
                    if (error instanceof StandardError) {
                        throw error
                    }

                    throw new DatabaseError(`Error fetching user for Google login: ${(error as Error).message}`, 'PrismaUserRepository.getUserGoogleLogin')
                }
            })
        } catch (error) {
            throw new DatabaseError(`Error fetching user for Google login: ${(error as Error).message}`, 'PrismaUserRepository.getUserGoogleLogin')
        }
    }
}
