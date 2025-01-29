import { PostStatus } from '@prisma/client'
// import { User } from './User'

export interface Blog {
    id: string
    title: string | null
    content: string | null
    publishedAt: Date | null
    slug: string | null
    metaDescription: string | null
    image: string | null
    thumbnailImage: string | null
    authorId: string
    createdAt: Date
    updatedAt: Date
}

export interface CreateDraftDTO {
    title: string
    content: string
    image: string
    status: PostStatus
    authorId: string
}

export interface UpdateDraftDTO {
    title: string
    content: string
    image: string
    authorId: string
}

export interface BlogDraft {
    id: string
    authorId: string
    title: string | null
    content: string | null
    status: PostStatus
    image: string | null
    createdAt: Date
}

export interface PostDTO {
    id: boolean
    authorId: boolean
    title: boolean
    content: boolean
    status: boolean
    image: boolean
    slug?: boolean
    createdAt: boolean
}

export interface ISaveDraftBody {
    title: string
    content: string
    image: string
    slug?: string
}
