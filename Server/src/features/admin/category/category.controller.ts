import { ProtectedRequest } from '@/types/app-request'
import { ApiError } from '@/utils/ApiError'
import { AsyncHandler } from '@/utils/AsyncHandler'
import { NextFunction, Response } from 'express'
import { responseMessage } from '@/constant'
import { ApiResponse } from '@/utils/ApiResponse'
import { CreateCategory, UpdateCategory } from './category.types'
import CategoryService from './category.service'

const { INTERNAL_SERVICE, SUCCESS } = responseMessage

const categoryService = new CategoryService()

export const createCategory = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body as CreateCategory
        await categoryService.createCategory(req, next, name)
        return ApiResponse(req, res, SUCCESS().code, SUCCESS('create category').message)
    } catch (error) {
        return ApiError(
            error instanceof Error ? error : new Error(INTERNAL_SERVICE('fetch published post').message),
            req,
            next,
            INTERNAL_SERVICE().code
        )
    }
})

export const updateCategory = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    // Get the category id from the request
    const categoryId = req.params.id

    // Get the name from the request body   
    const { name } = req.body as UpdateCategory
    try {
        await categoryService.updateCategory(req, next, { id: +categoryId }, { name })
        return ApiResponse(req, res, SUCCESS().code, SUCCESS('update category').message)
    } catch (error) {
        return ApiError(
            error instanceof Error ? error : new Error(INTERNAL_SERVICE('fetch published post').message),
            req,
            next,
            INTERNAL_SERVICE().code
        )
    }
})

export const deleteCategory = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    // Get the category id from the request
    const categoryId = req.params.id

    try {
        await categoryService.deleteCategory(req, next, { id: +categoryId })
        return ApiResponse(req, res, SUCCESS().code, SUCCESS('delete category').message)
    } catch (error) {
        return ApiError(
            error instanceof Error ? error : new Error(INTERNAL_SERVICE('fetch published post').message),
            req,
            next,
            INTERNAL_SERVICE().code
        )
    }
})


export const getCategories = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    try {
        const categories = await categoryService.getCategories(req, next)
        return ApiResponse(req, res, SUCCESS().code, SUCCESS('get categories').message, categories)
    } catch (error) {
        return ApiError(
            error instanceof Error ? error : new Error(INTERNAL_SERVICE('fetch published post').message),
            req,
            next,
            INTERNAL_SERVICE().code
        )
    }
})

export const getCategory = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    // Get the category id from the request
    const categoryId = req.params.id

    try {
        const category = await categoryService.getCategory(req, next, { id: +categoryId })
        return ApiResponse(req, res, SUCCESS().code, SUCCESS('get category').message, category)
    } catch (error) {
        return ApiError(
            error instanceof Error ? error : new Error(INTERNAL_SERVICE('fetch published post').message),
            req,
            next,
            INTERNAL_SERVICE().code
        )
    }
})
