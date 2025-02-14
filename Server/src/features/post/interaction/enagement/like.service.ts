import { ApiError } from '../../../../utils/ApiError'
import { NextFunction, Request } from 'express'
import responseMessage from '../../../../constant/responseMessage'
import prisma from '../../../../config/prisma.config'

const { METHOD_FAILED } = responseMessage

type LikeWhere = {
    userId: string
    postId?: string
    commentId?: string
    replyId?: string
}

export default class LikeServices {
    constructor() {}

    /**
     * The function `checkLikeStatusService` asynchronously checks the like status of a post using
     * Prisma and returns a boolean value or throws an error.
     * 
     * @param {Request} req - The `req` parameter in the `checkLikeStatusService` function is typically
     * used to represent the incoming request object in an Express.js application. It contains
     * information about the HTTP request being made, such as headers, parameters, and body data. This
     * parameter allows the function to access and interact with the
     * request object and its properties.
     * 
     * @param {NextFunction} next - The `next` parameter in the `checkLikeStatusService` function is a
     * reference to the next middleware function in the Express middleware stack. It is a callback
     * function that is called when the current middleware function completes its execution. The `next`
     * function is used to pass control to the next middleware function in the stack.
     * 
     * @param {LikeWhere} where - The `where` parameter in the `checkLikeStatusService` function is
     * used to specify the conditions for finding a like record in the database. It is passed to the
     * `prisma.like.findFirst` method to determine which like record to retrieve based on the specified
     * conditions. The `where` parameter
     * 
     * @returns The `checkLikeStatusService` function returns a Promise that resolves to a boolean
     * value (`true` or `false`) indicating whether a like status exists based on the provided `where`
     * condition. If an error occurs during the process, an `ApiError` object is returned.
     */
    public async checkLikeStatusService(req: Request, next: NextFunction, where: LikeWhere): Promise<boolean | void> {
        try {
            const status = await prisma.like.findFirst({
                where
            })

            return status ? true : false
        } catch (error) {
            return ApiError(
                error instanceof Error ? error : new Error(METHOD_FAILED('like status of the post').message),
                req,
                next,
                METHOD_FAILED().code
            )
        }
    }
}
