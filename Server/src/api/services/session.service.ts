import { StandardError } from '@/utils/Errors/StandardError'
import { ISessionRepository, SessionPayload, sessionRepository } from '../../features/users/repository/PrismaSessionRepository'
import { DatabaseError, InternalServerError } from '@/utils/Errors'
import { Session } from '@prisma/client'

class SessionService {
    private sessionRepository: ISessionRepository
    constructor() {
        this.sessionRepository = sessionRepository
    }

    public async createSession(sessionPayload: SessionPayload): Promise<void> {
        try {
            await this.sessionRepository.createSession(sessionPayload)
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }
            if (error instanceof Error) {
                throw new InternalServerError(`An unexpected error occurred while creating session: ${error.message}`, 'SessionService.createSession')
            }

            throw new InternalServerError(
                `An unexpected error occurred while creating session: ${(error as Error).message}`,
                'SessionService.createSession'
            )
        }
    }

    public async updateSession(sessionId: string, sessionPayload: Partial<SessionPayload>): Promise<void> {
        try {
            await this.sessionRepository.updateSession(sessionId, sessionPayload)
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }
            if (error instanceof Error) {
                throw new InternalServerError(`An unexpected error occurred while updating session: ${error.message}`, 'SessionService.updateSession')
            }

            throw new InternalServerError(
                `An unexpected error occurred while updating session: ${(error as Error).message}`,
                'SessionService.updateSession'
            )
        }
    }

    public async invalidateSession(sessionId: string): Promise<void> {
        try {
            await this.sessionRepository.updateSession(sessionId, { valid: false })
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }
            if (error instanceof Error) {
                throw new InternalServerError(`An unexpected error occurred while invalidating session: ${error.message}`, 'SessionService.invalidateSession')
            }

            throw new InternalServerError(
                `An unexpected error occurred while invalidating session: ${(error as Error).message}`,
                'SessionService.invalidateSession'
            )
        }
    }

    public async invalidateAllSessionsByUserId(userId: string): Promise<void> {
        try {
            await this.sessionRepository.updateAllSessionsByUserId(userId, { valid: false })

        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }

            if (error instanceof Error) {
                throw new InternalServerError(`An unexpected error occurred while invalidating all sessions by user ID: ${error.message}`, 'SessionService.invalidateAllSessionsByUserId')
            }

            throw new InternalServerError(
                `An unexpected error occurred while invalidating all sessions by user ID: ${(error as Error).message}`,
                'SessionService.invalidateAllSessionsByUserId'
            )
        }
    }

    public async deleteSession(sessionId: string): Promise<void> {
        try {
            await this.sessionRepository.deleteSession(sessionId)
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }
            if (error instanceof Error) {
                throw new InternalServerError(`An unexpected error occurred while deleting session: ${error.message}`, 'SessionService.deleteSession')
            }

            throw new InternalServerError(
                `An unexpected error occurred while deleting session: ${(error as Error).message}`,
                'SessionService.deleteSession'
            )
        }
    }


    // -------------------------------------------- Query Services --------------------------------------------
    public async getSession(sessionId: string): Promise<Session> {
        try {
            const currentSession = await this.sessionRepository.getSession(sessionId)
            if (!currentSession) {
                throw new DatabaseError('Session not found', 'SessionService.getSession')
            }
            return currentSession
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }
            if (error instanceof Error) {
                throw new InternalServerError(`An unexpected error occurred while retrieving session: ${error.message}`, 'SessionService.getSession')
            }

            throw new InternalServerError(
                `An unexpected error occurred while retrieving session: ${(error as Error).message}`,
                'SessionService.getSession'
            )
        }
    }

    public async getSessionByRefreshToken(refreshToken: string): Promise<Session | null> {
        try {
            return await this.sessionRepository.getSessionByRefreshToken(refreshToken)
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }
            if (error instanceof Error) {
                throw new InternalServerError(`An unexpected error occurred while retrieving session by refresh token: ${error.message}`, 'SessionService.getSessionByRefreshToken')
            }

            throw new InternalServerError(
                `An unexpected error occurred while retrieving session by refresh token: ${(error as Error).message}`,
                'SessionService.getSessionByRefreshToken'
            )
        }
    }

    public async getSessionByUserId(userId: string): Promise<Session | null> {
        try {
            return await this.sessionRepository.getSessionByUserId(userId)
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }
            if (error instanceof Error) {
                throw new InternalServerError(`An unexpected error occurred while retrieving session by user ID: ${error.message}`, 'SessionService.getSessionByUserId')
            }

            throw new InternalServerError(
                `An unexpected error occurred while retrieving session by user ID: ${(error as Error).message}`,
                'SessionService.getSessionByUserId'
            )
        }
    }
}

export const sessionService = new SessionService()
