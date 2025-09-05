import { z } from 'zod'
import { UpdateDraftBodySchema } from './draft.validator'

export type DraftUpdateFields = z.infer<typeof UpdateDraftBodySchema>

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
