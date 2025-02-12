import { NextFunction, Response } from 'express'
import { AsyncHandler } from '../../../utils/AsyncHandler'
import { ApiError } from '../../../utils/ApiError'
import responseMessage from '../../../constant/responseMessage'
import { ApiResponse } from '../../../utils/ApiResponse'
import { ProtectedRequest } from '../../../types/app-request'

const { INTERNAL_SERVICE, SUCCESS } = responseMessage

export const userActivity = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    try {
        await Promise.resolve()
        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Current user get successfully').message, true)
    } catch (error) {
        return ApiError(new Error(INTERNAL_SERVICE((error as Error)?.message).message), req, next, INTERNAL_SERVICE().code)
    }
})

export const readingHistory = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    try {
        await Promise.resolve()
        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Reading history get successfully').message, true)
    } catch (error) {
        return ApiError(new Error(INTERNAL_SERVICE((error as Error)?.message).message), req, next, INTERNAL_SERVICE().code)
    }
})

export const clearReadingHistory = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    try {
        await Promise.resolve()
        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Reading history cleared successfully').message, true)
    } catch (error) {
        return ApiError(new Error(INTERNAL_SERVICE((error as Error)?.message).message), req, next, INTERNAL_SERVICE().code)
    }
})

export const getWritingHistory = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    try {
        await Promise.resolve()
        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Writing history get successfully').message, true)
    } catch (error) {
        return ApiError(new Error(INTERNAL_SERVICE((error as Error)?.message).message), req, next, INTERNAL_SERVICE().code)
    }
})

export const clearWritingHistory = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    try {
        await Promise.resolve()
        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Writing history cleared successfully').message, true)
    } catch (error) {
        return ApiError(new Error(INTERNAL_SERVICE((error as Error)?.message).message), req, next, INTERNAL_SERVICE().code)
    }
})
