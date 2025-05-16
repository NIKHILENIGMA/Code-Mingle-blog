import { Request, Response, NextFunction } from 'express'
import { BadRequestError, InternalServerError, UnauthorizedError } from '@/utils/Errors'
import { AsyncHandler, tokenManagement } from '@/utils'
import { StandardError } from '@/utils/Errors/StandardError'
import { PrismaUserRepository } from '@/features/users/repository/PrismaUserRepository'
import { UserDTO } from '@/features/users/authentication/auth.types'
import { PrismaSessionRepository } from '@/features/users/repository/PrismaSessionRepository'

const userRepository = new PrismaUserRepository()
const sessionRepository = new PrismaSessionRepository()

const extractToken = (req: Request): string => {
    let token = null
    const authHeader = req.headers['authorization']
    if (authHeader && typeof authHeader === 'string') {
        const parts = authHeader.split(' ')
        if (parts.length === 2 && parts[0] === 'Bearer') {
            token = parts[1]
        }
    }

    if (!token) {
        const cookies = req.cookies as Record<string, string>
        token = cookies['access_token']
        if (!token) {
            throw new BadRequestError('Access token not found in request headers or cookies')
        }
    }

    return token
}

export const isAuthenticated = AsyncHandler(async (req: Request, _: Response, next: NextFunction) => {
    try {
        // Check if the request has an authorization header
        const accessToken = extractToken(req)

        // Check if the access token is valid
        const decodedToken = await tokenManagement.verifyToken(accessToken)
        if (!decodedToken) {
            throw new UnauthorizedError('Invalid access token')
        }

        // Find user by id
        const user: UserDTO | null = await userRepository.getUserById(decodedToken.id)
        if (!user) {
            throw new BadRequestError('User not found')
        }

        // Attach user to request object
        req.user = {
            id: user.id,
            email: user.email,
            roleId: user.roleId!,
            lastLoginAt: user.lastLoginAt!
        }

        // Check if session is valid
        const session = await sessionRepository.getSessionByUserId(user.id)
        if (!session) {
            throw new UnauthorizedError('Session not found')
        }

        if (session.userId !== user.id) {
            throw new UnauthorizedError('Session does not belong to the user')
        }

        // Attach session to request object
        req.session = {
            id: session?.id,
            userId: session?.userId,
            accessToken: session?.accessToken,
            refreshToken: session?.refreshToken,
            valid: session?.valid,
        }


        // todo add permissions to request object
        // const permissions = await permissionRepository.getPermissionsByRoleId(user.roleId)
        // req.perms = decodedToken.permission

        next()
    } catch (error) {
        if (error instanceof StandardError) {
            throw error
        }

        throw new InternalServerError('An unexpected error occurred during authentication')
    }
})
