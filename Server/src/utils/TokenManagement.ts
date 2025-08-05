import fs from 'fs/promises'
import jwt, { Algorithm, JsonWebTokenError, SignOptions, TokenExpiredError } from 'jsonwebtoken'
import { InternalServerError, UnauthorizedError } from './Errors'
import {
    ACCESS_TOKEN_VALIDITY_IN_SEC,
    JWT_ALGORITHM,
    JWT_AUDIENCE,
    JWT_ISSUER,
    PRIVATE_KEY_PATH,
    PUBLIC_KEY_PATH,
    REFRESH_TOKEN_VALIDITY_IN_SEC
} from '@/config/app.config'

import { Permission } from '@/features/users/authentication/auth.types'

import { User } from '@prisma/client'
import { flatPermissions, FlattenedPermissions } from './FlatPermission'
import { Request } from 'express'

interface AccessTokenPayload {
    sub: string // Subject of the token, typically user ID
    email: string // User's email address
    username: string // User's username
    roleId: string // ID of the user's role
    permissions?: FlattenedPermissions | null // Flattened permissions for the user
}

interface RefreshTokenPayload {
    sub: string
    email: string
}

type JWTError = JsonWebTokenError | TokenExpiredError

/**
 * Singleton class for managing JWT tokens including generation, verification, and extraction.
 * Handles both access and refresh tokens with RSA key-based signing and verification.
 *
 * @example
 * ```typescript
 * const tokenManager = TokenManagement.getInstance();
 * const tokens = await tokenManager.getTokens(user, permissions);
 * const payload = await tokenManager.verifyToken(tokens.accessToken);
 * ```
 */
class TokenManagement {
    private static instance: TokenManagement
    private static publicKey: string | null = null // cached public key
    private static privateKey: string | null = null // cached private key

    private constructor() {}

    public static getInstance(): TokenManagement {
        if (!TokenManagement.instance) {
            TokenManagement.instance = new TokenManagement()
        }
        return TokenManagement.instance
    }

    // Read private and public keys from files
    private async getPrivateKey(): Promise<string> {
        if (!TokenManagement.privateKey) {
            TokenManagement.privateKey = await fs.readFile(PRIVATE_KEY_PATH, 'utf8')
        }
        return TokenManagement.privateKey
    }

    /**
     * Retrieves the public key for token validation.
     *
     * This method implements a lazy loading pattern where the public key is read from
     * the file system only once and cached for subsequent calls. If the public key
     * has already been loaded, it returns the cached value immediately.
     *
     * @returns A promise that resolves to the public key as a UTF-8 string
     * @throws {Error} If the public key file cannot be read or does not exist
     * @private
     */
    private async getPublicKey(): Promise<string> {
        if (!TokenManagement.publicKey) {
            TokenManagement.publicKey = await fs.readFile(PUBLIC_KEY_PATH, 'utf8')
        }
        return TokenManagement.publicKey
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
            permissions: flatPermissions(permissions)
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

    /**
     * Extracts the access token from the incoming HTTP request.
     *
     * This method attempts to retrieve the authentication token from two sources:
     * 1. Authorization header with Bearer token format
     * 2. HTTP cookies with 'access_token' key
     *
     * The method first checks for a Bearer token in the Authorization header.
     * If not found, it falls back to checking the cookies for an access_token.
     *
     * @param req - The Express request object containing headers and cookies
     * @returns The extracted access token string
     * @throws {UnauthorizedError} When no valid token is found in either headers or cookies
     *
     * @example
     * ```typescript
     * // With Authorization header
     * const token = tokenManager.extractToken(req); // Returns "eyJhbGciOiJIUzI1NiIs..."
     *
     * // With cookie fallback
     * const token = tokenManager.extractToken(req); // Returns token from cookies
     * ```
     */
    public extractToken(req: Request): string {
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
                throw new UnauthorizedError('Access token not found in request headers or cookies')
            }
        }

        return token
    }
}

const tokenManagement = TokenManagement.getInstance()

export default tokenManagement
