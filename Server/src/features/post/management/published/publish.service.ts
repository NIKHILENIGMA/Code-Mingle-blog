import { NextFunction, Request } from 'express'
import { DRAFT_STATUS, responseMessage } from '../../../../constant'
import { ApiError } from '../../../../utils/ApiError'
import prisma from '../../../../config/prisma.config'
import { PublishedPostDTO, PublishPostPayload, UpdatePublishedPost, PublishWhere, PublishedWhere, QueryParameter } from './publish.types'

const { INTERNAL_SERVICE, NOT_FOUND } = responseMessage

export default class PublishService {
    /**
     * Publish a post.
     *
     * @param {Request} req - The Express request object.
     * @param {NextFunction} next - Express next function for error handling.
     * @param {string} id - The unique identifier of the post to publish.
     * @param {PublishPostPayload} payload - The data to update when publishing.
     * @returns {Promise<PublishedPostDTO | void>} The published post or void if error occurs.
     * @throws {ApiError} When post not found or publishing fails.
     */
    public async publishPost(req: Request, next: NextFunction, id: string, payload: PublishPostPayload): Promise<PublishedPostDTO | void> {
        try {
            

            const publishedPost = await prisma.post.update({
                where: {
                    id
                },
                data: payload
            })

            return publishedPost
        } catch (error) {
            if (error instanceof Error) {
                if (error.message.includes('Record to update not found')) {
                    return ApiError(new Error(NOT_FOUND(`Post with ID ${id} not found`).message), req, next, NOT_FOUND().code)
                }

                return ApiError(new Error(INTERNAL_SERVICE('publish post').message), req, next, INTERNAL_SERVICE().code)
            }

            return ApiError(new Error(INTERNAL_SERVICE('An error occurred while publishing the post').message), req, next, INTERNAL_SERVICE().code)
        }
    }

    /**
     * Check if a slug is available for use.
     * 
     * This function checks if a given slug is already in use by any existing post.
     * A slug is considered available if no post is found with the given slug.
     *
     * @param {Request} req - The Express request object.
     * @param {NextFunction} next - Express next function for error handling.
     * @param {string} slug - The slug to check for availability.
     * @returns {Promise<boolean | void>} Returns true if the slug is available,
     *                                   false if it's taken, or void if an error occurs.
     * 
     * @throws {ApiError} Throws an error if there's a problem checking the slug availability.
     * 
     * @example
     * /// Check if a slug is available
     * const isAvailable = await publishService.isSlugAvailable(req, next, 'my-post-slug');
     * if (isAvailable) {
     *   /// Slug can be used
     * }
     */

    public async isSlugAvailable(req: Request, next: NextFunction, slug: string): Promise<boolean | void> {
        try {
            const post = await prisma.post.findFirst({
                where: {
                    slug
                }
            })

            return post === null
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(INTERNAL_SERVICE('save draft').message), req, next, INTERNAL_SERVICE().code)
        }
    }

    /**
     * Update an existing published post.
     *
     * @param {Request} req - The Express request object.
     * @param {NextFunction} next - Express next function for error handling.
     * @param {PublishWhere} where - Criteria to find the post to update.
     * @param {UpdatePublishedPost} payload - The update data.
     * @returns {Promise<PublishedPostDTO | void>} The updated post or void if error occurs.
     * @throws {ApiError} When update fails.
     */
    public async updatePublishedPost(
        req: Request,
        next: NextFunction,
        where: PublishWhere,
        payload: UpdatePublishedPost
    ): Promise<PublishedPostDTO | void> {
        try {
            const updatedPost = await prisma.post.update({
                where,
                data: payload
            })

            return updatedPost
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(INTERNAL_SERVICE('save draft').message), req, next, INTERNAL_SERVICE().code)
        }
    }

    /**
     * Delete a published post.
     *
     * This function deletes a published post.
     *
     * @param {Request} req - The request object.
     * @param {NextFunction} next - The next function.
     * @param {PublishWhere} where - The post where clause.
     * @returns {Promise<PublishedPostDTO | void>} - A promise that resolves to the deleted post.
     *
     * @throws {ApiError} - Throws an error if there is an error deleting the post.
     */
    public async deletePublishedPost(req: Request, next: NextFunction, where: PublishWhere): Promise<PublishedPostDTO | void> {
        try {
            const deletedPost = await prisma.post.delete({
                where
            })

            return deletedPost
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(INTERNAL_SERVICE('save draft').message), req, next, INTERNAL_SERVICE().code)
        }
    }

    /**
     * Change the status of a post.
     *
     * This function changes the status of a post.
     *
     * @param {Request} req - The request object.
     * @param {NextFunction} next - The next function.
     * @param {PublishWhere} where - The post where clause.
     * @param {DRAFT_STATUS} status - The status of the post.
     * @returns {Promise<PublishedPostDTO | void>} - A promise that resolves to the updated post.
     *
     * @throws {ApiError} - Throws an error if there is an error changing the status of the post.
     */
    public async changePublishedPostStatus(
        req: Request,
        next: NextFunction,
        where: PublishWhere,
        status: DRAFT_STATUS
    ): Promise<PublishedPostDTO | void> {
        try {
            const updatedPost = await prisma.post.update({
                where,
                data: {
                    status
                }
            })

            return updatedPost
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(INTERNAL_SERVICE('save draft').message), req, next, INTERNAL_SERVICE().code)
        }
    }

    /**
     * List all user published posts.
     *
     * This function lists all user published posts.
     *
     * @param {Request} req - The request object.
     * @param {NextFunction} next - The next function.
     * @param {PublishedWhere} where - The post where clause.
     * @param {QueryParameter} query - The query parameters.
     * @returns {Promise<PublishedPostDTO[] | void>} - A promise that resolves to the published posts.
     *
     * @throws {ApiError} - Throws an error if there is an error listing the posts.
     */
    public async listUserPosts(req: Request, next: NextFunction, where: PublishedWhere, query: QueryParameter): Promise<PublishedPostDTO[] | void> {
        try {
            const publishedPosts = await prisma.post.findMany({
                where,
                skip: query.skip,
                take: query.limit,
                orderBy: {
                    publishedAt: 'desc'
                }
            })

            return publishedPosts
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(INTERNAL_SERVICE('save draft').message), req, next, INTERNAL_SERVICE().code)
        }
    }

    /**
     * Get a published post.
     *
     * This function gets a published post.
     *
     * @param {Request} req - The request object.
     * @param {NextFunction} next - The next function.
     * @param {PublishWhere} where - The post where clause.
     * @returns {Promise<PublishedPostDTO | void>} - A promise that resolves to the published post.
     *
     * @throws {ApiError} - Throws an error if there is an error getting the post.
     */
    public async getPublishedPost(req: Request, next: NextFunction, where: PublishWhere): Promise<PublishedPostDTO | void> {
        try {
            const publishedPost = await prisma.post.findUnique({
                where
            })

            if (!publishedPost) {
                return ApiError(new Error(NOT_FOUND('Post not found').message), req, next, NOT_FOUND().code)
            }
            return publishedPost
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(INTERNAL_SERVICE('post found').message), req, next, INTERNAL_SERVICE().code)
        }
    }
}
