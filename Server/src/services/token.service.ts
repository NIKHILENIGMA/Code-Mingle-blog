import crypto from 'crypto'
import { tokenInfo } from '../config/config'
import { encode } from '../helpers/JWT'
import { RepositoryFactory } from '../Lib/Repositories'
import { ApiError } from '../utils/ApiError'
import { TokenKeys, Tokens } from '../Lib/Models/KeyStore'
import { IKeyStoreRepository } from '../Lib/Repositories/Interfaces/IKeyStore'
import { IResetPasswordRepository } from '../Lib/Repositories/Interfaces/IResetPasswordRepository'

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

    public async generateTokens(userId: string): Promise<Tokens> {
        try {
            // Generate secret keys
            const { accessKey, refreshKey } = this.generateKeySecret()

            // Create key store
            await this.createStore(userId, accessKey, refreshKey)

            // Generate access token
            const accessToken = await this.generatePayloadToken(userId, 'access', accessKey, tokenInfo?.access_validity || '0')

            // Generate refresh token
            const refreshToken = await this.generatePayloadToken(userId, 'refresh', refreshKey, tokenInfo?.refresh_validity || '0')

            return { accessToken, refreshToken }
        } catch (error) {
            throw new ApiError(500, `Error generating tokens: ${(error as Error).message}`)
        }
    }

    public async removeTokenById(storeId: number): Promise<void> {
        try {
            await this.keyStoreRepository.delete(storeId)
        } catch (error) {
            throw new ApiError(500, `Error removing tokens: ${(error as Error).message}`)
        }
    }

    public async generateResetToken(userId: string): Promise<string> {
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
            throw new ApiError(500, `Error generating reset token: ${(error as Error).message}`)
        }
    }

    public async verifyResetToken(token: string): Promise<string> {
        try {
            const hashToken = crypto.createHash('sha256').update(token).digest('hex')

            // Find token in database
            const resetToken = await this.resetPasswordRepository.findByToken(hashToken)
            
            if (!resetToken) {
                throw new ApiError(404, 'Reset token does not exist')
            }

            // Check if token has expired
            if (this.timeExpired(resetToken.expiresAt)) {
                throw new ApiError(400, 'Reset token has expired')
            }

            return resetToken.userId

        } catch (error) {
            throw new ApiError(500, `Error verifying reset token: ${(error as Error).message}`)
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
    private async createStore(userId: string, accessKey: string, refreshKey: string): Promise<void> {
        try {
            const keystoreData = {
                userId,
                accessKey,
                refreshKey
            }

            // Create key store using UserTokenKeys
            const createdStore = await this.keyStoreRepository.create(keystoreData)

            if (!createdStore) {
                throw new ApiError(500, 'Error creating key store')
            }
            
        } catch (error) {
            throw new ApiError(500, (error as Error).message)
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
    private async generatePayloadToken(id: string, name: string, key: string, expiry: string): Promise<string> {
        try {
            const tokenPayload = {
                issuer: tokenInfo.token_issuer || '',
                audience: tokenInfo.token_audience || '',
                subject: id.toString(),
                param: key.toString() || '',
                validity: parseInt(expiry)
            }

            const token = await encode(tokenPayload)

            if (!token) {
                throw new ApiError(403, `Error generating ${name} token`)
            }

            return token
        } catch (error) {
            throw new ApiError(500, (error as Error).message)
        }
    }

    private timeExpired(expiry: string): boolean {
        const expiryTime = new Date(expiry).getTime()
        const currentTime = new Date().getTime()

        return expiryTime < currentTime
    }
}
