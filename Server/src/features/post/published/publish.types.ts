import { z } from 'zod'
import { PublishBodySchema } from '@/api'
import { ThumbnailFileSchema } from '@/api/validators/publish.validator'

export type PublishPayload = z.infer<typeof PublishBodySchema>
export type ThumbnailFile = z.infer<typeof ThumbnailFileSchema>

export type OrderBy = 'asc' | 'desc'
export interface QueryParameter {
    limit: number
    skip: number
}

export interface CommunityPosts {
    title: string | null
    content: string | null
    postCoverImage: string | null
    thumbnailImage: string | null
    createdAt: Date
    user: {
        id: string
        username: string
        profileImage: string | null
    }
}
