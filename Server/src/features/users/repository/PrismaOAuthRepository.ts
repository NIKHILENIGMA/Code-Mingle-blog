import prisma from '@/config/prisma.config'
import { ROLE } from '@/types/common/enum.types'
import { DatabaseError } from '@/utils/Errors'
import { StandardError } from '@/utils/Errors/StandardError'
import { Permission } from '../authentication/auth.types'
import { User } from '@prisma/client'

export interface OAuthRepository {
    createOAuthUser(payload: CreateOAuthUserPayload): Promise<{ user: User; permissions: Permission[] }>
    updateUserWithOAuth(payload: UpdateOAuthUserPayload): Promise<{ user: User; permissions: Permission[] }>
}

export interface CreateOAuthUserPayload {
    firstName: string
    lastName: string
    email: string
    username: string
    profileImage: string
    provider: 'GOOGLE' | 'GITHUB'
    providerId: string
    providerAcessToken: string
    providerRefreshToken?: string
    providerTokenExpiry?: Date
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
    async createOAuthUser(payload: CreateOAuthUserPayload): Promise<{ user: User; permissions: Permission[] }> {
        try {
            return await prisma.$transaction(async (tx) => {
                const user = await tx.user.create({
                    data: {
                        firstName: payload.firstName,
                        lastName: payload.lastName,
                        username: payload.username,
                        authProvider: payload.provider,
                        providerId: payload.providerId,
                        email: payload.email,
                        profileImage: payload.profileImage,
                        providerAccessToken: payload.providerAcessToken,
                        providerRefreshToken: payload.providerRefreshToken ? payload.providerRefreshToken : null,
                        verifiedEmail: true,
                        lastLoginAt: new Date()
                    }
                })

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
                    resource: rp.permission.resource,
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

    async updateUserWithOAuth(payload: UpdateOAuthUserPayload): Promise<{ user: User; permissions: Permission[] }> {
        try {
            return await prisma.$transaction(async (tx) => {
                const user = await tx.user.update({
                    where: {
                        id: payload.userId
                    },
                    data: {
                        profileImage: payload.profileImage,
                        authProvider: payload.provider,
                        providerId: payload.providerId,
                        providerAccessToken: payload.providerAcessToken,
                        providerRefreshToken: payload.providerRefreshToken,
                        providerTokenExpiry: payload.providerTokenExpiry,
                        verifiedEmail: true,
                        lastLoginAt: new Date()
                    }
                })

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
                    resource: rp.permission.resource,
                    actions: rp.permission.actions
                }))

                return { user, permissions }
            })
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }

            throw new DatabaseError(`Error updating OAuth user: ${(error as Error).message}`, 'PrismaOAuthRepository.updateUserWithOAuth')
        }
    }
}

export const OAuthRepository = new PrismaOAuthRepository()
