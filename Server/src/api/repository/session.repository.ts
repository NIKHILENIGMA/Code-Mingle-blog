import prisma from '@/config/db.config'
import { DatabaseError } from '@/utils/Errors'
import { Session } from '@/generated/prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

export interface SessionPayload {
    id?: string
    userId: string
    accessToken: string
    refreshToken: string
    userAgent?: string
    ipAddress?: string
    valid?: boolean
}

export interface SessionWithUser {
    id: string
    userId: string
    accessToken: string
    refreshToken: string
    valid: boolean
    createdAt: Date
    updatedAt: Date
    user: {
        id: string
        firstName: string | null
        lastName: string | null
        email: string
        username: string
        profileImage: string | null
        roleId: string | null
        verifiedEmail: boolean
    }
}

export interface ISessionRepository {
    createSession(sessionPayload: SessionPayload): Promise<void>
    updateSession(sessionId: string, sessionPayload: Partial<SessionPayload>): Promise<void>
    getSession(accessToken: string): Promise<Session | null>
    validateSession(userId: string, accessToken: string): Promise<SessionWithUser | null>
    getSessionByUserId(userId: string): Promise<Session | null>
    deleteSession(sessionId: string): Promise<void>
    updateAllSessionsByUserId(userId: string, sessionPayload: Partial<SessionPayload>): Promise<void>
    getSessionByRefreshToken(userId: string, refreshToken: string): Promise<Session | null>
    loginUserSession(sessionPayload: SessionPayload): Promise<void>
}

class PrismaSessionRepository implements ISessionRepository {
    constructor() {}
    async createSession(sessionPayload: SessionPayload): Promise<void> {
        try {
            await prisma.session.create({
                data: sessionPayload
            })
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new DatabaseError(`Error creating session: ${error.message}`, 'PrismaSessionRepository.createSession')
            }

            throw new DatabaseError(
                `An unexpected error while creating session: ${(error as Error).message}`,
                'PrismaSessionRepository.createSession'
            )
        }
    }

    async updateSession(sessionId: string, sessionPayload: Partial<SessionPayload>): Promise<void> {
        try {
            await prisma.session.update({
                where: { id: sessionId },
                data: sessionPayload
            })
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new DatabaseError(`Error updating session: ${error.message}`, 'PrismaSessionRepository.updateSession')
            }

            throw new DatabaseError(
                `An unexpected error while updating session: ${(error as Error).message}`,
                'PrismaSessionRepository.updateSession'
            )
        }
    }

    async validateSession(userId: string, accessToken: string): Promise<SessionWithUser | null> {
        try {
            return await prisma.session.findFirst({
                where: { userId, accessToken, valid: true },
                include: {
                    user: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            username: true,
                            email: true,
                            roleId: true,
                            profileImage: true,
                            verifiedEmail: true
                        }
                    }
                }
            })
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new DatabaseError(`Error validating session: ${error.message}`, 'PrismaSessionRepository.validateSession')
            }

            throw new DatabaseError(
                `An unexpected error while validating session: ${(error as Error).message}`,
                'PrismaSessionRepository.validateSession'
            )
        }
    }

    async getSession(accessToken: string): Promise<Session | null> {
        try {
            return await prisma.session.findUnique({
                where: { accessToken, valid: true }
            })
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new DatabaseError(`Error retrieving session: ${error.message}`, 'PrismaSessionRepository.getSession')
            }

            throw new DatabaseError(`An unexpected error while retrieving session: ${(error as Error).message}`, 'PrismaSessionRepository.getSession')
        }
    }

    async getSessionByUserId(userId: string): Promise<Session | null> {
        try {
            return await prisma.session.findFirst({
                where: { userId, valid: true }
            })
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new DatabaseError(`Error retrieving session by user ID: ${error.message}`, 'PrismaSessionRepository.getSessionByUserId')
            }

            throw new DatabaseError(
                `An unexpected error while retrieving session by user ID: ${(error as Error).message}`,
                'PrismaSessionRepository.getSessionByUserId'
            )
        }
    }

    async getSessionByRefreshToken(userId: string, refreshToken: string): Promise<Session | null> {
        try {
            const userSession = await prisma.session.findUnique({
                where: { userId, refreshToken, valid: true }
            })
            if (!userSession) {
                return null
            }
            return userSession
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new DatabaseError(
                    `Error retrieving session by refresh token: ${error.message}`,
                    'PrismaSessionRepository.getSessionByRefreshToken'
                )
            }

            throw new DatabaseError(
                `An unexpected error while retrieving session by refresh token: ${(error as Error).message}`,
                'PrismaSessionRepository.getSessionByRefreshToken'
            )
        }
    }

    async deleteSession(sessionId: string): Promise<void> {
        try {
            await prisma.session.update({
                where: { id: sessionId, valid: true },
                data: { valid: false }
            })
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new DatabaseError(`Error deleting session: ${error.message}`, 'PrismaSessionRepository.deleteSession')
            }

            throw new DatabaseError(
                `An unexpected error while deleting session: ${(error as Error).message}`,
                'PrismaSessionRepository.deleteSession'
            )
        }
    }

    async updateAllSessionsByUserId(userId: string, payload: Partial<Session>): Promise<void> {
        try {
            await prisma.session.updateMany({
                where: { userId, valid: true },
                data: payload
            })
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new DatabaseError(
                    `Error deleting all sessions by user ID: ${error.message}`,
                    'PrismaSessionRepository.deleteAllSessionsByUserId'
                )
            }

            throw new DatabaseError(
                `An unexpected error while deleting all sessions by user ID: ${(error as Error).message}`,
                'PrismaSessionRepository.deleteAllSessionsByUserId'
            )
        }
    }

    async loginUserSession(sessionPayload: SessionPayload): Promise<void> {
        try {
            await prisma.$transaction(async (tx) => {
                await tx.session.updateMany({
                    where: { userId: sessionPayload.userId, valid: true },
                    data: { valid: false }
                })
            })

            await prisma.session.create({
                data: {
                    userId: sessionPayload.userId,
                    accessToken: sessionPayload.accessToken,
                    refreshToken: sessionPayload.refreshToken,
                    userAgent: sessionPayload.userAgent,
                    ipAddress: sessionPayload.ipAddress,
                    valid: true
                }
            })
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new DatabaseError(`Error logging in user session: ${error.message}`, 'PrismaSessionRepository.loginUserSession')
            }

            throw new DatabaseError(
                `An unexpected error while logging in user session: ${(error as Error).message}`,
                'PrismaSessionRepository.loginUserSession'
            )
        }
    }
}

export const sessionRepository = new PrismaSessionRepository()
