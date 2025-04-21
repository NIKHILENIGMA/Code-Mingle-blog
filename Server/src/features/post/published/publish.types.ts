import { ENUMS } from '@/types';

// types.ts
export interface PublishPostBody {
    slug?: string,
    categoryId: number
    status: ENUMS.DRAFT_STATUS.PUBLISHED
    tags?: string[]
}

export interface PublishPostPayload extends PublishPostBody {
    status: ENUMS.DRAFT_STATUS.PUBLISHED
}

export interface UpdatePublishedPost {
    title: string
    content: string
    image: string
    thumbnailImage: string
    slug: string
}

export interface PublishWhere {
    id: string
    authorId: string
}

export interface PublishedWhere {
    // authorId: string
    status: ENUMS.DRAFT_STATUS
}

export interface QueryParameter {
    limit: number
    skip: number
}

export interface PublishedPostDTO {
    id: string
    title: string | null
    content: string | null
    publishedAt: Date | null
    slug: string | null
    metaDescription: string | null
    image: string | null
    thumbnailImage: string | null
    authorId: string | null
    categoryId: number | null
    status: string | null
    collectionId: string | null
    tags?: string[] | null
    savedBy?: string[] | null
}
