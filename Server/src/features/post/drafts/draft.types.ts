import { UpdateDraftBodySchema } from '@/api'
import { z } from 'zod'


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

