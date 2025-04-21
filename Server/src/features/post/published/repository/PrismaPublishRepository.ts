import prisma from '../../../../../config/prisma.config'
import { DRAFT_STATUS } from '../../../../../constant'
import { IPublishRepository, PublishPostPayload } from './IPublishRepo'

export class PrismaPublishRepository implements IPublishRepository {
    public async findPostByIdAndAuthor(postId: string, userId: string) {
        return prisma.post.findFirst({
            where: { id: postId, authorId: userId }
        })
    }

    public async updatePostStatus(postId: string, payload: PublishPostPayload) {
        return prisma.post.update({
            where: { id: postId },
            data: payload
        })
    }

    public async findPostBySlug(slug: string) {
        return prisma.post.findFirst({
            where: { slug }
        })
    }

    public async updatePostThumbnail(postId: string, authorId: string, thumbnail: string) {
        return prisma.post.update({
            where: { id: postId, authorId },
            data: { thumbnailImage: thumbnail }
        })
    }

    public async deletePublishedPost(postId: string, authorId: string) {
        return prisma.post.delete({
            where: { id: postId, authorId }
        })
    }

    public async changePostStatus(postId: string, authorId: string, status: DRAFT_STATUS) {
        return prisma.post.update({
            where: { id: postId, authorId },
            data: { status }
        })
    }

    public async findPublishedPostById(postId: string) {
        return prisma.post.findFirst({
            where: { id: postId, status: DRAFT_STATUS.PUBLISHED }
        })
    }

    public async findPublishedPostBySlug(slug: string) {
        return prisma.post.findFirst({
            where: { slug, status: DRAFT_STATUS.PUBLISHED }
        })
    }

    public async findPublishedPostByAuthor(authorId: string) {
        return prisma.post.findMany({
            where: { authorId, status: DRAFT_STATUS.PUBLISHED }
        })
    }

    public async findPublishedPostByCategory(categoryId: number) {
        return prisma.post.findMany({
            where: { categoryId, status: DRAFT_STATUS.PUBLISHED }
        })
    }

    public async findPublishedPostByFollowings(followingIds: string[]) {
        return prisma.post.findMany({
            where: {
                authorId: { in: followingIds },
                status: DRAFT_STATUS.PUBLISHED
            }
        })
    }

}
