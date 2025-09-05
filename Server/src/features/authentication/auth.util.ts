import { type Request } from 'express'
import argon2 from 'argon2'
import fs from 'fs/promises'
import { ARGON_MEMORY_COST, ARGON_PARALLELISM, ARGON_TIME_COST } from '@/config/app.config'
import { User } from '@/generated/prisma/client'
import jwt, { Algorithm, JsonWebTokenError, SignOptions, TokenExpiredError } from 'jsonwebtoken'
import {
    ACCESS_TOKEN_VALIDITY_IN_SEC,
    JWT_ALGORITHM,
    JWT_AUDIENCE,
    JWT_ISSUER,
    PRIVATE_KEY_PATH,
    PUBLIC_KEY_PATH,
    REFRESH_TOKEN_VALIDITY_IN_SEC
} from '@/config/app.config'
import { InternalServerError } from '@/utils/Errors'
import { Permission } from './auth.types'

export type FlattenedPermissions = Record<string, string[]>

export interface AccessTokenPayload {
    sub: string // Subject of the token, typically user ID
    email: string // User's email address
    username: string // User's username
    roleId: string // ID of the user's role
    permissions?: FlattenedPermissions | null // Flattened permissions for the user
}

export interface RefreshTokenPayload {
    sub: string
    email: string
}

export type JWTError = JsonWebTokenError | TokenExpiredError

class AuthUtil {
    static extractToken(req: Request): string | null {
        let token: string | null = null
        const authHeader = req.headers['authorization']
        if (authHeader && typeof authHeader === 'string') {
            token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null
        }

        if (!token) {
            const cookies = req.cookies as Record<string, string>
            token = cookies['access_token']
            return token && token.trim() !== '' ? token : null
        }

        return token
    }

    static generateUniqueUsername(name: string): string {
        const nouns: string[] = ['lion', 'rocket', 'ninja', 'owl', 'tiger']
        const noun: string = nouns[Math.floor(Math.random() * nouns.length)]
        const randomString: string = Math.random().toString(36).substring(2, 10)
        const time: number = new Date().getMilliseconds()

        return `${name}_${noun}_${randomString}_${time}`
    }
}

class TokenManager {
    private static publicKey: string | null = null // cached public key
    private static privateKey: string | null = null // cached private key

    constructor() {
        // Private constructor to prevent instantiation
    }

    private async getPrivateKey(): Promise<string> {
        if (!TokenManager.privateKey) {
            TokenManager.privateKey = await fs.readFile(PRIVATE_KEY_PATH, 'utf8')
        }
        return TokenManager.privateKey
    }

    private async getPublicKey(): Promise<string> {
        if (!TokenManager.publicKey) {
            TokenManager.publicKey = await fs.readFile(PUBLIC_KEY_PATH, 'utf8')
        }
        return TokenManager.publicKey
    }

    public async createAccessToken(user: User, permissions: Permission[]): Promise<string> {
        const PRIVATE_KEY = await this.getPrivateKey()
        if (!PRIVATE_KEY) {
            throw new InternalServerError('Failed to read private key, please check the file path')
        }
        const payload: AccessTokenPayload = {
            sub: user.id,
            email: user.email,
            username: user.username,
            roleId: user.roleId!,
            permissions: this.flatPermissions(permissions)
        }

        const signOptions: SignOptions = {
            algorithm: JWT_ALGORITHM as Algorithm, // RS256
            issuer: JWT_ISSUER, // Issuer of the token
            audience: JWT_AUDIENCE, // Audience for which the token is intended
            expiresIn: ACCESS_TOKEN_VALIDITY_IN_SEC // Token validity in seconds
        }

        return jwt.sign(payload, PRIVATE_KEY, signOptions) // Sign the token with the private key
    }

    public async verifyAccessToken(token: string): Promise<AccessTokenPayload> {
        const PUBLIC_KEY = await this.getPublicKey()
        if (!PUBLIC_KEY) {
            throw new InternalServerError('Failed to read public key, please check the file path')
        }

        if (!token) {
            throw new InternalServerError('Token is required for verification')
        }

        try {
            return jwt.verify(token, PUBLIC_KEY, { algorithms: [JWT_ALGORITHM as Algorithm] }) as AccessTokenPayload
        } catch (error) {
            const errorMap: Record<string, string> = {
                JsonWebTokenError: 'Invalid token.',
                TokenExpiredError: 'Access token expired.',
                NotBeforeError: 'Token not active yet.'
            }
            const name = (error as JWTError).name
            const message = errorMap[name] || 'Failed to verify access token.'
            throw new InternalServerError(message)
        }
    }

    public async createRefreshToken(userId: string, email: string): Promise<string> {
        const PRIVATE_KEY = await this.getPrivateKey()
        if (!PRIVATE_KEY) {
            throw new InternalServerError('Failed to read private key, please check the file path')
        }

        const payload: RefreshTokenPayload = {
            sub: userId,
            email // Optional email field for additional context
        }

        const signOptions: SignOptions = {
            algorithm: JWT_ALGORITHM as Algorithm,
            issuer: JWT_ISSUER,
            audience: JWT_AUDIENCE,
            expiresIn: REFRESH_TOKEN_VALIDITY_IN_SEC
        }

        return jwt.sign(payload, PRIVATE_KEY, signOptions)
    }

    public async verifyRefreshToken(token: string): Promise<RefreshTokenPayload> {
        const PUBLIC_KEY = await this.getPublicKey()
        if (!PUBLIC_KEY) {
            throw new InternalServerError('Failed to read public key, please check the file path')
        }

        if (!token) {
            throw new InternalServerError('Token is required for verification')
        }

        try {
            return jwt.verify(token, PUBLIC_KEY, { algorithms: [JWT_ALGORITHM as Algorithm] }) as RefreshTokenPayload
        } catch (error) {
            const errorMap: Record<string, string> = {
                JsonWebTokenError: 'Invalid token.',
                TokenExpiredError: 'Refresh token expired.',
                NotBeforeError: 'Token not active yet.'
            }
            const name = (error as JWTError).name
            const message = errorMap[name] || 'Failed to verify refresh token.'
            throw new InternalServerError(message)
        }
    }

    private flatPermissions(permissions: Permission[]): FlattenedPermissions {
        const result: FlattenedPermissions = {}
        for (const perm of permissions) {
            const { resource, actions } = perm
            if (!result[resource]) {
                result[resource] = []
            }

            if (!result[resource].includes(actions)) {
                result[resource].push(actions)
            }
        }

        return result
    }
}

class PasswordManager {
    static async hashPassword(password: string): Promise<string> {
        const hashOptions = {
            type: argon2.argon2id, // Use Argon2id (recommended)
            memoryCost: ARGON_MEMORY_COST, // 64MB RAM usage
            timeCost: ARGON_TIME_COST, // 3 iterations
            parallelism: ARGON_PARALLELISM // Parallelism factor
        }

        return await argon2.hash(password, hashOptions)
    }

    static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        // Compare password
        return await argon2.verify(hashedPassword, password)
    }
}

const passwordManager = new PasswordManager()
const tokenManager = new TokenManager()

export { passwordManager, tokenManager, AuthUtil }
