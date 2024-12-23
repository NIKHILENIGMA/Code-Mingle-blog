import { NextFunction, Request } from 'express'
import { ApiError } from '../utils/ApiError'
import responseMessage from '../constant/responseMessage'
import prisma from '../Lib/database/PrismaConnection'
import { Comment } from '@prisma/client'
import { RepositoryFactory } from '../Lib/Repositories'
import { ICommentRepository } from '../Lib/Repositories/Interfaces/ICommentRepository'
import { IReplyRepository } from '../Lib/Repositories/Interfaces/IReplyRepository'

interface AddComment {
    postId: string
    authorId: string
    content: string
}

interface AddReplyComment {
    commentId: string
    authorId: string
    content: string
}

export default class CommentService {
    private commentRepository: ICommentRepository
    private replyRepository: IReplyRepository
    constructor() {
        this.commentRepository = RepositoryFactory.CommentRepository()
        this.replyRepository = RepositoryFactory.ReplyRepository()
    }

    public async addCommentService(req: Request, next: NextFunction, postId: string, userId: string, content: string): Promise<Comment | void> {
        // Add comment logic
        const payload: AddComment = {
            postId,
            authorId: userId,
            content
        }
        try {
            return await this.commentRepository.create(payload)
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(responseMessage.METHOD_FAILED('add comment')), req, next, 500)
        }
    }

    public async updateCommentService(
        req: Request,
        next: NextFunction,
        postId: string,
        commentId: string,
        userId: string,
        content: string
    ): Promise<void> {
        // Edit comment logic
        try {
            const comment = await this.checkCommentExistence(req, next, commentId, postId)

            if (!comment) {
                return ApiError(new Error(responseMessage.NOT_FOUND('comment')), req, next, 404)
            }

            if (comment.authorId !== userId) {
                return ApiError(new Error(responseMessage.UNAUTHORIZED), req, next, 401)
            }

            const payload = { content }

            await this.commentRepository.update(commentId, payload)
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(responseMessage.METHOD_FAILED('edit comment')), req, next, 500)
        }
    }

    public async removeCommentService(req: Request, next: NextFunction, postId: string, commentId: string, userId: string): Promise<void> {
        // Remove comment logic
        try {
            const comment = await this.checkCommentExistence(req, next, commentId, postId)

            if (!comment) {
                return ApiError(new Error(responseMessage.NOT_FOUND('comment')), req, next, 404)
            }

            if (comment.authorId !== userId) {
                return ApiError(new Error(responseMessage.UNAUTHORIZED), req, next, 401)
            }

            await prisma.comment.delete({
                where: {
                    id: commentId
                }
            })
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(responseMessage.METHOD_FAILED('remove comment')), req, next, 500)
        }
    }

    public async getCommentsByPostService(
        req: Request,
        next: NextFunction,
        pageNumber: number,
        limit: number,
        postId: string
    ): Promise<Comment[] | void> {
        const skip = (pageNumber - 1) * limit
        try {
            const comments = await prisma.comment.findMany({
                where: {
                    postId
                },
                skip: skip,
                take: limit,
                orderBy: {
                    createdAt: 'desc'
                }
            })

            return comments
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(responseMessage.METHOD_FAILED('get comments')), req, next, 500)
        }
    }

    public async getCommentByIdService(req: Request, next: NextFunction, postId: string, commentId: string) {
        try {
            const comment = await prisma.comment.findUnique({
                where: {
                    id: commentId,
                    postId
                }
            })

            if (!comment) {
                return ApiError(new Error(responseMessage.NOT_FOUND('comment')), req, next, 404)
            }

            return comment
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(responseMessage.METHOD_FAILED('get comment')), req, next, 500)
        }
    }

    public async addReplyToCommentService(req: Request, next: NextFunction, commentId: string, userId: string, content: string) {
        try {
            const parentContent = await this.checkParentCommentExist(req, next, userId, commentId)

            if (!parentContent) {
                return ApiError(new Error(responseMessage.NOT_FOUND('comment')), req, next, 404)
            }

            const payload: AddReplyComment = {
                commentId: commentId,
                authorId: userId,
                content
            }

            await prisma.reply.create({
                data: payload
            })
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(responseMessage.METHOD_FAILED('add reply to comment')), req, next, 500)
        }
    }

    public async getRepliesByCommentIdService(req: Request, next: NextFunction, commentId: string) {
        try {
            const comment = await this.commentRepository.findCommentById(commentId)

            if (!comment) {
                return ApiError(new Error(responseMessage.NOT_FOUND('comment')), req, next, 404)
            }

            const replies = await this.replyRepository.getRepliesByCommentId(comment.id)

            return replies
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(responseMessage.METHOD_FAILED('get replies by comment')), req, next, 500)
        }
    }

    public async getReplyByIdService(req: Request, next: NextFunction, commentId: string, replyId: string) {
        try {
            const reply = await this.replyRepository.getReplyById(replyId, commentId)

            if (!reply) {
                return ApiError(new Error(responseMessage.NOT_FOUND('reply')), req, next, 404)
            }

            return reply
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(responseMessage.METHOD_FAILED('get reply by id')), req, next, 500)
        }
    }

    public async removeReplyService(req: Request, next: NextFunction, commentId: string, replyId: string) {
        try {
            const reply = await this.replyRepository.getReplyById(replyId, commentId)

            if (!reply) {
                return ApiError(new Error(responseMessage.NOT_FOUND('reply')), req, next, 404)
            }

            await this.replyRepository.delete(replyId)
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(responseMessage.METHOD_FAILED('remove reply')), req, next, 500)
        }
    }

    private async checkCommentExistence(req: Request, next: NextFunction, commentId: string, postId: string) {
        try {
            const existedComment = await this.commentRepository.findCommentByCommentIdAndPostId(postId, commentId)
            // console.log('exist comment: ', existedComment)

            return existedComment
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(responseMessage.METHOD_FAILED('check comment existence')), req, next, 500)
        }
    }

    private async checkParentCommentExist(req: Request, next: NextFunction, userId: string, commentId: string) {
        try {
            const parentComment = await this.commentRepository.findParentCommentByUserAndCommentId(userId, commentId)
            // console.log('exist comment: ', existedComment)

            return parentComment
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(responseMessage.METHOD_FAILED('check comment existence')), req, next, 500)
        }
    }

}
