import { readFile } from 'node:fs'
import ApiError from '../utils/ApiError'
import jwt from 'jsonwebtoken'
import { promisify } from 'node:util'

export class JWTPayload {
    aud: string
    sub: string
    iss: string
    iat: number
    exp: number
    prm: number | string

    constructor(issuer: string, audience: string, subject: string, param: string, validity: number) {
        this.iss = issuer
        this.aud = audience
        this.sub = subject
        this.iat = Math.floor(Date.now() / 1000)
        this.exp = this.iat + validity
        this.prm = param
    }
}

/**
 ** The function `readFileKey` reads a private or public key file based on the provided key name and returns the content as a string.
 * @param {string} keyName - The `keyName` parameter is a string that specifies whether to read a
 * private key or a public key. It can have the values `'private'` or `'public'`.
 * @returns The `readFileKey` function returns a Promise that resolves to a string. The function reads
 * a key file based on the `keyName` parameter provided. If `keyName` is 'private', it reads the
 * private.pem file and returns its content as a string. If `keyName` is 'public', it reads the
 * public.pem file and returns its content as a string. If the
 */
async function readFileKey(keyName: string): Promise<string> {
    try {
        if (keyName === 'private') {
            return await promisify(readFile)('../../keys/private.pem', 'utf8')
        } else if (keyName === 'public') {
            return await promisify(readFile)('../../keys/public.pem', 'utf8')
        } else {
            throw new ApiError(400, 'Invalid keyName provided')
        }
    } catch (error) {
        throw new ApiError(404, `Error reading key file: ${(error as Error).message}`)
    }
}



/**
 * The `encode` function asynchronously encodes a JWT payload using a private key read from a file and
 * returns the generated token.
 * @param {JWTPayload} payload - The `payload` parameter in the `encode` function is of type
 * `JWTPayload`. It is the data that you want to encode into a JSON Web Token (JWT). This data
 * typically includes information about the user or entity for whom the token is being generated.
 * @returns The `encode` function returns a Promise that resolves to a string, which is the encoded JWT
 * token generated using the `jwt.sign` method with the RS256 algorithm.
 */
export const encode = async (payload: JWTPayload): Promise<string> => {
    try {
        const secret = await readFileKey('private')

        if (!secret) {
            throw new ApiError(500, 'Error reading private key file')
        }

        const token = jwt.sign(payload, secret, { algorithm: 'RS256' })
        return token
        
    } catch (error) {
        throw new ApiError(500, `Error encoding JWT: ${(error as Error).message}`)
    }
}

/**
 * The `decode` function asynchronously decodes a JWT token using a public key read from a file and
 * returns the decoded payload.
 * @param {string} token - The `token` parameter in the `decode` function is a string that represents
 * the JWT token that you want to decode.
 * @returns The `decode` function returns a Promise that resolves to a `JWTPayload` object. The function
 * decodes the JWT token using the `jwt.verify` method with the RS256 algorithm and returns the decoded
 * payload.
 */

export const decode = async (token: string): Promise<JWTPayload> => {
    try {
        const publicKey = await readFileKey('public')
        const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] }) as JWTPayload
        return decoded
    } catch (error) {
        throw new ApiError(401, `Error decoding JWT: ${(error as Error).message}`)
    }
}
