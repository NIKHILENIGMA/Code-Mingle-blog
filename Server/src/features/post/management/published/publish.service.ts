import { NextFunction, Request } from 'express'
import { DRAFT_STATUS, responseMessage } from '../../../../constant'
import { ApiError } from '../../../../utils/ApiError'
import prisma from '../../../../config/prisma.config'
import { PublishedPostDTO, PublishPostPayload, UpdatePublishedPost, PublishWhere, PublishedWhere, QueryParameter } from './publish.types'

const { INTERNAL_SERVICE, NOT_FOUND } = responseMessage

export default class PublishService {
    constructor() {}

    /**
     * Publish a post.
     *
     * This function publishes a post by updating the post status to published.
     *
     * @param {Request} req - The request object.
     * @param {NextFunction} next - The next function.
     * @param {string} id - The post ID.
     * @param {PublishPostPayload} payload - The post payload.
     * @returns {Promise<PublishedPostDTO | void>} - A promise that resolves to the published post.
     *
     * @throws {ApiError} - Throws an error if there is an error publishing the post.
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
            return ApiError(error instanceof Error ? error : new Error(INTERNAL_SERVICE('save draft').message), req, next, INTERNAL_SERVICE().code)
        }
    }

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
     * Update a published post.
     *
     * This function updates a published post.
     *
     * @param {Request} req - The request object.
     * @param {NextFunction} next - The next function.
     * @param {PublishWhere} where - The post where clause.
     * @param {UpdatePublishedPost} payload - The post payload.
     * @returns {Promise<PublishedPostDTO | void>} - A promise that resolves to the updated post.
     *
     * @throws {ApiError} - Throws an error if there is an error updating the post.
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
            return ApiError(error instanceof Error ? error : new Error(INTERNAL_SERVICE('save draft').message), req, next, INTERNAL_SERVICE().code)
        }
    }
}
