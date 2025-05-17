import { UpdateDraftBodySchema } from '@/api'
import { ENUMS } from '@/types'
import { z } from 'zod'

/**
 * Interface representing the payload to create a new draft.
 *
 * @interface
 * @property {DRAFT_STATUS.DRAFT | 'DRAFT'} status - The status of the draft.
 * @property {string} authorId - The ID of the author of the draft.
 */
export interface CreateDraft {
    status: ENUMS.DRAFT_STATUS.DRAFT | 'DRAFT'
    authorId: string
}

export type DraftUpdateFields = z.infer<typeof UpdateDraftBodySchema>
/**
 * Interface representing the response of a draft. DTO stands for Data Transfer Object.
 *
 * @interface
 * @property {DRAFT_STATUS.DRAFT | 'DRAFT'} status - The status of the draft.
 * @property {string} authorId - The ID of the author of the draft.
 * @property {string} title - The title of the draft.
 * @property {string} content - The content of the draft.
 * @property {string} image - The image of the draft.
 * @property {string} thumbnail - The thumbnail of the draft {optional}.
 * @property {string} categoryId - The category ID of the draft {optional}.
 * @property {string} slug - The slug of the draft {optional}.
 * @property {string} createdAt - The creation date of the draft.
 * @property {string} updatedAt - The update date of the draft.
 */
export interface DraftDTO {
    id: string
    title: string
    content: string
    image?: string
    thumbnail?: string
    categoryId?: string
    slug?: string
    status?: ENUMS.DRAFT_STATUS
    createdAt: Date
    updatedAt: Date
}

export interface DraftPreview {
    id: string
    title: string | null
    content: string | null
    slug: string
    postCoverImage: string | null
    readTime: number | null
    author: {
        id: string
        username: string
        profileImage: string
    }
}

export interface SelectedDraftFields {
    id: boolean
    title: boolean
    content: boolean
    thumbnailImage?: boolean
    image?: boolean
    createdAt?: boolean
}
