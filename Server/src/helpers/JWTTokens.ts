import { tokenInfo } from '../config/config'
import { Tokens } from '../Lib/Models/Tokens'
import { User } from '../Lib/Models/User'
import ApiError from '../utils/ApiError'
import { encode, JWTPayload } from './JWT'

export const createTokens = async (user: User, keys: { accessTokenKey: string; refreshTokenKey: string }): Promise<Tokens> => {
    const accessToken = await encode(
        new JWTPayload(
            tokenInfo.token_issuer || '',
            tokenInfo.token_audience || '',
            user.id.toString(),
            keys.accessTokenKey,
            parseInt(tokenInfo.access_validity || '0')
        )
    )

    if (!accessToken) {
        throw new ApiError(403, 'Error generating access token')
    }

    const refreshToken = await encode(
        new JWTPayload(
            tokenInfo.token_issuer || '',
            tokenInfo.token_audience || '',
            user.id.toString(),
            keys.refreshTokenKey,
            parseInt(tokenInfo.refresh_validity || '0')
        )
    )

    if (!refreshToken) {
        throw new ApiError(403, 'Error generating refresh token')
    }

    return { accessToken, refreshToken }
}
