import { NextFunction, Request, Response } from 'express'
import { AsyncHandler } from '../utils/AsyncHandler'
import { ProtectedRequest } from '../types/app-request'
import { User } from '@prisma/client'
import { ApiError } from '../utils/ApiError'
import responseMessage from '../constant/responseMessage'
import CommentService from '../services/comment.service'
import { ApiResponse } from '../utils/ApiResponse'

const commentServices = new CommentService()

export const addComment = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const postId: string = req.params?.postId
    
    const user = (req as ProtectedRequest)?.user as User | undefined


    if (!user || typeof user === 'undefined') {
        return ApiError(new Error(responseMessage.UNAUTHORIZED), req, next, 401)
    }

    const userId: string = (user as unknown as User)?.id
    const { body } = req as { body: { content: string } }
    

    if (!body) {
        return ApiError(new Error(responseMessage.MISSING_BODY), req, next, 400)
    }

    try {
        await commentServices.addCommentService(req, next, postId, userId, body?.content)

        return ApiResponse(req, res, 201, 'Comment added successfully')
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(responseMessage.METHOD_FAILED('add comment')), req, next, 500)
    }
})

export const editComment = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const postId: string = req.params?.postId
    const commentId: string = req.params?.commentId
    // console.log('comment-id',commentId);
    // console.log('post-id',postId);
    
    const user = req.user as User | undefined

    if (!user || user === undefined) {
        return ApiError(new Error(responseMessage.UNAUTHORIZED), req, next, 401)
    }
    const userId: string = user?.id
    const { body } = req as { body: { content: string } }

    if (!body) {
        return ApiError(new Error(responseMessage.MISSING_BODY), req, next, 400)
    }

    try {
        await commentServices.updateCommentService(req, next, postId, commentId, userId, body.content)

        return ApiResponse(req, res, 200, 'Comment updated successfully')
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(responseMessage.METHOD_FAILED('edit comment')), req, next, 500)
    }
})

export const removeComment = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const postId: string = req.params?.postId
    const commentId: string = req.params?.commentId
    const user = req?.user as User | undefined

    if (!user || typeof user === 'undefined') {
        return ApiError(new Error(responseMessage.UNAUTHORIZED), req, next, 401)
    }

    const userId: string = (user as unknown as User)?.id

    try {
        await commentServices.removeCommentService(req, next, postId, commentId, userId)

        return ApiResponse(req, res, 200, 'Comment deleted successfully')
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(responseMessage.METHOD_FAILED('delete comment')), req, next, 500)
    }
})

export const getCommentsByPost = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const postId: string = req.params?.postId
    const pageNumber: number = parseInt(req.query?.page as string) || 1
    const limit: number = parseInt(req.query?.limit as string) || 5

    try {
        const comments = await commentServices.getCommentsByPostService(req, next, pageNumber, limit, postId)

        if (!comments) {
            return ApiError(new Error(responseMessage.NOT_FOUND('comments')), req, next, 404)
        }

        return ApiResponse(req, res, 200, 'Comments fetched successfully', comments)
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(responseMessage.METHOD_FAILED('get comments')), req, next, 500)
    }
})

export const getCommentById = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const postId: string = req.params?.postId
    const commentId: string = req.params?.commentId

    try {
        const comment = await commentServices.getCommentByIdService(req, next, postId, commentId)

        if (!comment) {
            return ApiError(new Error(responseMessage.NOT_FOUND('comment')), req, next, 404)
        }

        return ApiResponse(req, res, 200, 'Comment fetched successfully', comment)
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(responseMessage.METHOD_FAILED('get comment')), req, next, 500)
    }
})

export const createReplyToComment = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const commentId: string = req.params?.commentId
    const user = (req as ProtectedRequest)?.user as User | undefined

    if (!user || user === undefined) {
        return ApiError(new Error(responseMessage.UNAUTHORIZED), req, next, 401)
    }

    const userId: string = (user as unknown as User)?.id

    const { body } = req as { body: { comment: string } }

    if (!body) {
        return ApiError(new Error(responseMessage.MISSING_BODY), req, next, 400)
    }

    try {
        await commentServices.addReplyToCommentService(req, next, commentId, userId, body.comment)

        return ApiResponse(req, res, 201, 'Reply added successfully')
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(responseMessage.METHOD_FAILED('add comment')), req, next, 500)
    }
})

export const getRepliesByCommentId = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const commentId: string = req.params?.commentId
    const pageNumber: number = parseInt(req.query?.page as string) || 1
    const limit: number = parseInt(req.query?.limit as string) || 5

    try {
        const commentReply = await commentServices.getRepliesByCommentIdService(req, next, commentId, pageNumber, limit)

        if (!commentReply) {
            return ApiError(new Error(responseMessage.NOT_FOUND('replies')), req, next, 404)
        }

        return ApiResponse(req, res, 200, 'Replies fetched successfully', commentReply)
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(responseMessage.METHOD_FAILED('get replies')), req, next, 500)
    }
})

export const getReplyById = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const commentId: string = req.params?.commentId
    const replyId: string = req.params?.replyId

    try {
        const reply = await commentServices.getReplyByIdService(req, next, commentId, replyId)

        if (!reply) {
            return ApiError(new Error(responseMessage.NOT_FOUND('reply')), req, next, 404)
        }

        return ApiResponse(req, res, 200, 'Reply fetched successfully', reply)
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(responseMessage.METHOD_FAILED('get reply')), req, next, 500)
    }
})

export const removeReply = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const commentId: string = req.params?.commentId
    const replyId: string = req.params?.replyId

    try {
        await commentServices.removeReplyService(req, next, commentId, replyId)

        return ApiResponse(req, res, 200, 'Reply deleted successfully')
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(responseMessage.METHOD_FAILED('delete reply')), req, next, 500)
    }
})
