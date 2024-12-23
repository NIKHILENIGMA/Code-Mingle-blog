import { Reply } from '@prisma/client'
import prisma from '../../database/PrismaConnection'
import { IReplyRepository } from '../Interfaces/IReplyRepository'

export class PrismaReplyRepository implements IReplyRepository {
    async create(payload: Partial<Reply>): Promise<Reply> {
        const { commentId, authorId, content } = payload

        const reply = await prisma.reply.create({
            data: {
                commentId: commentId as string,
                authorId: authorId as string,
                content: content as string
            }
        })

        return reply
    }

    async delete(replyId: string): Promise<void> {
        await prisma.reply.delete({
            where: {
                id: replyId
            }
        })
    }

    async getRepliesByCommentId(commentId: string, page: number, limit: number): Promise<Reply[]> {
        const replies = await prisma.reply.findMany({
            where: {
                commentId
            },
            skip: (page - 1) * limit,
            take: limit,
            orderBy: {
                createdAt: 'desc'
            }
        })

        return replies
    }

    async getReplyById(replyId: string, commentId: string): Promise<Reply | null> {
        const reply = await prisma.reply.findUnique({
            where: {
                id: replyId,
                commentId
            }
        })

        return reply
    }
}
