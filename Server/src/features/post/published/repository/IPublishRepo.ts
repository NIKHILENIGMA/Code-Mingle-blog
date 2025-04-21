import { ENUMS } from '@/types'
import { Post } from '@prisma/client'

export interface PublishPostPayload {
    slug?: string
    categoryId: number
    status: ENUMS.DRAFT_STATUS.PUBLISHED
    tags?: string[]
}

export interface IPublishRepository {
    findPostByIdAndAuthor(postId: string, userId: string): Promise<Post | null>
    updatePostStatus(postId: string, payload: PublishPostPayload): Promise<Post>
    findPublishedPostBySlug(slug: string): Promise<Post | null>
    findPublishedPostByAuthor(authorId: string): Promise<Post[]>
    findPublishedPostByCategory(categoryId: number): Promise<Post[]>
    findPublishedPostByFollowings(followingIds: string[]): Promise<Post[]>
}
