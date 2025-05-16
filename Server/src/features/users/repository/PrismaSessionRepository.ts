import prisma from '@/config/prisma.config'
import { Session } from '@prisma/client'

interface SessionPayload {
    userId: string
    accessToken: string
    refreshToken: string
    userAgent?: string
    ipAddress?: string
}

interface ISessionRepository {
    createSession(sessionPayload: SessionPayload): Promise<void>
    updateSession(sessionId: string, sessionPayload: Partial<SessionPayload>): Promise<void>
    getSession(accessToken: string): Promise<Session | null>
    getSessionByUserId(userId: string): Promise<Session | null>
    deleteSession(sessionId: string): Promise<void>
}

export class PrismaSessionRepository implements ISessionRepository {
    async createSession(sessionPayload: SessionPayload): Promise<void> {
        await prisma.session.create({
            data: sessionPayload
        })
    }

    async updateSession(sessionId: string, sessionPayload: Partial<SessionPayload>): Promise<void> {
        await prisma.session.update({
            where: { id: sessionId },
            data: sessionPayload
        })
    }

    async getSession(accessToken: string): Promise<Session | null> {
        return await prisma.session.findUnique({
            where: { accessToken, valid: true }
        })
    }

    async getSessionByUserId(userId: string): Promise<Session | null> {
        return await prisma.session.findFirst({
            where: { userId, valid: true }
        })
    }

    async getSessionByRefreshToken(refreshToken: string): Promise<Session | null> {
        return await prisma.session.findUnique({
            where: { refreshToken, valid: true }
        })
    }

    async deleteSession(sessionId: string): Promise<void> {
        await prisma.session.update({
            where: { id: sessionId, valid: true },
            data: { valid: false }
        })
    }
}
