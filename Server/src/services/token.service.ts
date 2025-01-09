import crypto from 'crypto'
import { Request, NextFunction } from 'express'
import { tokenInfo } from '../config/config'
import { decode, encode } from '../helpers/JWT'
import { RepositoryFactory } from '../Lib/Repositories'
import { ApiError } from '../utils/ApiError'
import { TokenKeys, Tokens } from '../Lib/Models/KeyStore'
import { IKeyStoreRepository } from '../Lib/Repositories/Interfaces/IKeyStore'
import { IResetPasswordRepository } from '../Lib/Repositories/Interfaces/IResetPasswordRepository'
import responseMessage from '../constant/responseMessage'

const { INVALID_TOKEN, TOKEN_EXPIRED, METHOD_FAILED, NOT_FOUND } = responseMessage

export default class TokenServices {
    private keyStoreRepository: IKeyStoreRepository
    private resetPasswordRepository: IResetPasswordRepository

    constructor() {
        this.keyStoreRepository = RepositoryFactory.KeyStoreRepository()
        this.resetPasswordRepository = RepositoryFactory.ResetPasswordRepository()
    }

    /**
     * Generates access and refresh tokens for a given user.
     *
     * @param {string} userId - The ID of the user for whom the tokens are being generated.
     * @returns {Promise<Tokens>} A promise that resolves to an object containing the access and refresh tokens.
     * @throws {ApiError} Throws an error if the key store creation or token generation fails.
     */

    public async generateAccessAndRefreshTokenService(req: Request, next: NextFunction, userId: string): Promise<Tokens | void> {
        try {
            // Generate secret keys
            const { accessKey, refreshKey } = this.generateKeySecret()

            // Create key store
            await this.createStore(req, next, userId, accessKey, refreshKey)

            // Generate access token
            const accessToken = await this.generatePayloadTokenService(req, next, userId, accessKey, tokenInfo?.access_validity || '0')

            if (!accessToken) {
                return ApiError(new Error(METHOD_FAILED('access generate token').message), req, next, METHOD_FAILED().code)
            }

            // Generate refresh token
            const refreshToken = await this.generatePayloadTokenService(req, next, userId, refreshKey, tokenInfo?.refresh_validity || '0')

            if (!refreshToken) {
                return ApiError(new Error(METHOD_FAILED('refresh generate token').message), req, next, METHOD_FAILED().code)
            }

            return { accessToken, refreshToken }
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('generate token').message), req, next, METHOD_FAILED().code)
        }
    }

    /**
     * Generates a reset token for the given user ID.
     *
     * This function creates a random token, hashes it, and stores the hashed token along with the user ID and an expiry time in the reset password repository.
     * The original token is returned for further use (e.g., sending to the user via email).
     *
     * @param {string} userId - The ID of the user for whom the reset token is being generated.
     * @returns {Promise<string>} - A promise that resolves to the original reset token.
     * @throws {ApiError} - Throws an error if there is an issue generating the reset token.
     */
    public async generateResetToken(req: Request, next: NextFunction, userId: string): Promise<string | void> {
        try {
            // create random and hash token
            const restToken = crypto.randomBytes(20).toString('hex')
            const hashToken = crypto.createHash('sha256').update(restToken).digest('hex')
            const expiryTime = new Date(Date.now() + 10 * 60 * 1000).toISOString()

            const reset = {
                userId,
                resetToken: hashToken,
                expiresAt: expiryTime
            }

            await this.resetPasswordRepository.create(reset)

            return restToken
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('generate reset token').message), req, next, METHOD_FAILED().code)
        }
    }

    /**
     * Verifies the provided refresh token.
     *
     * @param token - The refresh token to verify.
     * @returns A promise that resolves to the user ID associated with the refresh token.
     * @throws {ApiError} If the refresh token is not associated with any user, if the user does not have any refresh token key, if the refresh token is invalid, or if there is an error during verification.
     */

    public async removeRefreshToken(req: Request, next: NextFunction, userId: string, token: string): Promise<void> {
        try {
            const decodedToken = await decode(req, next, token)

            if (!decodedToken) {
                return ApiError(new Error(INVALID_TOKEN.message), req, next, 400)
            }

            const keyStore = await this.keyStoreRepository.findKeyStoreByUserId(userId)

            if (!keyStore) {
                return ApiError(new Error(NOT_FOUND('key store').message), req, next, NOT_FOUND().code)
            }

            if (keyStore.refreshKey !== decodedToken.param) {
                return ApiError(new Error(INVALID_TOKEN.message), req, next, INVALID_TOKEN.code)
            }

            await this.keyStoreRepository.delete({ id: keyStore.id })
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('verify refresh token').message), req, next, METHOD_FAILED().code)
        }
    }

    public async refreshTokenService(req: Request, next: NextFunction, token: string): Promise<Tokens | void> {
        try {
            const decodedToken = await decode(req, next, token)

            if (!decodedToken) {
                return ApiError(new Error(INVALID_TOKEN.message), req, next, INVALID_TOKEN.code)
            }

            const keyStore = await this.keyStoreRepository.findKeyStoreByUserId(decodedToken.subject)

            if (!keyStore) {
                return ApiError(new Error(NOT_FOUND('key store').message), req, next, NOT_FOUND().code)
            }

            if (keyStore.refreshKey !== decodedToken.param) {
                return ApiError(new Error(INVALID_TOKEN.message), req, next, INVALID_TOKEN.code)
            }

            // Generate access and refresh token
            const tokens = await this.generateAccessAndRefreshTokenService(req, next, decodedToken.subject)

            if (!tokens) {
                return ApiError(new Error(METHOD_FAILED('generate token').message), req, next, METHOD_FAILED().code)
            }

            return tokens
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('refresh token').message), req, next, METHOD_FAILED().code)
        }
    }

    /**
     * Verifies the provided reset token.
     *
     * This method hashes the provided token and searches for it in the database.
     * If the token is found, it checks if the token has expired.
     * If the token is valid and not expired, it returns the associated user ID.
     *
     * @param {string} token - The reset token to verify.
     * @returns {Promise<string>} - A promise that resolves to the user ID associated with the reset token.
     * @throws {ApiError} - Throws an error if the token does not exist, has expired, or if there is an error during verification.
     */
    public async verifyResetTokenService(req: Request, next: NextFunction, token: string): Promise<string | void> {
        try {
            const hashToken = crypto.createHash('sha256').update(token).digest('hex')

            // Find token in database
            const resetToken = await this.resetPasswordRepository.findByToken(hashToken)

            if (!resetToken) {
                return ApiError(new Error(INVALID_TOKEN.message), req, next, INVALID_TOKEN.code)
            }

            // Check if token has expired
            if (this.timeExpired(resetToken.expiresAt)) {
                return ApiError(new Error(TOKEN_EXPIRED.message), req, next, INVALID_TOKEN.code)
            }

            return resetToken.userId
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('verify reset token').message), req, next, METHOD_FAILED().code)
        }
    }

    /**
     * Generates a pair of cryptographic keys for access and refresh tokens.
     *
     * @returns {TokenKeys} An object containing the generated access and refresh keys.
     */
    private generateKeySecret(): TokenKeys {
        const accessKey = crypto.randomBytes(32).toString('hex')
        const refreshKey = crypto.randomBytes(32).toString('hex')

        return { accessKey, refreshKey }
    }

    /**
     * Creates a key store for a user with the provided access and refresh keys.
     *
     * @param userId - The ID of the user for whom the key store is being created.
     * @param accessKey - The access key to be stored.
     * @param refreshKey - The refresh key to be stored.
     * @returns A promise that resolves to void when the key store is successfully created.
     * @throws {ApiError} Throws an error if the key store creation fails.
     */
    private async createStore(req: Request, next: NextFunction, userId: string, accessKey: string, refreshKey: string): Promise<void> {
        try {
            const keystoreData = {
                userId,
                accessKey,
                refreshKey
            }

            const keyStore = await this.keyStoreRepository.findKeyStoreByUserId(userId)

            if (!keyStore) {
                // Create key store using UserTokenKeys
                await this.keyStoreRepository.create(keystoreData)
            } else {
                // Update key store using UserTokenKeys
                await this.keyStoreRepository.update({id: keyStore.id}, keystoreData)
            }
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('create key store').message), req, next, METHOD_FAILED().code)
        }
    }

    /**
     * Generates a token with the given payload information.
     *
     * @param id - The unique identifier for the subject of the token.
     * @param name - The name associated with the token.
     * @param key - A key parameter to include in the token payload.
     * @param expiry - The expiry time for the token in seconds.
     * @returns A promise that resolves to the generated token string.
     * @throws {ApiError} If there is an error generating the token or encoding the payload.
     */
    private async generatePayloadTokenService(req: Request, next: NextFunction, id: string, key: string, expiry: string): Promise<string | void> {
        try {
            const tokenPayload = {
                issuer: tokenInfo.token_issuer || '',
                audience: tokenInfo.token_audience || '',
                subject: id.toString(),
                param: key.toString() || '',
                validity: parseInt(expiry)
            }

            return await encode(req, next, tokenPayload)
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('generate token').message), req, next, METHOD_FAILED().code)
        }
    }

    /**
     * Checks if the given expiry time has already passed.
     *
     * @param {string} expiry - The expiry time as a string.
     * @returns {boolean} - Returns `true` if the expiry time has passed, otherwise `false`.
     */
    private timeExpired(expiry: string): boolean {
        const expiryTime = new Date(expiry).getTime()
        const currentTime = new Date().getTime()

        return expiryTime < currentTime
    }
}
