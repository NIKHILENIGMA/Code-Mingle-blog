import { PostStatus } from '@prisma/client'
import { User } from './User'

export interface Blog {
    id: string
    title: string
    content: string
    status: PostStatus
    authorId: string
    author: User
    createdAt: Date
    updatedAt: Date
    publishedAt: Date
    slug: string
    metaDescription: string
    image: string
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
