import { NextFunction, Response } from 'express'
import { AsyncHandler } from '../../../utils/AsyncHandler'
import { ApiError } from '../../../utils/ApiError'
import responseMessage from '../../../constant/responseMessage'
import { ApiResponse } from '../../../utils/ApiResponse'
import { ProtectedRequest } from '../../../types/app-request'

const { INTERNAL_SERVICE, SUCCESS } = responseMessage

export const userPreference = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    try {
        await Promise.resolve()
        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Current user get successfully').message, true)
    } catch (error) {
        return ApiError(new Error(INTERNAL_SERVICE((error as Error)?.message).message), req, next, INTERNAL_SERVICE().code)
    }
})

export const updateUserPreference = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    try {
        await Promise.resolve()
        return ApiResponse(req, res, SUCCESS().code, SUCCESS('User preference updated successfully').message, true)
    } catch (error) {
        return ApiError(new Error(INTERNAL_SERVICE((error as Error)?.message).message), req, next, INTERNAL_SERVICE().code)
    }
})

export const userThemePreference = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    try {
        await Promise.resolve()
        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Current user theme preference get successfully').message, true)
    } catch (error) {
        return ApiError(new Error(INTERNAL_SERVICE((error as Error)?.message).message), req, next, INTERNAL_SERVICE().code)
    }
})

export const updateUserThemePreference = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    try {
        await Promise.resolve()
        return ApiResponse(req, res, SUCCESS().code, SUCCESS('User theme preference updated successfully').message, true)
    } catch (error) {
        return ApiError(new Error(INTERNAL_SERVICE((error as Error)?.message).message), req, next, INTERNAL_SERVICE().code)
    }
})

export const userSettingsPreference = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    try {
        await Promise.resolve()
        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Current user settings preference get successfully').message, true)
    } catch (error) {
        return ApiError(new Error(INTERNAL_SERVICE((error as Error)?.message).message), req, next, INTERNAL_SERVICE().code)
    }
})

export const updateUserSettingsPreference = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    try {
        await Promise.resolve()
        return ApiResponse(req, res, SUCCESS().code, SUCCESS('User settings preference updated successfully').message, true)
    } catch (error) {
        return ApiError(new Error(INTERNAL_SERVICE((error as Error)?.message).message), req, next, INTERNAL_SERVICE().code)
    }
}) 


