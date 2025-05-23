// import prisma from '@/config/prisma.config'
// import { UnauthorizedError } from '@/utils/Errors'
// import { Resource } from '@prisma/client'

export class AuthorizationService {
    private static instance: AuthorizationService

    private constructor() {
        // Private constructor to prevent instantiation
    }

    public static getInstance(): AuthorizationService {
        if (!AuthorizationService.instance) {
            AuthorizationService.instance = new AuthorizationService()
        }
        return AuthorizationService.instance
    }
}
