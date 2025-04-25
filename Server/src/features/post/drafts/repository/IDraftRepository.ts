import { ENUMS } from '@/types'
import { Post } from '@prisma/client'
import { DraftPreview } from '../draft.types'

export interface IDraftRepository {
    create(payload: { status: ENUMS.DRAFT_STATUS; authorId: string }): Promise<Post>
    update(where: { id: string; authorId: string }, payload: Partial<Post>): Promise<Post>
    delete(where: { id: string; authorId: string; status: ENUMS.DRAFT_STATUS }): Promise<void>
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
    findDraftById(where: { id: string; authorId: string }): Promise<Post | null>
    findDraftsByAuthorId(where: { authorId: string; status: ENUMS.DRAFT_STATUS }): Promise<Post[] | null>
    draftPreviewById(where: { id: string; authorId: string; status: ENUMS.DRAFT_STATUS }): Promise<DraftPreview | null>
}
