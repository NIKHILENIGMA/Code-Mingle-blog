import { Request, Response, NextFunction } from 'express'
import { InternalServerError, UnauthorizedError } from '@/utils/Errors'
import { AsyncHandler, tokenManagement } from '@/utils'
import { StandardError } from '@/utils/Errors/StandardError'
import { sessionRepository } from '@/features/users/repository/PrismaSessionRepository'



export const isAuthenticated = AsyncHandler(async (req: Request, _: Response, next: NextFunction) => {
    try {
        // Check if the request has an authorization header
        const accessToken = tokenManagement.extractToken(req)

        if (!accessToken) {
            throw new UnauthorizedError('Access token not found')
        }

        // Check if the access token is valid
        const decodedToken = await tokenManagement.verifyAccessToken(accessToken)
        if (!decodedToken) {
            throw new UnauthorizedError('Invalid access token')
        }

        const validateSession = await sessionRepository.validateSession(decodedToken.sub, accessToken)
        if (!validateSession) {
            throw new UnauthorizedError('Session is not valid or does not exist')
        }

        // Attach user information to the request object
        req.user = {
            id: validateSession.user.id,
            firstName: validateSession.user.firstName!,
            lastName: validateSession.user.lastName,
            email: validateSession.user.email,
            username: validateSession.user.username,
            profileImage: validateSession.user.profileImage,
            roleId: validateSession.user.roleId!,
            verifiedEmail: validateSession.user.verifiedEmail
        }

        // Attach session information to the request object
        req.session = {
            id: validateSession.id,
            userId: validateSession.userId,
            accessToken: validateSession.accessToken,
            refreshToken: validateSession.refreshToken,
            valid: validateSession.valid
        }

        // Check if the session is valid
        const rolePermissions = decodedToken.permissions
        if (!rolePermissions || Object.keys(rolePermissions).length === 0) {
            throw new UnauthorizedError('No permissions found for the user')
        }

        // Attach role permissions to the request object
        req.rolePermissions = rolePermissions
        

        next()
    } catch (error) {
        if (error instanceof StandardError) {
            throw error
        }

        throw new InternalServerError('An unexpected error occurred during authentication')
    }
})
