import { readFile } from 'node:fs'
import { ApiError } from '../utils/ApiError'
import jwt from 'jsonwebtoken'
import { promisify } from 'node:util'
import path from 'node:path'
import { ProtectedRequest } from '../types/app-request'

export type JWTPayload = {
    issuer: string
    audience: string
    subject: string
    param: string
    iat: number
    exp: number
}

export type Payload = {
    issuer: string
    audience: string
    subject: string
    param: string
    validity: number
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
const readFileAsync = promisify(readFile)

export async function readFileKey(keyName: string): Promise<string> {
    try {
        let filePath: string
        if (keyName === 'private') {
            filePath = path.join(__dirname, '../../keys/private_key.pem')
        } else if (keyName === 'public') {
            filePath = path.join(__dirname, '../../keys/public_key.pem')
        } else {
            throw new ApiError(400, 'Invalid keyName provided')
        }
        return await readFileAsync(filePath, 'utf-8')
    } catch (error) {
        throw new ApiError(404, `Error reading key file: ${(error as Error)?.message}`)
    }
}

// Server\keys\private_key.pem
//C:\Users\Mesh\Desktop\Software Development\Web Development\Project\Full stack projects\CodeMingle\Server\keys\public_key.pem
// C:\\Users\\Mesh\\Desktop\\Software Development\\Web Development\\Project\\Full stack projects\\keys\\private_key.pem'

/**
 * The `encode` function asynchronously encodes a JWT payload using a private key read from a file and
 * returns the generated token.
 * @param {JWTPayload} payload - The `payload` parameter in the `encode` function is of type
 * `JWTPayload`. It is the data that you want to encode into a JSON Web Token (JWT). This data
 * typically includes information about the user or entity for whom the token is being generated.
 * @returns The `encode` function returns a Promise that resolves to a string, which is the encoded JWT
 * token generated using the `jwt.sign` method with the RS256 algorithm.
 */
export const encode = async (payload: Payload): Promise<string> => {
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


export const checkAccessToken = (req: ProtectedRequest): string | null => {
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.split(' ')[1];
    }
    return null;
}

