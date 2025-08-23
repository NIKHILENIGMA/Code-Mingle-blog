import { Request, Response } from 'express'
import { AsyncHandler } from '@/utils/AsyncHandler'
import { ApiResponse } from '@/utils/ApiResponse'
import { UnauthorizedError } from '@/utils/Errors'


// export const addComment = AsyncHandler(async (req: Request, res: Response) => {
//     const postId: string = req.params?.postId
//     const userId: string | undefined = req.user?.id
//     if (!userId || typeof userId === 'undefined') {
//         throw new UnauthorizedError('User is not authorized to add a comment')
        
//     }

//     await Promise.all([]) // Add any necessary validations or checks here

    
//     ApiResponse(req, res, 201, 'Comment added successfully', {
//         postId,
//         userId,
//     })
// })

// export const editComment = AsyncHandler(async (req: Request, res: Response) => {
//     const postId: string = req.params?.postId
//     const commentId: string = req.params?.commentId
//     const userId: string | undefined = req?.user?.id 
//     if (!userId || typeof userId === 'undefined') {
//         throw new UnauthorizedError('User is not authorized to edit this comment')
//     }

//     await Promise.all([]) // Add any necessary validations or checks here

//     ApiResponse(req, res, 200, 'Comment edited successfully', {
//         postId,
//         commentId,
//         userId
//     })

// })

// export const removeComment = AsyncHandler(async (req: Request, res: Response) => {
//     const postId: string = req.params?.postId
//     const commentId: string = req.params?.commentId
//     const userId: string | undefined = req?.user?.id
//     if (!userId || typeof userId === 'undefined') {
//         throw new UnauthorizedError('User is not authorized to delete this comment')
//     }

//     await Promise.all([]) // Add any necessary validations or checks here

//     ApiResponse(req, res, 200, 'Comment deleted successfully', {
//         postId,
//         commentId,
//         userId
//     })
// })

// export const getCommentsByPost = AsyncHandler(async (req: Request, res: Response) => {
//     const postId: string = req.params?.postId
//     const pageNumber: number = parseInt(req.query?.page as string) || 1
//     const limit: number = parseInt(req.query?.limit as string) || 5

//     await Promise.all([]) // Add any necessary validations or checks here
//     ApiResponse(req, res, 200, 'Comments fetched successfully', {
//         postId,
//         pageNumber,
//         limit
//     })
// })

// export const getCommentById = AsyncHandler(async (req: Request, res: Response) => {
//     const postId: string = req.params?.postId
//     const commentId: string = req.params?.commentId

//     await Promise.all([]) // Add any necessary validations or checks here
//     ApiResponse(req, res, 200, 'Comment fetched successfully', {
//         postId,
//         commentId
//     })
// })

// export const createReplyToComment = AsyncHandler(async (req: Request, res: Response) => {
//     const commentId: string = req.params?.commentId
//     const userId: string | undefined = req.user?.id
//     if (!userId || typeof userId === 'undefined') {
//         throw new UnauthorizedError('User is not authorized to reply to this comment')
//     }

//     await Promise.all([]) // Add any necessary validations or checks here3
//     ApiResponse(req, res, 201, 'Reply created successfully', {
//         commentId,
//         userId
//     })
// })

// export const getRepliesByCommentId = AsyncHandler(async (req: Request, res: Response) => {
//     const commentId: string = req.params?.commentId
//     const pageNumber: number = parseInt(req.query?.page as string) || 1
//     const limit: number = parseInt(req.query?.limit as string) || 5

//     await Promise.all([]) // Add any necessary validations or checks here
//     ApiResponse(req, res, 200, 'Replies fetched successfully', {
//         commentId,
//         pageNumber,
//         limit
//     })
// })

// export const getReplyById = AsyncHandler(async (req: Request, res: Response) => {
//     const commentId: string = req.params?.commentId
//     const replyId: string = req.params?.replyId

//     await Promise.all([]) // Add any necessary validations or checks here
//     ApiResponse(req, res, 200, 'Reply fetched successfully', {
//         commentId,
//         replyId
//     })
// })

// export const removeReply = AsyncHandler(async (req: Request, res: Response) => {
//     const commentId: string = req.params?.commentId
//     const replyId: string = req.params?.replyId
//     const userId = req?.user?.id
//     if (!userId || typeof userId === 'undefined') {
//         throw new UnauthorizedError('User is not authorized to delete this reply')
//     }
//     await Promise.all([]) // Add any necessary validations or checks here

//     ApiResponse(req, res, 200, 'Reply deleted successfully', {
//         commentId,
//         replyId,
//         userId
//     })

// })
