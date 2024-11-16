import { Request, Response, NextFunction } from 'express'
import { User } from '../Lib/Models/User'
import { ApiError } from '../utils/ApiError'
import { decode } from '../helpers/JWT'
import { RepositoryFactory } from '../Lib/Repositories'

interface AuthRequest extends Request {
    user?: User
}

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

export const isAuthenticated = async (req: Request, _: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization?.split(' ')[1]

        if (!accessToken) {
            throw new ApiError(401, 'Unauthorized')
        }

        const decodeToken = await decode(accessToken)

        if (!decodeToken) {
            throw new ApiError(401, 'Unauthorized')
        }

        const user = await RepositoryFactory.UserRepository().getById(decodeToken?.subject)

        if (!user) {
            throw new ApiError(401, 'Unauthorized, user not found')
        }

        ;(req as AuthRequest).user = user

        next()
    } catch (error) {
        throw new ApiError(401, `Error message: authentication failure ${(error as Error)?.message}`)
    }
}
