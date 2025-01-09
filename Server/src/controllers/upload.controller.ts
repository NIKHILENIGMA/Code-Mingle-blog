import { NextFunction, Request, Response } from 'express'
import { AsyncHandler } from '../utils/AsyncHandler'
import { ApiError } from '../utils/ApiError'
import responseMessage from '../constant/responseMessage'
import { ApiResponse } from '../utils/ApiResponse'

const { MISSING_FILE, METHOD_FAILED } = responseMessage

export const uploadMedia = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
        return ApiError(new Error(MISSING_FILE.message), req, next, MISSING_FILE.code)
    }

    try {
        const path: string = req.file?.path

        await new Promise((resolve) => setTimeout(resolve, 1000))

        return ApiResponse(req, res, 200, path)
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('upload image').message), req, next, METHOD_FAILED().code)
    }
})

export const embedMedia = AsyncHandler(async (_: Request, res: Response) => {
    // Save draft
    await new Promise((resolve) => setTimeout(resolve, 1000))
    res.status(200).send('Media embedded successfully')
})

export const deleteMedia = AsyncHandler(async (_: Request, res: Response) => {
    // Save draft
    await new Promise((resolve) => setTimeout(resolve, 1000))
    res.status(200).send('Media deleted successfully')
})
