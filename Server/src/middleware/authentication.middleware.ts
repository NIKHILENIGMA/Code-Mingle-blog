import { Response, NextFunction } from 'express';
import { decode } from '../helpers/JWT';
import { RepositoryFactory } from '../Lib/Repositories';
import { ProtectedRequest } from '../types/app-request';
import { ApiError } from '../utils/ApiError'; 
import { AsyncHandler } from '../utils/AsyncHandler';

const userRepository = RepositoryFactory.UserRepository();
const keyStoreRepository = RepositoryFactory.KeyStoreRepository();

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
        const accessToken = (req.cookies as Record<string, string>)?.access_token;

        if (!accessToken) {
            throw new ApiError(401, 'Unauthorized, access token not found in cookies');
        }

        // Decode the token
        const decodedToken = await decode(accessToken);

        if (!decodedToken) {
            throw new ApiError(401, 'Unauthorized');
        }

        // Find user by id
        const user = await userRepository.findUserById(decodedToken?.subject);

        if (!user) {
            throw new ApiError(401, 'Unauthorized, user not found by access token');
        }

        // Attach user to request object
        req.user = user;

        // Find key store by user id
        const keyStore = await keyStoreRepository.findByUserId(user.id);

        if (!keyStore) {
            throw new ApiError(401, 'Unauthorized, key store not found');
        }

        if (keyStore.accessKey !== decodedToken?.param){
            throw new ApiError(401, 'Unauthorized, access key mismatch');
        }

        // Attach key store to request object
        req.keyStore = keyStore;

        next();
    } catch (error) {
        throw new ApiError(401, `Error message: authentication failure ${(error as Error)?.message}`);
    }
});
