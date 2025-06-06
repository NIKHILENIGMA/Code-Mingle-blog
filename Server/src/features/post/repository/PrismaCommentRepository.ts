import prisma from '@/config/prisma.config'
import { Comment } from '@prisma/client'

interface ICommentRepository {
    createComment(postId: string, userId: string, content: string): Promise<Comment>
    updateComment(commentId: string, postId: string, userId: string, content: string): Promise<Comment>
    deleteComment(commentId: string, userId: string): Promise<Comment>
    findCommentByIdAndUserId(commentId: string, userId: string): Promise<Comment | null>
    findCommentById(postId: string): Promise<Comment | null>
    findCommentsByPostId(postId: string): Promise<Comment[] | null>
    countComments(postId: string): Promise<number>
}

export class PrismaCommentRepository implements ICommentRepository {
    public async createComment(postId: string, userId: string, content: string): Promise<Comment> {
        return prisma.comment.create({
            data: {
                postId,
                userId,
                content
            }
        })
    }

    public async updateComment(commentId: string, postId: string, userId: string, content: string): Promise<Comment> {
        return prisma.comment.update({
            where: { id: commentId, userId, postId },
            data: { content }
        })
    }

    public async deleteComment(commentId: string, userId: string): Promise<Comment> {
        return prisma.comment.delete({
            where: { id: commentId, userId }
        })
    }
    public async findCommentByIdAndUserId(commentId: string, userId: string): Promise<Comment | null> {
        return await prisma.comment.findFirst({
            where: {
                id: commentId,
                userId
            }
        })
    }

    public async findCommentById(commentId: string): Promise<Comment | null> {
        return prisma.comment.findUnique({
            where: { id: commentId }
        })
    }

    public async countComments(postId: string): Promise<number> {
        return prisma.comment.count({
            where: { postId }
        })
    }

    public async findCommentsByPostId(postId: string): Promise<Comment[] | null> {
        return prisma.comment.findMany({
            where: { postId },
            select: {
                id: true,
                content: true,
                userId: true,
                postId: true,
                createdAt: true,
                updatedAt: true,
                user: {
                    select: {
                        id: true,
                        username: true,
                        profileImage: true
                    }
                }
            }
        })
    }
}
