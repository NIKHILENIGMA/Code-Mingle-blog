import prisma from '@/config/prisma.config'
import { EUserProvider, ROLE } from '@/types/common/enum.types'
import { DatabaseError, InternalServerError, NotFoundError } from '@/utils/Errors'
import { StandardError } from '@/utils/Errors/StandardError'
import { CreateUserByGoogleOAuthPayload, Permission } from '../authentication/auth.types'
import { User, UserProvider } from '@prisma/client'
import { generateUniqueUsername } from '@/utils/generateUsername'

export interface OAuthRepository {
    createOAuthUser(payload: CreateUserByGoogleOAuthPayload): Promise<{ user: User; permissions: Permission[] }>
    updateUserProviderTokens(payload: Partial<UserProvider>): Promise<UserProvider>
    checkAccountLinked(userId: string, googleId: string, provider: EUserProvider): Promise<boolean>
    linkGoogleAccount(userId: string, code: string): Promise<void>
}

export interface UpdateOAuthUserPayload {
    userId: string
    profileImage: string
    providerId: string
    provider: 'GOOGLE' | 'GITHUB'
    providerAcessToken: string
    providerRefreshToken?: string
    providerTokenExpiry?: Date
}

class PrismaOAuthRepository implements OAuthRepository {
    async createOAuthUser(payload: CreateUserByGoogleOAuthPayload): Promise<{ user: User; permissions: Permission[] }> {
        try {
            return await prisma.$transaction(async (tx) => {
                const user = await tx.user.create({
                    data: {
                        firstName: payload.given_name,
                        lastName: payload.family_name,
                        email: payload.email,
                        username: generateUniqueUsername(payload.given_name),
                        profileImage: payload.picture,
                        verifiedEmail: true,
                        lastLoginAt: new Date()
                    }
                })

                await tx.userProvider.create({
                    data: {
                        userId: user.id,
                        provider: 'GOOGLE',
                        providerId: payload.sub,
                        providerAccessToken: payload.accessToken,
                        providerRefreshToken: payload.refreshToken ? payload.refreshToken : null,
                        providerTokenExpiry: payload.tokenExpiry ? payload.tokenExpiry : null
                    }
                })

                // Get the user role and permissions
                const role = await tx.role.findFirst({
                    where: {
                        name: ROLE.USER
                    }
                })
                if (!role) {
                    throw new DatabaseError('User role not found')
                }

                const rolePermissions = await tx.rolePermission.findMany({
                    where: {
                        roleId: role.id
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

                return { user, permissions }
            })
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }
            throw new DatabaseError(`Error creating OAuth user: ${(error as Error).message}`, 'PrismaOAuthRepository.createOAuthUser')
        }
    }

    async updateUserProviderTokens(payload: Partial<UserProvider>): Promise<UserProvider> {
        if (!payload.userId || !payload.provider) {
            throw new InternalServerError('User ID and provider are required to update user provider', 'PrismaOAuthRepository.updateUserProvider')
        }
        try {
            return await prisma.userProvider.update({
                where: {
                    userId_provider: {
                        userId: payload.userId,
                        provider: payload.provider
                    }
                },
                data: {
                    providerAccessToken: payload.providerAccessToken,
                    providerRefreshToken: payload.providerRefreshToken,
                    providerTokenExpiry: payload.providerTokenExpiry
                }
            })
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }
            throw new DatabaseError(`Error updating user provider: ${(error as Error).message}`, 'PrismaOAuthRepository.updateUserProvider')
        }
    }

    async checkAccountLinked(userId: string, googleId: string, provider: EUserProvider): Promise<boolean> {
        try {
            const userProvider = await prisma.userProvider.findFirst({
                where: {
                    userId,
                    provider,
                    providerId: googleId
                }
            })
            return userProvider !== null
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }
            throw new DatabaseError(`Error checking account linked status: ${(error as Error).message}`, 'PrismaOAuthRepository.checkAccountLinked')
        }
    }

    async linkGoogleAccount(userId: string, code: string): Promise<void> {
        try {
            await prisma.$transaction(async (tx) => {
                const userProvider = await tx.userProvider.findFirst({
                    where: {
                        userId,
                        provider: EUserProvider.GOOGLE
                    }
                })

                if (!userProvider) {
                    throw new NotFoundError('User provider not found', 'PrismaOAuthRepository.linkGoogleAccount')
                }

                // Update the user provider with the new code
                await tx.userProvider.update({
                    where: {
                        id: userProvider.id
                    },
                    data: {
                        providerAccessToken: code, // Assuming code is the access token here
                        providerTokenExpiry: new Date(Date.now() + 3600 * 1000) // Set expiry to 1 hour from now
                    }
                })


            })
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }

            throw new DatabaseError(`Error linking Google account: ${(error as Error).message}`, 'PrismaOAuthRepository.linkGoogleAccount')
        }
    }
}

export const OAuthRepository = new PrismaOAuthRepository()
