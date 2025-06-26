import prisma from '@/config/prisma.config'
import { DatabaseError } from '@/utils/Errors'
import { Session } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

export interface SessionPayload {
    userId: string
    accessToken: string
    refreshToken: string
    userAgent?: string
    ipAddress?: string
    valid?: boolean
}

export interface ISessionRepository {
    createSession(sessionPayload: SessionPayload): Promise<void>
    updateSession(sessionId: string, sessionPayload: Partial<SessionPayload>): Promise<void>
    getSession(accessToken: string): Promise<Session | null>
    getSessionByUserId(userId: string): Promise<Session | null>
    deleteSession(sessionId: string): Promise<void>
    updateAllSessionsByUserId(userId: string, sessionPayload: Partial<SessionPayload>): Promise<void>
    getSessionByRefreshToken(refreshToken: string): Promise<Session | null>
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

    async getSessionByRefreshToken(refreshToken: string): Promise<Session | null> {
        try {
            return await prisma.session.findUnique({
                where: { refreshToken, valid: true }
            })
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


}

export const sessionRepository = new PrismaSessionRepository()
