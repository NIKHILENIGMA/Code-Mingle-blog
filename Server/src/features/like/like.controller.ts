import { Request, Response } from 'express'
import { AsyncHandler } from '@/utils/AsyncHandler'
import { ApiResponse } from '@/utils/ApiResponse'
import { NotFoundError, UnauthorizedError } from '@/utils/Errors'



export const likeStatusOfPost = AsyncHandler(async (req: Request, res: Response) => {
    // Add like logic
    const userId: string | undefined = req.user?.id
    if (!userId && typeof userId === 'undefined') {
        throw new UnauthorizedError('User is not authorized to like this post')
    }
    const postId = req.params?.postId
    if (!postId) {
        throw new NotFoundError('Post ID is required to check like status')
    }

    await Promise.all([]) // Add any necessary validations or checks here
    ApiResponse(req, res, 200, 'likeStatusOfPost', {
        postId,
        userId
    })
})

export const toggleLike = AsyncHandler(async (req: Request, res: Response) => {
    // Edit like logic
    await Promise.resolve()
    ApiResponse(req, res, 200, 'toggleLike', null)
})
