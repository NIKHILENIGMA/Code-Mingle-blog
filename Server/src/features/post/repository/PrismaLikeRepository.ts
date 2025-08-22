import prisma from '@/config/db.config'
import { Like, LikeTarget } from '@/generated/prisma/client'

interface ILikeRepository {
    likePost(postId: string, userId: string): Promise<Like | null>
    disLikePost(id: string, postId: string, userId: string): Promise<Like | null>
    likeComment(commentId: string, userId: string): Promise<Like | null>
    disLikeComment(id: string, commentId: string, userId: string): Promise<Like | null>
    likeReply(replyId: string, userId: string): Promise<Like | null>
    disLikeReply(id: string, replyId: string, userId: string): Promise<Like | null>
    getPostLikesByPostId(postId: string): Promise<Like | null>
    getCommentLikesByCommentId(commentId: string): Promise<Like | null>
    getReplyLikesByReplyId(replyId: string): Promise<Like | null>
    countLikes(postId: string): Promise<number>
}

class PrismaLikeRepository implements ILikeRepository {
    public async likePost(postId: string, userId: string): Promise<Like | null> {
        return prisma.like.create({
            data: {
                target: LikeTarget.POST,
                targetId: postId,
                userId
            }
        })
    }

    public async disLikePost(id: string, postId: string, userId: string): Promise<Like | null> {
        const disLikePost = await prisma.like.delete({
            where: {
                id,
                userId,
                target: LikeTarget.POST,
                targetId: postId
            }
        })
        return disLikePost
    }

    public async likeComment(commentId: string, userId: string): Promise<Like | null> {
        return prisma.like.create({
            data: {
                target: LikeTarget.COMMENT,
                targetId: commentId,
                userId
            }
        })
    }

    public async disLikeComment(id: string, commentId: string, userId: string): Promise<Like | null> {
        return prisma.like.delete({
            where: {
                id,
                userId,
                target: LikeTarget.COMMENT,
                targetId: commentId
            }
        })
    }

    public async likeReply(replyId: string, userId: string): Promise<Like | null> {
        return prisma.like.create({
            data: {
                target: LikeTarget.REPLY,
                targetId: replyId,
                userId
            }
        })
    }

    public async disLikeReply(id: string, replyId: string, userId: string): Promise<Like | null> {
        return prisma.like.delete({
            where: {
                id,
                target: LikeTarget.REPLY,
                targetId: replyId,
                userId
            }
        })
    }

    public async getPostLikesByPostId(postId: string): Promise<Like | null> {
        return prisma.like.findFirst({
            where: {
                target: LikeTarget.POST,
                targetId: postId
            }
        })
    }

    public async getCommentLikesByCommentId(commentId: string): Promise<Like | null> {
        return prisma.like.findFirst({
            where: {
                target: LikeTarget.COMMENT,
                targetId: commentId
            }
        })
    }

    public async getReplyLikesByReplyId(replyId: string): Promise<Like | null> {
        return prisma.like.findFirst({
            where: {
                target: LikeTarget.REPLY,
                targetId: replyId
            }
        })
    }

    public async countLikes(postId: string): Promise<number> {
        return prisma.like.count({
            where: {
                target: LikeTarget.POST,
                targetId: postId
            }
        })
    }
}

const likeRepository = new PrismaLikeRepository()
export { likeRepository, ILikeRepository }
