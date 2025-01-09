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

const { METHOD_FAILED, NOT_FOUND, UNAUTHORIZED } = responseMessage

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
            return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('add comment').message), req, next, METHOD_FAILED().code)
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
                return ApiError(new Error(NOT_FOUND('comment').message), req, next, NOT_FOUND().code)
            }

            if (comment.authorId !== userId) {
                return ApiError(new Error(UNAUTHORIZED.message), req, next, UNAUTHORIZED.code)
            }

            const payload = { content }

            await this.commentRepository.update({id: commentId}, payload)
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('edit comment').message), req, next, METHOD_FAILED().code)
        }
    }

    public async removeCommentService(req: Request, next: NextFunction, postId: string, commentId: string, userId: string): Promise<void> {
        // Remove comment logic
        try {
            const comment = await this.checkCommentExistence(req, next, commentId, postId)

            if (!comment) {
                return ApiError(new Error(NOT_FOUND('comment').message), req, next, NOT_FOUND().code)
            }

            if (comment.authorId !== userId) {
                return ApiError(new Error(UNAUTHORIZED.message), req, next, UNAUTHORIZED.code)
            }

            await prisma.comment.delete({
                where: {
                    id: commentId
                }
            })
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('remove comment').message), req, next, METHOD_FAILED().code)
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
            return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('get comments').message), req, next, METHOD_FAILED().code)
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
                return ApiError(new Error(NOT_FOUND('comment').message), req, next, NOT_FOUND().code)
            }

            return comment
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('get comment').message), req, next, METHOD_FAILED().code)
        }
    }

    public async addReplyToCommentService(req: Request, next: NextFunction, commentId: string, userId: string, content: string) {
        try {
            const parentContent = await this.checkParentCommentExist(req, next, userId, commentId)

            if (!parentContent) {
                return ApiError(new Error(NOT_FOUND('comment').message), req, next, NOT_FOUND().code)
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
            return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('add reply to comment').message), req, next, METHOD_FAILED().code)
        }
    }

    public async getRepliesByCommentIdService(req: Request, next: NextFunction, commentId: string, numberOfPage: number, limit: number) {
        try {
            const comment = await this.commentRepository.findCommentById(commentId)

            if (!comment) {
                return ApiError(new Error(NOT_FOUND('comment').message), req, next, NOT_FOUND().code)
            }

            const replies = await this.replyRepository.getRepliesByCommentId(comment.id, numberOfPage, limit)

            return replies
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('get replies by comment').message), req, next, METHOD_FAILED().code)
        }
    }

    public async getReplyByIdService(req: Request, next: NextFunction, commentId: string, replyId: string) {
        try {
            const reply = await this.replyRepository.getReplyById(replyId, commentId)

            if (!reply) {
                return ApiError(new Error(NOT_FOUND('reply').message), req, next, NOT_FOUND().code)
            }

            return reply
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('get reply by id').message), req, next, METHOD_FAILED().code)
        }
    }

    public async removeReplyService(req: Request, next: NextFunction, commentId: string, replyId: string) {
        try {
            const reply = await this.replyRepository.getReplyById(replyId, commentId)

            if (!reply) {
                return ApiError(new Error(NOT_FOUND('reply').message), req, next, NOT_FOUND().code)
            }

            await this.replyRepository.delete(replyId)
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('remove reply').message), req, next, METHOD_FAILED().code)
        }
    }

    private async checkCommentExistence(req: Request, next: NextFunction, commentId: string, postId: string) {
        try {
            const existedComment = await this.commentRepository.findCommentByCommentIdAndPostId(postId, commentId)
            // console.log('exist comment: ', existedComment)

            return existedComment
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('check comment existence').message), req, next, METHOD_FAILED().code)
        }
    }

    private async checkParentCommentExist(req: Request, next: NextFunction, userId: string, commentId: string) {
        try {
            const parentComment = await this.commentRepository.findParentCommentByUserAndCommentId(userId, commentId)
            // console.log('exist comment: ', existedComment)

            return parentComment
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('check comment existence').message), req, next, METHOD_FAILED().code)
        }
    }

}
