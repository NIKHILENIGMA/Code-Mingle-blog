import { ProtectedRequest } from '@/types/app-request'
import { AsyncHandler } from '@/utils/AsyncHandler'
import { NextFunction, Response } from 'express'
import { CollectionData } from './collection.types'
import { User } from '@/Lib/Models/User'
import { ApiResponse } from '@/utils/ApiResponse'
import { ApiError } from '@/utils/ApiError'
import { responseMessage } from '@/constant'
import CollectionService from './collection.service'

// Create a new instance of the collection service
const collectionService = new CollectionService()
// Get the response messages
const { SUCCESS, INTERNAL_SERVICE, UNAUTHORIZED, NOT_FOUND, METHOD_FAILED } = responseMessage

/**
 *! Controller for creating a new collection.
 *
 * @description - This controller handles the creation of a new collection for a user. It extracts the user ID from the request, validates the collection data, and then calls the collection service to create the collection. If successful, it sends a success response back to the client. If there are any errors during the process, it handles them appropriately and sends an error response.
 *
 * @param {ProtectedRequest} req - The request object containing user and collection data.
 * @param {Response} res - The response object used to send the response back to the client.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Promise<void>} A promise that resolves to void.
 *
 * @throws {Error} Will throw an error if there is an issue with creating the collection.
 */

export const createCollection = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction): Promise<void> => {
    // Get the user id from the request
    const userId = (req.user as User)?.id
    if (!userId) {
        return ApiError(new Error(UNAUTHORIZED.message), req, next, UNAUTHORIZED.code)
    }

    // Get the collection details from the request
    const collectionData = req.body as CollectionData

    if (!collectionData.name) {
        return ApiError(new Error(NOT_FOUND('Collection name is required').message), req, next, NOT_FOUND().code)
    }
    // Create the collection
    try {
        const newCollection = await collectionService.createCollectionService(req, next, collectionData, userId)
        if (!newCollection) {
            return ApiError(new Error(METHOD_FAILED('').message), req, next, METHOD_FAILED().code)
        }

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Collection created successfully').message)
    } catch (error) {
        return ApiError(
            error instanceof Error ? error : new Error(INTERNAL_SERVICE('Collection creation failed').message),
            req,
            next,
            INTERNAL_SERVICE().code
        )
    }
})

/**
 *! Controller for adding a post to a collection.
 *
 * @description - This controller handles the addition of a post to a collection for a user. It extracts the user ID from the request, validates the collection ID and post ID, and then calls the collection service to add the post to the collection. If successful, it sends a success response back to the client. If there are any errors during the process, it handles them appropriately and sends an error response.
 *
 * @param {ProtectedRequest} req - The request object containing the user ID, collection ID, and post ID.
 * @param {Response} res - The response object used to send the response back to the client.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Promise<void>} A promise that resolves to void.
 *
 * @throws {Error} Will throw an error if there is an issue with adding the post to the collection.
 */
export const addPostToCollection = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction): Promise<void> => {
    // Get the user id from the request
    const userId = (req.user as User)?.id
    if (!userId) {
        return ApiError(new Error(UNAUTHORIZED.message), req, next, UNAUTHORIZED.code)
    }

    // Get the collection id and post id from the request
    const collectionId = req.params.collectionId
    const postId = req.params.postId

    try {
        const post = await collectionService.addPostToCollectionService(req, next, userId, collectionId, postId)
        if (!post) {
            return ApiError(new Error(METHOD_FAILED('Failed to add post to collection').message), req, next, METHOD_FAILED().code)
        }

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Post added to collection successfully').message)
    } catch (error) {
        return ApiError(
            error instanceof Error ? error : new Error(INTERNAL_SERVICE('Adding post to collection failed').message),
            req,
            next,
            INTERNAL_SERVICE().code
        )
    }
})

/**
 *! Controller for removing a post from a collection.
 *
 * @description - This controller handles the removal of a post from a collection for a user. It extracts the user ID from the request, validates the collection ID and post ID, and then calls the collection service to remove the post from the collection. If successful, it sends a success response back to the client. If there are any errors during the process, it handles them appropriately and sends an error response.
 *
 * @param {ProtectedRequest} req - The request object containing the user ID, collection ID, and post ID.
 * @param {Response} res - The response object used to send the response back to the client.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Promise<void>} A promise that resolves to void.
 *
 * @throws {Error} Will throw an error if there is an issue with removing the post from the collection.
 */
export const removePostFromCollection = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction): Promise<void> => {
    // Get the user id from the request
    const userId = (req.user as User)?.id
    if (!userId) {
        return ApiError(new Error(UNAUTHORIZED.message), req, next, UNAUTHORIZED.code)
    }

    // Get the collection id and post id from the request
    const collectionId = req.params.collectionId
    const postId = req.params.postId

    try {
        await collectionService.removePostFromCollectionService(req, next, userId, collectionId, postId)

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Post removed from collection successfully').message)
    } catch (error) {
        return ApiError(
            error instanceof Error ? error : new Error(INTERNAL_SERVICE('Removing post from collection failed').message),
            req,
            next,
            INTERNAL_SERVICE().code
        )
    }
})

/**
 * ! Controller for removing a collection.
 *
 * @description - This controller handles the removal of a collection for a user. It extracts the user ID from the request, validates the collection ID, and then calls the collection service to remove the collection. If successful, it sends a success response back to the client. If there are any errors during the process, it handles them appropriately and sends an error response.
 *
 * @param {ProtectedRequest} req - The request object containing the user ID and collection ID.
 * @param {Response} res - The response object used to send the response back to the client.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Promise<void>} A promise that resolves to void.
 *
 * @throws {Error} Will throw an error if there is an issue with removing the collection.
 */
export const removeCollection = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction): Promise<void> => {
    const userId = (req.user as User)?.id
    if (!userId) {
        return ApiError(new Error(UNAUTHORIZED.message), req, next, UNAUTHORIZED.code)
    }

    const collectionId = req.params.collectionId
    try {
        await collectionService.removeCollectionService(req, next, userId, collectionId)

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Collection removed successfully').message)
    } catch (error) {
        return ApiError(
            error instanceof Error ? error : new Error(INTERNAL_SERVICE('Removing collection failed').message),
            req,
            next,
            INTERNAL_SERVICE().code
        )
    }
})
/**
 *! Controller to get a single user collection.
 *
 * @description - This controller handles the fetching of a single collection for a user. It extracts the user ID from the request, calls the collection service to get the specific collection, and then sends the collection back to the client. If there are any errors during the process, it handles them appropriately and sends an error response.
 *
 * @param {ProtectedRequest} req - The request object containing the user ID.
 * @param {Response} res - The response object used to send the response back to the client.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Promise<void>} A promise that resolves to void.
 *
 * @throws {Error} Will throw an error if there is an issue with fetching the collection.
 */

export const getUserCollection = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction): Promise<void> => {
    // Get the user id from the request
    const userId = (req.user as User)?.id
    if (!userId) {
        return ApiError(new Error(UNAUTHORIZED.message), req, next, UNAUTHORIZED.code)
    }

    // Get the collection id from the request
    const collectionId: string = req.params.collectionId

    // Get the collection
    try {
        const collection = await collectionService.getUserCollectionService(req, next, userId, collectionId)
        if (!collection) {
            return ApiError(new Error(METHOD_FAILED('').message), req, next, METHOD_FAILED().code)
        }

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Collections fetched successfully').message, { collection })
    } catch (error) {
        return ApiError(
            error instanceof Error ? error : new Error(INTERNAL_SERVICE('Fetching collections failed').message),
            req,
            next,
            INTERNAL_SERVICE().code
        )
    }
})

/**
 * ! Controller to get a post from a collection.
 * 
 * @description - This controller handles the fetching of a post from a collection for a user. It extracts the user ID from the request, calls the collection service to get the post from the collection, and then sends the post back to the client. If there are any errors during the process, it handles them appropriately and sends an error response.
 * 
 * @param {ProtectedRequest} req - The request object containing the user ID.
 * @param {Response} res - The response object used to send the response back to the client.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Promise<void>} A promise that resolves to void.
 * 
 * @throws {Error} Will throw an error if there is an issue with fetching the post.
 */
export const getPostFromCollection = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction): Promise<void> => {
    // Get the user id from the request
    const userId: string = (req.user as User)?.id
    if (!userId) {
        return ApiError(new Error(UNAUTHORIZED.message), req, next, UNAUTHORIZED.code)
    }

    // Get the collection and post id from the request
    const collectionId: string = req.params.collectionId
    const postId: string = req.params.postId
    try {
        const savedPost = await collectionService.getPostFromCollectionService(req, next, userId, collectionId, postId)
        if (!savedPost) {
            return ApiError(new Error(METHOD_FAILED('').message), req, next, METHOD_FAILED().code)
        }

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Post fetched successfully').message, { savedPost })
    } catch (error) {
        return ApiError(
            error instanceof Error ? error : new Error(INTERNAL_SERVICE('Fetching collections failed').message),
            req,
            next,
            INTERNAL_SERVICE().code
        )
    }
})

/**
 * ! Controller to get a list of posts in a collection.
 * 
 * @description - This controller handles the fetching of a list of posts in a collection for a user. It extracts the user ID from the request, calls the collection service to get the list of posts in the collection, and then sends the posts back to the client. If there are any errors during the process, it handles them appropriately and sends an error response.
 * 
 * @param {ProtectedRequest} req - The request object containing the user ID.
 * @param {Response} res - The response object used to send the response back to the client.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Promise<void>} A promise that resolves to void.
 * 
 * @throws {Error} Will throw an error if there is an issue with fetching the posts.
 */
export const listPostsInCollection = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction): Promise<void> => {
    // Get the user id from the request
    const userId: string = (req.user as User)?.id
    if (!userId) {
        return ApiError(new Error(UNAUTHORIZED.message), req, next, UNAUTHORIZED.code)
    }

    // Get the collection id from the request
    const collectionId: string = req.params.collectionId
    try {
        const savedPosts = await collectionService.listPostsInCollectionService(req, next, userId, collectionId)
        if (!savedPosts) {
            return ApiError(new Error(METHOD_FAILED('').message), req, next, METHOD_FAILED().code)
        }

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Posts fetched successfully').message, { savedPosts })
    } catch (error) {
        return ApiError(
            error instanceof Error ? error : new Error(INTERNAL_SERVICE('Fetching collections failed').message),
            req,
            next,
            INTERNAL_SERVICE().code
        )
    }
})

/**
 * ! Controller to get a list of collections.
 * 
 * @description - This controller handles the fetching of a list of collections for a user. It extracts the user ID from the request, calls the collection service to get the list of collections, and then sends the collections back to the client. If there are any errors during the process, it handles them appropriately and sends an error response.
 * 
 * @param {ProtectedRequest} req - The request object containing the user ID.
 * @param {Response} res - The response object used to send the response back to the client.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Promise<void>} A promise that resolves to void.
 * 
 * @throws {Error} Will throw an error if there is an issue with fetching the collections.
 */
export const listCollection = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction): Promise<void> => {
    // Get the user id from the request
    const userId = (req.user as User)?.id
    if (!userId) {
        return ApiError(new Error(UNAUTHORIZED.message), req, next, UNAUTHORIZED.code)
    }

    // Get the collections
    try {
        const collections = await collectionService.listCollectionService(req, next, userId)
        if (!collections) {
            return ApiError(new Error(METHOD_FAILED('').message), req, next, METHOD_FAILED().code)
        }

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Collections fetched successfully').message, { collections })
    } catch (error) {
        return ApiError(
            error instanceof Error ? error : new Error(INTERNAL_SERVICE('Fetching collections failed').message),
            req,
            next,
            INTERNAL_SERVICE().code
        )
    }
})
