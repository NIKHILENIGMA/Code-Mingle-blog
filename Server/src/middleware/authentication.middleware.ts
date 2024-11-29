import { Response, NextFunction } from 'express'
import { decode } from '../helpers/JWT'
import { RepositoryFactory } from '../Lib/Repositories'
import { ProtectedRequest } from '../types/app-request'
import { ApiError } from '../utils/ApiError'
import { AsyncHandler } from '../utils/AsyncHandler'
import responseMessage from '../constant/responseMessage'

const userRepository = RepositoryFactory.UserRepository()
const keyStoreRepository = RepositoryFactory.KeyStoreRepository()

/**
 * Middleware to check if the user is authenticated.
 *
 * This middleware function checks for the presence of an access token in the request headers,
 * decodes the token, and verifies the user's existence in the database. If the user is authenticated,
 * the user object is attached to the request object and the next middleware function is called.
 * If authentication fails at any step, an ApiError with a 401 status code is thrown.
 *
 * @param {Request} req - The request object.
 * @param {Response} _ - The response object (not used).
 * @param {NextFunction} next - The next middleware function.
 *
 * @throws {ApiError} If the access token is missing, invalid, or the user does not exist.
 */

export const isAuthenticated = AsyncHandler(async (req: ProtectedRequest, _: Response, next: NextFunction) => {
    try {
        const cookies = req.cookies as Record<string, string>

        const accessToken = cookies['access_token']

        if (!accessToken) {
            return ApiError(new Error(responseMessage.NOT_FOUND('access token')), req, next, 404)
        }

        // Decode the token
        const decodedToken = await decode(req, next, accessToken)

        if (!decodedToken) {
            return ApiError(new Error(responseMessage.INVALID_TOKEN), req, next, 500)
        }

        // Find user by id
        const user = await userRepository.findUserById(decodedToken?.subject)

        if (!user) {
            return ApiError(new Error(responseMessage.NOT_FOUND('User')), req, next, 401)
        }

        // Attach user to request object
        req.user = user

        // Find key store by user id
        const keyStore = await keyStoreRepository.findKeyStoreByUserId(user.id)

        if (!keyStore) {
            return ApiError(new Error('Unauthorized, keystore not found'), req, next, 401)
        }

        if (keyStore.accessKey !== decodedToken?.param) {
            return ApiError(new Error('Unauthorized, user not found'), req, next, 401)
        }

        // Attach key store to request object
        req.keyStore = keyStore

        next()
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(responseMessage.INTERNAL_SERVICE('Authentication')), req, next, 500)
    }
})
