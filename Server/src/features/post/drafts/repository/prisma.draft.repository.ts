import { ENUMS } from '@/types'
import prisma from '@config/prisma.config'
import { Post } from '@prisma/client'
import { IDraftRepository } from './IDraftRepository'
import { DraftPreview } from '../draft.types'
import { logger } from '@/utils'

class PrismaDraftRepository implements IDraftRepository {
    

    /**
     * Creates a new draft post.
     *
     * @param {Object} payload - The data for the new draft.
     * @param {ENUMS.DRAFT_STATUS} payload.status - The status of the draft.
     * @param {string} payload.authorId - The ID of the author creating the draft.
     * @returns {Promise<Post | undefined>} The created draft post or undefined if an error occurs.
     */
    public async create(payload: { status: ENUMS.DRAFT_STATUS; authorId: string }): Promise<Post> {
        try {
            return await prisma.post.create({
                data: payload
            })
        } catch (error) {
            logger.error(`Error creating draft: ${(error as Error).message}`)
            throw new Error(`Failed to create draft: ${(error as Error).message}`)
        }
    }

    /**
     * Updates an existing draft post.
     *
     * @param {Object} where - The criteria to find the draft to update.
     * @param {string} where.id - The ID of the draft.
     * @param {string} where.authorId - The ID of the author of the draft.
     * @param {Partial<Post>} payload - The data to update the draft with.
     * @returns {Promise<Post | undefined>} The updated draft post or undefined if an error occurs.
     */
    public async update(where: { id: string; authorId: string }, payload: Partial<Post>): Promise<Post> {
        try {
            const updatedDraft = await prisma.post.update({
                where,
                data: payload
            })

            return updatedDraft
        } catch (error) {
            logger.error(`Error updating draft: ${(error as Error).message}`)
            throw new Error(`Failed to update draft: ${(error as Error).message}`)
        }
    }

    /**
     * Deletes a draft post.
     *
     * @param {Object} where - The criteria to find the draft to delete.
     * @param {string} where.id - The ID of the draft.
     * @param {string} where.authorId - The ID of the author of the draft.
     * @param {ENUMS.DRAFT_STATUS} where.status - The status of the draft.
     * @returns {Promise<void>} Resolves when the draft is deleted.
     * @throws {Error} Throws an error if the deletion fails.
     */
    public async delete(where: { id: string; authorId: string; status: ENUMS.DRAFT_STATUS }): Promise<void> {
        try {
            await prisma.post.delete({
                where: {
                    id: where.id,
                    authorId: where.authorId,
                    status: where.status
                }
            })
        } catch (error) {
            logger.error(`Error deleting draft: ${(error as Error).message}`)
            throw new Error(`Failed to delete draft: ${(error as Error).message}`)
        }
    }

    /**
     * Finds a draft post based on specified criteria and selected fields.
     *
     * @param {Object} where - The criteria to find the draft.
     * @param {string} where.id - The ID of the draft.
     * @param {string} where.authorId - The ID of the author of the draft.
     * @param {ENUMS.DRAFT_STATUS} where.status - The status of the draft.
     * @param {Object} fields - The fields to select from the draft.
     * @returns {Promise<Partial<Post> | null>} The found draft or null if not found.
     */
    public async findDraft(
        where: { id: string; authorId: string; status: ENUMS.DRAFT_STATUS },
        fields: {
            id: boolean
            title: boolean
            content: boolean
            thumbnailImage?: boolean
            image?: boolean
            createdAt?: boolean
        }
    ): Promise<Partial<Post> | null> {
        try {
            const draft = await prisma.post.findUnique({
                where: {
                    id: where.id,
                    authorId: where.authorId,
                    status: where.status
                },
                select: fields
            })

            return draft
        } catch (error) {
            logger.error(`Error finding draft: ${(error as Error).message}`)
            throw new Error(`Failed to find draft: ${(error as Error).message}`)
        }
    }

    /**
     * Finds a draft post by its ID.
     *
     * @param {Object} where - The criteria to find the draft.
     * @param {string} where.id - The ID of the draft.
     * @param {string} where.authorId - The ID of the author of the draft.
     * @param {ENUMS.DRAFT_STATUS} where.status - The status of the draft.
     * @returns {Promise<Post | null>} The found draft or null if not found.
     */
    public async findDraftById(where: { id: string; authorId: string; status: ENUMS.DRAFT_STATUS }): Promise<Post | null> {
        try {
            const draft = await prisma.post.findUnique({
                where
            })

            return draft
        } catch (error) {
            logger.error(`Error finding draft by ID: ${(error as Error).message}`)
            throw new Error(`Failed to find draft by ID: ${(error as Error).message}`)
        }
    }

    /**
     * Finds all drafts by a specific author ID and status.
     *
     * @param {Object} where - The criteria to find drafts.
     * @param {string} where.authorId - The ID of the author.
     * @param {ENUMS.DRAFT_STATUS} where.status - The status of the drafts.
     * @returns {Promise<Post[] | null>} An array of drafts or null if none found.
     */
    public async findDraftsByAuthorId(where: { authorId: string; status: ENUMS.DRAFT_STATUS }): Promise<Post[] | null> {
        try {
            const drafts = await prisma.post.findMany({
                where
            })

            return drafts
        } catch (error) {
            logger.error(`Error finding drafts by author ID: ${(error as Error).message}`)
            throw new Error(`Failed to find drafts by author ID: ${(error as Error).message}`)
        }
    }

    /**
     * Retrieves a draft preview by its ID.
     *
     * @param {Object} where - The criteria to find the draft preview.
     * @param {string} where.id - The ID of the draft.
     * @param {string} where.authorId - The ID of the author of the draft.
     * @param {ENUMS.DRAFT_STATUS} where.status - The status of the draft.
     * @returns {Promise<DraftPreview | null>} The draft preview or null if not found.
     */
    public async draftPreviewById(where: { id: string; authorId: string; status: ENUMS.DRAFT_STATUS }): Promise<DraftPreview | null> {
        try {
            const draftPreview = await prisma.post.findUnique({
                where: where,
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    content: true,
                    image: true,
                    readTime: true,
                    category: {
                        select: {
                            name: true
                        }
                    },
                    author: {
                        select: {
                            id: true,
                            username: true,
                            avatarImg: true
                        }
                    }
                }
            })

            return draftPreview
        } catch (error) {
            logger.error(`Error finding draft preview by ID: ${(error as Error).message}`)
            throw new Error(`Failed to find draft preview by ID: ${(error as Error).message}`)
        }
    }
}

const prismaDraftRepository = new PrismaDraftRepository();

export default prismaDraftRepository
