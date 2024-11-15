import crypto from 'crypto'
import { tokenInfo } from '../config/config'
import { encode } from '../helpers/JWT'
import { RepositoryFactory } from '../Lib/Repositories'
import { IKeyStoreRepository } from '../Lib/Repositories/Interfaces/IKeyStore'
import { ApiError } from '../utils/ApiError'
import { TokenKeys, Tokens } from '../Lib/Models/KeyStore'

export default class TokenServices {
    private KeyStoreRepository: IKeyStoreRepository

    constructor() {
        this.KeyStoreRepository = RepositoryFactory.KeyStoreRepository()
    }

    /**
     * The function `generateToken` generates access and refresh tokens for a user and stores the keys
     * in a key store.
     * @param {string} userId - The `userId` parameter in the `generateToken` function is a string that
     * represents the unique identifier of the user for whom the tokens are being generated.
     * @returns The `generateToken` function returns an object with two properties: `accessToken` and
     * `refreshToken`, both of which are generated using the provided `userId` and keys (`accessKey`
     * and `refreshKey`) from the created key store.
     */
    public async generateToken(userId: string): Promise<Tokens> {
        const { accessKey, refreshKey } = this.generateKeySecret()

        const keystoreData = {
            userId,
            accessKey,
            refreshKey
        }

        // Create key store using UserTokenKeys
        const createdStore = await this.KeyStoreRepository.create(keystoreData)

        if (!createdStore) {
            throw new ApiError(500, 'Error creating key store')
        }

        // Generate access token
        const accessTokenPayload = {
            issuer: tokenInfo.token_issuer || '',
            audience: tokenInfo.token_audience || '',
            subject: userId.toString(),
            param: accessKey.toString() || '',
            validity: parseInt(tokenInfo.access_validity || '0')
        }

        const accessToken = await encode(accessTokenPayload)

        if (!accessToken) {
            throw new ApiError(403, 'Error generating access token')
        }

        // Generate refresh token
        const refreshTokenPayload = {
            issuer: tokenInfo.token_issuer || '',
            audience: tokenInfo.token_audience || '',
            subject: userId.toString(),
            param: refreshKey.toString() || '',
            validity: parseInt(tokenInfo.refresh_validity || '0')
        }

        const refreshToken = await encode(refreshTokenPayload)

        if (!refreshToken) {
            throw new ApiError(403, 'Error generating refresh token')
        }

        return { accessToken, refreshToken }
    }

    /**
     * The function generates random secret keys for access token and refresh token using crypto module in TypeScript.
     * @returns The `generateSecretkey` function returns an object with two properties:
     * `accessTokenKey` and `refreshTokenKey`, both of which are randomly generated strings of hexadecimal characters.
     */

    private generateKeySecret(): TokenKeys {
        const accessKey = crypto.randomBytes(32).toString('hex')
        const refreshKey = crypto.randomBytes(32).toString('hex')

        return { accessKey, refreshKey }
    }
}
