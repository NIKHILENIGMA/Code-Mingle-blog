import { ApiError } from '@/utils/ApiError'
import { AsyncHandler } from '@/utils/AsyncHandler'
import { NextFunction, Response } from 'express'
import { responseMessage } from '@/constant'
import { ApiResponse } from '@/utils/ApiResponse'
import { ProtectedRequest } from '@/types/extended/app-request'
import { User } from '@/Lib/Models/User'
import PublishService from './publish.service'
import { PublishPostBody, UpdatePublishedPost, PublishWhere, PublishedWhere, QueryParameter } from './publish.types'
import { ENUMS } from '@/types'

// Create an instance of the PublishService class
const publishService = new PublishService()
// Destructure the responseMessage object
const { INTERNAL_SERVICE, SUCCESS, UNAUTHORIZED, METHOD_FAILED, BAD_REQUEST, NOT_FOUND } = responseMessage

/**
 *! Handles user publishing a post
 *
 * This function is an asynchronous request handler that is responsible for handling a user publishing a post.
 * It expects a request body containing the post content and the user's id from the request object.
 *
 * @param {Request} req - The request object containing the user's id and the post content.
 * @param {Response} res - The response object used to send the response back to the client.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Promise<void>} A promise that resolves to void.
 *
 * @throws {Error} Will throw an error if there is an issue saving the post.
 */
export const publishPost = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    /**
     * Input Field will be:
     * - slug: string
     * - category: string
     * - status: DRAFT_STATUS
     */

    // Get the user id from the request object
    const userId = (req.user as User)?.id
    

    const postId: string = req.params.id
    if (!postId) {
        return ApiError(new Error(NOT_FOUND('Missing post id').message), req, next, NOT_FOUND().code)
    }

    // Get the post content from the request body
    const { slug, categoryId, status, tags } = req.body as PublishPostBody

    // Validate the request body
    if (status !== ENUMS.DRAFT_STATUS.PUBLISHED) {
        return ApiError(new Error(BAD_REQUEST('Invalid status').message), req, next, BAD_REQUEST().code)
    }

    // Create the payload to be saved
    const payload: PublishPostBody = {
        slug,
        categoryId,
        status,
        tags
    }

    // Save the post
    try {
        const publishedPost = await publishService.publishPost(userId, postId, payload)
        if (!publishedPost) {
            return ApiError(new Error(METHOD_FAILED('Failed publishing post').message), req, next, METHOD_FAILED().code)
        }
        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Post published successfully').message)
    } catch (error) {
        const message = error instanceof Error ? error.message : INTERNAL_SERVICE('publish post')?.message

        if (message.includes('not found')) {
            return ApiError(new Error(message), req, next, NOT_FOUND().code)
        } else if (message.includes('permission')) {
            return ApiError(new Error(message), req, next, UNAUTHORIZED.code)
        }

        return ApiError(new Error(message), req, next, INTERNAL_SERVICE().code)
    }
})

/**
 * ! Handles user checking if a slug is available
 *
 * This function is an asynchronous request handler that is responsible for handling a user checking if a slug is available.
 * It expects a request body containing the slug to check.
 *
 * @param {Request} req - The request object containing the slug to check.
 * @param {Response} res - The response object used to send the response back to the client.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Promise<void>} A promise that resolves to void.
 *
 *  @throws {Error} Will throw an error if there is an issue checking the slug.
 */
export const checkIsSlugAvailable = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const { customSlug } = req.body as { customSlug: string }

    if (!customSlug) {
        return ApiError(new Error(BAD_REQUEST('slug needed to check').message), req, next, BAD_REQUEST().code)
    }

    try {
        const isAvailable = await publishService.isSlugAvailable(customSlug)
        if (!isAvailable) {
            return ApiError(new Error(INTERNAL_SERVICE('check slug availability').message), req, next, INTERNAL_SERVICE().code)
        }

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Slug is available').message, { isAvailable })
    } catch (error) {
        return ApiError(
            error instanceof Error ? error : new Error(INTERNAL_SERVICE('check slug availability').message),
            req,
            next,
            INTERNAL_SERVICE().code
        )
    }
})

/**
 * ! Handles user updating a published post
 *
 * This function is an asynchronous request handler that is responsible for handling a user updating a published post.
 * It expects a request body containing the updated post content and the user's id from the request object.
 *
 * @param {Request} req - The request object containing the user's id and the updated post content.
 * @param {Response} res - The response object used to send the response back to the client.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Promise<void>} A promise that resolves to void.
 *
 * @throws {Error} Will throw an error if there is an issue updating the post.
 */
export const updatePublishedPost = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    // Get the user id from the request object
    const userId = (req.user as User)?.id
    if (!userId) {
        return ApiError(new Error(UNAUTHORIZED.message), req, next, UNAUTHORIZED.code)
    }

    // Get the post id from the request params
    const postId: string = req.params.id
    if (!postId) {
        return ApiError(new Error(NOT_FOUND('Missing post id').message), req, next, NOT_FOUND().code)
    }

    // Get the updated post content from the request body
    const updatePublishContent = req.body as UpdatePublishedPost

    try {
        const publishedPost = await publishService.updatePublishedPost(postId, userId, updatePublishContent)
        if (!publishedPost) {
            return ApiError(new Error(METHOD_FAILED('Failed updating published post').message), req, next, METHOD_FAILED().code)
        }
        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Post updated successfully').message)
    } catch (error) {
        return ApiError(
            error instanceof Error ? error : new Error(INTERNAL_SERVICE('update published post').message),
            req,
            next,
            INTERNAL_SERVICE().code
        )
    }
})

/**
 * ! Handles user deleting a published post
 *
 * This function is an asynchronous request handler that is responsible for handling a user deleting a published post.
 * It expects the user's id from the request object and the post id from the request params.
 *
 * @param {Request} req - The request object containing the user's id and the post id.
 * @param {Response} res - The response object used to send the response back to the client.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Promise<void>} A promise that resolves to void.
 *
 * @throws {Error} Will throw an error if there is an issue deleting the post.
 */
export const deletePublishedPost = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    // Get the user id from the request object
    const userId = (req.user as User)?.id
    if (!userId) {
        return ApiError(new Error(UNAUTHORIZED.message), req, next, UNAUTHORIZED.code)
    }

    // Get the post id from the request params
    const postId = req.params.id

    const where: PublishWhere = {
        id: postId,
        authorId: userId
    }
    try {
        const deletedPost = await publishService.deletePublishedPost(req, next, where)
        if (!deletedPost) {
            return ApiError(new Error(METHOD_FAILED('Failed deleting published post').message), req, next, METHOD_FAILED().code)
        }

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Post deleted successfully').message)
    } catch (error) {
        return ApiError(
            error instanceof Error ? error : new Error(INTERNAL_SERVICE('delete published post').message),
            req,
            next,
            INTERNAL_SERVICE().code
        )
    }
})

/**
 * ! Handles user archiving a published post
 *
 * This function is an asynchronous request handler that is responsible for handling a user archiving a published post.
 * It expects the user's id from the request object and the post id from the request params.
 *
 * @param {Request} req - The request object containing the user's id and the post id.
 * @param {Response} res - The response object used to send the response back to the client.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Promise<void>} A promise that resolves to void.
 *
 * @throws {Error} Will throw an error if there is an issue archiving the post.
 */
export const archivePublishedPost = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    // Get the user id from the request object
    const userId = (req.user as User)?.id
    if (!userId) {
        return ApiError(new Error(UNAUTHORIZED.message), req, next, UNAUTHORIZED.code)
    }

    // Get the post id from the request params
    const postId = req.params.id

    // Create the where object to find the post
    const where: PublishWhere = {
        id: postId,
        authorId: userId
    }

    // Set the status of the post to archived
    const status = req.body as ENUMS.DRAFT_STATUS
    try {
        const changedStatus = await publishService.changePublishedPostStatus(req, next, where, status)
        if (!changedStatus) {
            return ApiError(new Error(METHOD_FAILED('Failed archiving published post').message), req, next, METHOD_FAILED().code)
        }

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Post archived successfully').message)
    } catch (error) {
        return ApiError(
            error instanceof Error ? error : new Error(INTERNAL_SERVICE('archive published post').message),
            req,
            next,
            INTERNAL_SERVICE().code
        )
    }
})

/**
 * ! Handles user unarchiving a published post
 *
 * This function is an asynchronous request handler that is responsible for handling a user unarchiving a published post.
 * It expects the user's id from the request object and the post id from the request params.
 *
 * @param {Request} req - The request object containing the user's id and the post id.
 * @param {Response} res - The response object used to send the response back to the client.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Promise<void>} A promise that resolves to void.
 *
 *  @throws {Error} Will throw an error if there is an issue unarchiving the post.
 */
export const unarchivePublishedPost = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    // Get the user id from the request object
    const userId = (req.user as User)?.id
    if (!userId) {
        return ApiError(new Error(UNAUTHORIZED.message), req, next, UNAUTHORIZED.code)
    }

    // Get the post id from the request params
    const postId = req.params.id

    // Create the where object to find the post
    const where: PublishWhere = {
        id: postId,
        authorId: userId
    }

    // Set the status of the post to published
    const status = ENUMS.DRAFT_STATUS.PUBLISHED
    try {
        const changedStatus = await publishService.changePublishedPostStatus(req, next, where, status)
        if (!changedStatus) {
            return ApiError(new Error(METHOD_FAILED('Failed unarchiving published post').message), req, next, METHOD_FAILED().code)
        }

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Post unarchived successfully').message)
    } catch (error) {
        return ApiError(
            error instanceof Error ? error : new Error(INTERNAL_SERVICE('unarchive published post').message),
            req,
            next,
            INTERNAL_SERVICE().code
        )
    }
})

/**
 * ! Handles user fetching all published posts
 *
 * This function is an asynchronous request handler that is responsible for handling a user fetching all published or achieve posts.
 * It expects the user's id from the request object.
 *
 * @param {Request} req - The request object containing the user's id.
 * @param {Response} res - The response object used to send the response back to the client.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Promise<void>} A promise that resolves to void.
 *
 * @throws {Error} Will throw an error if there is an issue fetching the posts.
 */
export const fetchPublishedPosts = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    // Get the limit and page query parameters
    const { limit, page } = req.query as { limit: string; page: string }

    // Validate the limit and page query parameters
    if (limit && isNaN(Number(limit))) {
        return ApiError(new Error(BAD_REQUEST('limit must be a number').message), req, next, BAD_REQUEST().code)
    }

    // Calculate the number of posts to skip
    const skip = limit && page ? (+page - 1) * +limit : 0

    // Create the query object
    const query: QueryParameter = { limit: +limit, skip }

    // Create the payload to find the posts
    const status = req.body as ENUMS.DRAFT_STATUS

    if (!Object.values(ENUMS.DRAFT_STATUS).includes(status)) {
        return ApiError(new Error(BAD_REQUEST('Invalid status').message), req, next, BAD_REQUEST().code)
    }

    // Create the payload to find the posts
    const payload: PublishedWhere = {
        // authorId: userId,
        status
    }
    try {
        const publishedPosts = await publishService.listUserPosts(req, next, payload, query)
        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Published posts fetched successfully').message, publishedPosts)
    } catch (error) {
        return ApiError(
            error instanceof Error ? error : new Error(INTERNAL_SERVICE('fetch published posts').message),
            req,
            next,
            INTERNAL_SERVICE().code
        )
    }
})

/**
 * ! Handles user fetching a published post
 *
 * This function is an asynchronous request handler that is responsible for handling a user fetching a published post.
 * It expects the user's id from the request object and the post id from the request params.
 *
 * @param {Request} req - The request object containing the user's id and the post id.
 * @param {Response} res - The response object used to send the response back to the client.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Promise<void>} A promise that resolves to void.
 *
 * @throws {Error} Will throw an error if there is an issue fetching the post.
 */
export const fetchPublishedPost = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    // Get the user id from the request object
    const userId = (req.user as User)?.id
    if (!userId) {
        return ApiError(new Error(UNAUTHORIZED.message), req, next, UNAUTHORIZED.code)
    }

    // Get the post id from the request params
    const postId = req.params.id

    // Create the where object to find the post
    const where: PublishWhere = {
        id: postId,
        authorId: userId
    }

    try {
        const publishedPost = await publishService.getPublishedPost(req, next, where)
        if (!publishedPost) {
            return ApiError(new Error(METHOD_FAILED('Failed fetching published post').message), req, next, METHOD_FAILED().code)
        }

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Published post fetched successfully').message, publishedPost)
    } catch (error) {
        return ApiError(
            error instanceof Error ? error : new Error(INTERNAL_SERVICE('fetch published post').message),
            req,
            next,
            INTERNAL_SERVICE().code
        )
    }
})
