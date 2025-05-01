import { ENUMS } from '@/types'
import { Post } from '@prisma/client'
import { DraftPreview } from '../draft.types'

export interface IDraftRepository {
    /**
     * Creates a new post with the specified status and author ID.
     *
     * @param {Object} payload - The data required to create a post.
     * @param {ENUMS.DRAFT_STATUS} payload.status - The status of the post, which should be one of the predefined draft statuses.
     * @param {string} payload.authorId - The ID of the author creating the post.
     * @returns {Promise<Post>} A promise that resolves to the created Post object.
     */
    create(payload: { status: ENUMS.DRAFT_STATUS; authorId: string }): Promise<Post>

    /**
     * Updates an existing post with the specified ID and author ID.
     *
     * @param {Object} where - The criteria to find the post to update.
     * @param {string} where.id - The ID of the post to update.
     * @param {string} where.authorId - The ID of the author of the post.
     * @param {Partial<Post>} payload - The data to update the post with.
     * @returns {Promise<Post>} A promise that resolves to the updated Post object.
     */
    update(where: { id: string; authorId: string }, payload: Partial<Post>): Promise<Post>

    /**
     * Deletes a post with the specified ID, author ID, and status.
     *
     * @param {Object} where - The criteria to find the post to delete.
     * @param {string} where.id - The ID of the post to delete.
     * @param {string} where.authorId - The ID of the author of the post.
     * @param {ENUMS.DRAFT_STATUS} where.status - The status of the post to delete.
     * @returns {Promise<void>} A promise that resolves when the post is deleted.
     */
    delete(where: { id: string; authorId: string; status: ENUMS.DRAFT_STATUS }): Promise<void>

    /**
     * Finds a draft post with the specified ID, author ID, and status.
     *
     * @param {Object} where - The criteria to find the draft post.
     * @param {string} where.id - The ID of the draft post to find.
     * @param {string} where.authorId - The ID of the author of the draft post.
     * @param {ENUMS.DRAFT_STATUS} where.status - The status of the draft post to find.
     * @param {Object} fields - The fields to include in the result.
     * @returns {Promise<Partial<Post> | null>} A promise that resolves to the found draft post or null if not found.
     */
    findDraft(
        where: { id: string; authorId: string; status: ENUMS.DRAFT_STATUS },
        fields: {
            id: boolean
            title: boolean
            content: boolean
            thumbnailImage?: boolean
            image?: boolean
            createdAt?: boolean
        }
    ): Promise<Partial<Post> | null>

    /**
     * Finds a draft post by its ID and author ID.
     *
     * @param {Object} where - The criteria to find the draft post.
     * @param {string} where.id - The ID of the draft post to find.
     * @param {string} where.authorId - The ID of the author of the draft post.
     * @returns {Promise<Post | null>} A promise that resolves to the found draft post or null if not found.
     */
    findDraftById(where: { id: string; authorId: string }): Promise<Post | null>

    /**
     * Finds all draft posts by the author ID and status.
     *
     * @param {Object} where - The criteria to find the draft posts.
     * @param {string} where.authorId - The ID of the author of the draft posts.
     * @param {ENUMS.DRAFT_STATUS} where.status - The status of the draft posts to find.
     * @returns {Promise<Post[] | null>} A promise that resolves to an array of found draft posts or null if none found.
     */
    findDraftsByAuthorId(where: { authorId: string; status: ENUMS.DRAFT_STATUS }): Promise<Post[] | null>

    /**
     * Finds a draft preview by its ID, author ID, and status.
     *
     * @param {Object} where - The criteria to find the draft preview.
     * @param {string} where.id - The ID of the draft preview to find.
     * @param {string} where.authorId - The ID of the author of the draft preview.
     * @param {ENUMS.DRAFT_STATUS} where.status - The status of the draft preview to find.
     * @returns {Promise<DraftPreview | null>} A promise that resolves to the found draft preview or null if not found.
     */
    draftPreviewById(where: { id: string; authorId: string; status: ENUMS.DRAFT_STATUS }): Promise<DraftPreview | null>
}
