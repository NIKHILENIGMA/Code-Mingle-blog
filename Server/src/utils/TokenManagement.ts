import fs from 'fs/promises'
import crypto from 'crypto'
import jwt, { Algorithm, sign, SignOptions, verify } from 'jsonwebtoken'
import { InternalServerError } from './Errors'
import {
    ACCESS_TOKEN_VALIDITY_IN_SEC,
    JWT_ALGORITHM,
    JWT_AUDIENCE,
    JWT_ISSUER,
    PRIVATE_KEY_PATH,
    PUBLIC_KEY_PATH,
    REFRESH_TOKEN_VALIDITY_IN_SEC
} from '@/config/app.config'
import { logger } from './logger/index'
import { Permission } from '@/features/users/authentication/auth.types'
import { StandardError } from './Errors/StandardError'
import { User } from '@prisma/client'

interface JWTPayload {
    id: string
    email: string
    username: string
    roleId: string
    lastLoginAt: Date
    emailVerified: boolean
    permission?: Permission[]
}
interface AuthTokens {
    accessToken: string
    refreshToken: string
}

interface TokenPayload {
    type: 'ACCESS' | 'REFRESH'
    subject: {
        id: string
        email: string
        username: string
        roleId: string
        emailVerified: boolean
        lastLoginAt: Date
        permission?: Permission[]
    }
}

class TokenManagement {
    private static instance: TokenManagement

    private constructor() {}

    public static getInstance(): TokenManagement {
        if (!TokenManagement.instance) {
            TokenManagement.instance = new TokenManagement()
        }
        return TokenManagement.instance
    }

    public async generateToken(tokenPayload: TokenPayload): Promise<string> {
        try {
            const PRIVATE_KEY: string = await fs.readFile(PRIVATE_KEY_PATH, 'utf8')
            if (!PRIVATE_KEY) {
                throw new InternalServerError('Failed to read private key, please check the file path')
            }

            const payload = {
                id: tokenPayload.subject.id,
                email: tokenPayload.subject.email,
                username: tokenPayload.subject.username,
                roleId: tokenPayload.subject.roleId,
                lastLoginAt: tokenPayload.subject.lastLoginAt,
                emailVerified: tokenPayload.subject.emailVerified
            }

            const signOptions: SignOptions = {
                algorithm: JWT_ALGORITHM as Algorithm,
                issuer: JWT_ISSUER,
                audience: JWT_AUDIENCE,
                expiresIn: tokenPayload.type === 'ACCESS' ? ACCESS_TOKEN_VALIDITY_IN_SEC : REFRESH_TOKEN_VALIDITY_IN_SEC
            }

            const token = sign(payload, PRIVATE_KEY, signOptions)

            if (!token) {
                throw new InternalServerError('Failed to generate token')
            }

            return token
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }

            if (error instanceof Error && error.message.includes('ENOENT')) {
                throw new InternalServerError(`Private key file not found at ${PRIVATE_KEY_PATH}`, 'generateToken')
            }

            logger.error('Error generating token', error)

            throw new InternalServerError('Something went wrong while generating the token', 'generateToken')
        }
    }

    public async verifyToken(token: string): Promise<JWTPayload> {
        const PUBLIC_KEY = await fs.readFile(PUBLIC_KEY_PATH, 'utf-8')

        if (!PUBLIC_KEY) {
            throw new InternalServerError('Failed to read public key, please check the file path')
        }

        try {
            const decoded = verify(token, PUBLIC_KEY) as JWTPayload
            if (!decoded) {
                throw new InternalServerError('Failed to decode token')
            }
            logger.info('Token decoded successfully', decoded)
            return decoded
        } catch (error) {
            if (error instanceof jwt.JsonWebTokenError) {
                throw new InternalServerError('Invalid token')
            } else if (error instanceof jwt.TokenExpiredError) {
                throw new InternalServerError('Token expired')
            } else if (error instanceof jwt.NotBeforeError) {
                throw new InternalServerError('Token not active yet')
            }
            throw new InternalServerError('Failed to verify token')
        }
    }

    public async getTokens(user: User, rolePermissions: Permission[]): Promise<AuthTokens> {
        // Generate tokens
        const payload = {
            id: user.id,
            email: user.email,
            username: user.username,
            roleId: user.roleId!,
            lastLoginAt: user.lastLoginAt!,
            emailVerified: user.verifiedEmail,
            permissions: rolePermissions.map((permission) => ({
                id: permission.id,
                name: permission.name,
                resource: permission.resource,
                actions: Array.isArray(permission.actions) ? permission.actions : [permission.actions]
            }))
        }

        // Generate access and refresh tokens
        try {
            const accessToken = await tokenManagement.generateToken({
                type: 'ACCESS',
                subject: payload
            })

            const refreshToken = await tokenManagement.generateToken({
                type: 'REFRESH',
                subject: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    roleId: user.roleId!,
                    lastLoginAt: user.lastLoginAt!,
                    emailVerified: user.verifiedEmail
                }
            })

            return {
                accessToken,
                refreshToken
            }
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }
            if (error instanceof Error) {
                logger.error(`Error generating tokens: ${error.message}`)
                throw new InternalServerError('Error generating tokens')
            }

            throw new InternalServerError('An unexpected error occurred while generating tokens')
        }
    }
    public generateVerificationToken(): string {
        return crypto.randomBytes(32).toString('hex')
    }
}

const tokenManagement = TokenManagement.getInstance()

export default tokenManagement
