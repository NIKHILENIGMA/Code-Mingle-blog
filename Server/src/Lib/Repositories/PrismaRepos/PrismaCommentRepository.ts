import { Comment } from '@prisma/client'
import prisma from '../../database/PrismaConnection'
import { ICommentRepository } from '../Interfaces/ICommentRepository'

export class PrismaCommentRepository implements ICommentRepository {
    async create(payload: Partial<Comment>): Promise<Comment> {
        const { postId, authorId, content } = payload

        const comment = await prisma.comment.create({
            data: {
                postId: postId as string,
                authorId: authorId as string,
                content: content as string
            }
        })
        
        return comment
    }

    async update(id: string, payload: Partial<Comment>): Promise<Comment> {
        try {
            const comment = await prisma.comment.update({
                where: {
                    id
                },
                data: payload
            })

            return comment
        } catch (error) {
            throw new Error(`Failed to update comment ${(error as Error).message}`)
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await prisma.comment.delete({
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw new Error(`Failed to delete comment ${(error as Error).message}`)
        }
    }
    async findCommentById(id: string): Promise<Comment | null> {
        try {
            const comment = await prisma.comment.findUnique({
                where: {
                    id
                }
            })

            return comment
        } catch (error) {
            throw new Error(`Failed to find comment ${(error as Error).message}`)
        }
    }

    async findCommentByCommentIdAndPostId(postId: string, commentId: string): Promise<Comment | null> {
        try {
            const comment = await prisma.comment.findUnique({
                where: {
                    id: commentId,
                    postId: postId,
                }
            })

            return comment
        } catch (error) {
            throw new Error(`Failed to find comment ${(error as Error).message}`)
        }
    }

    async findParentCommentByUserAndCommentId(userId: string, commentId: string): Promise<Comment | null> {
        try {
            const comment = await prisma.comment.findFirst({
                where: {
                    id: commentId,
                    authorId: userId,
                }
            })

            return comment
        } catch (error) {
            throw new Error(`Failed to find comment ${(error as Error).message}`)
        }
    }
}
