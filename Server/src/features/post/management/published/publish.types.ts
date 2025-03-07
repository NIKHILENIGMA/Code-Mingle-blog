import { DRAFT_STATUS } from '../../../../constant'

// types.ts
export interface PublishPostBody {
    title: string
    thumbnail: string
    slug: string
}

export interface PublishPostPayload extends PublishPostBody {
    status: DRAFT_STATUS
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
    authorId: string
    status: DRAFT_STATUS
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
