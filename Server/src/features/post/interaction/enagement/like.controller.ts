import { NextFunction, Response } from 'express'
import { AsyncHandler } from '../../../../utils/AsyncHandler'
import { ProtectedRequest } from '../../../../types/app-request'
import { User } from '../../../../Lib/Models/User'
import { ApiError } from '../../../../utils/ApiError'
import responseMessage from '../../../../constant/responseMessage'
import { ApiResponse } from '../../../../utils/ApiResponse'
import LikeServices from './like.service'

// Constants from responseMessage
const { METHOD_FAILED, SUCCESS, UNAUTHORIZED, NOT_FOUND, INTERNAL_SERVICE } = responseMessage

// LikeServices instance
const likeServices = new LikeServices()

/* 
The `likeStatusOfPost` function is an asynchronous handler that handles the logic for checking the
like status of a post. Here's a breakdown of what the function does: 
- It extracts the user ID from the request object.
- It extracts the post ID from the request parameters.
- It calls the `checkLikeStatusforPostService` method from the `likeServices` instance to check the like status for the post.
- It returns a success response with the like status if the operation is successful.
*/

export const likeStatusOfPost = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    // Add like logic
    const userId = (req.user as User)?.id

    if (!userId) {
        return ApiError(new Error(UNAUTHORIZED.message), req, next, UNAUTHORIZED.code)
    }
    const postId = req.params?.postId

    if (!postId) {
        return ApiError(new Error(NOT_FOUND('Post id does not exist or not found').message), req, next, NOT_FOUND().code)
    }

    try {
        const status = await likeServices.checkLikeStatusService(req, next, { userId, postId })

        if (status === undefined) {
            return ApiError(new Error(METHOD_FAILED('like status of the post').message), req, next, METHOD_FAILED().code)
        }

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('like status of the post').message, status)
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(INTERNAL_SERVICE('like status post').message), req, next, INTERNAL_SERVICE().code)
    }
})

export const toggleLike = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    // Edit like logic
    try {
        await Promise.resolve()
        res.status(200).json({ message: 'unLike successfully' })
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(INTERNAL_SERVICE('toggleLike').message), req, next, INTERNAL_SERVICE().code)
    }
})
