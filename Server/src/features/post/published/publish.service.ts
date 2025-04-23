import { NextFunction, Request } from 'express'
import { responseMessage } from '@/constant'
import { ApiError } from '@/utils/ApiError'
import prisma from '@/config/prisma.config'
import { PublishedPostDTO, UpdatePublishedPost, PublishWhere, PublishedWhere, QueryParameter, PublishPostBody } from './publish.types'
import { ENUMS } from '@/types'

const { INTERNAL_SERVICE, NOT_FOUND, POST_NOT_FOUND } = responseMessage

export default class PublishService {
    /**
     * Publish a post owned by a user.
     *
     * @param {string} userId - ID of the user publishing the post.
     * @param {string} postId - ID of the post to publish.
     * @param {PublishPostPayload} payload - Data for publishing the post.
     * @returns {Promise<PublishedPostDTO>} - The published post.
     */

    public async publishPost(userId: string, postId: string, payload: PublishPostBody): Promise<PublishedPostDTO | void> {
        try {
            const existingDraft = await prisma.post.findFirst({
                where: {
                    id: postId,
                    authorId: userId,
                    status: ENUMS.DRAFT_STATUS.DRAFT
                }
            })

            // Check if the draft exists and is owned by the user
            if (!existingDraft) {
                throw new Error(POST_NOT_FOUND(`draft with id:${postId} does not exist or deleted already`).message)
            }

            // if slug is not provided, generate it from the title
            if (!payload.slug) {
                if (!existingDraft.title) {
                    throw new Error(POST_NOT_FOUND('Post title is required to generate slug').message)
                }
                payload.slug = this.changeTitleToSlug(existingDraft.title)
            }

            const publishedPost = await prisma.post.update({
                where: {
                    id: existingDraft.id,
                    authorId: userId
                },
                data: payload
            })

            return publishedPost
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(
                    error.message.includes('Record to update not found')
                        ? NOT_FOUND('Post not found').message
                        : INTERNAL_SERVICE('publish post').message
                )
            }

            throw new Error(INTERNAL_SERVICE('An unknown error occurred while publishing the post').message)
        }
    }

    /**
     * Check if a slug is available for use.
     *
     * This function checks if a given slug is already in use by any existing post.
     * A slug is considered available if no post is found with the given slug.
     *
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

    public async isSlugAvailable(slug: string): Promise<boolean | void> {
        try {
            const post = await prisma.post.findFirst({
                where: {
                    slug
                }
            })

            return post === null
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(
                    error.message.includes('Record to update not found')
                        ? NOT_FOUND('Post not found').message
                        : INTERNAL_SERVICE('slug checking').message
                )
            }

            throw new Error(INTERNAL_SERVICE('An error occurred while checking slug availability').message)
        }
    }

    /**
     * Update an existing published post.
     *
     * @param {string} userId - The ID of the user who owns the post.
     * @param {string} postId - The ID of the post to update.
     * @param {UpdatePublishedPost} payload - The update data.
     * @returns {Promise<PublishedPostDTO | void>} The updated post or void if error occurs.
     * @throws {ApiError} When update fails.
     */
    public async updatePublishedPost(postId: string, userId: string, payload: UpdatePublishedPost): Promise<PublishedPostDTO | void> {
        try {
            const existingPost = await prisma.post.findUnique({
                where: {
                    id: postId,
                    authorId: userId
                }
            })

            if (!existingPost) {
                throw new Error(POST_NOT_FOUND(`Post with id:${postId} does not exist or already deleted`).message)
            }

            const updatedPost = await prisma.post.update({
                where: {
                    id: existingPost.id,
                    authorId: userId
                },
                data: payload
            })

            return updatedPost
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(
                    error.message.includes('Record to update not found')
                        ? NOT_FOUND('Post not found').message
                        : INTERNAL_SERVICE('update post').message
                )
            }

            throw new Error(INTERNAL_SERVICE('An error occurred while updating the post').message)
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
        status: ENUMS.DRAFT_STATUS
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

    private changeTitleToSlug(title: string): string {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
    }
}
