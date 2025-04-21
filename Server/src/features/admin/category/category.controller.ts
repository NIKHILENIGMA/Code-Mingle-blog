import { ProtectedRequest } from '../../../types/extended/app-request'
import { ApiError } from '../../../utils/ApiError'
import { AsyncHandler } from '../../../utils/AsyncHandler'
import { NextFunction, Response } from 'express'
import { responseMessage } from '../../../constant'
import { ApiResponse } from '../../../utils/ApiResponse'
import CategoryService from './category.service'
import { User } from '../../../Lib/Models/User'
const { INTERNAL_SERVICE, SUCCESS } = responseMessage

const categoryService = new CategoryService()

/**
 * Step 1: check if the category name is already in the database
 * Step 2: If the category name already exists in the database, then return an error message
 * Step 3: If the category name does not exist in the database, then create a new category
 * Step 4: Return a success message
 */

export const createCategory = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {

    // Get the user id from the request
    const userId: string = (req.user as User)?.id 
    // If the user id does not exist, then return an error
    if (!userId) {
        return ApiError(new Error('Unauthorized user'), req, next, 401)
    }

    try {
        // Check input value are valid string
        const { name, description } = req.body as { name: string; description?: string }

        // Check if the name is empty
        if (!name) {
            return ApiError(new Error('Name is required'), req, next, 400)
        }

        // Check if the description is empty
        if (!description) {
            return ApiError(new Error('Description is required'), req, next, 400)
        }

        // Check if the category name already exists in the database
        const isCategoryExist = await categoryService.categoryExist(req, next, { name })

        // If the category name already exists in the database, then return an error message
        if (isCategoryExist) {
            return ApiError(new Error('Category already exist'), req, next, 400)
        }

        // If the category name does not exist in the database, then create a new category
        await categoryService.createCategory(req, next, { name, description })

        return ApiResponse(req, res, SUCCESS().code, SUCCESS(`Category name: ${name}, created successfully!`).message)
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
    const categoryId: number = parseInt(req.params.id)
    // Get the user id from the request
    const userId = req.user?.id as string
    // If the user id does not exist, then return an error message
    if (!userId) {
        return ApiError(new Error('Unauthorized user'), req, next, 401)
    }

    // Get the name from the request body
    const { name, description } = req.body as { name: string; description?: string }

    try {
        // Check category exist by id
        const isCategoryExist: boolean | void = await categoryService.checkCategoryById(req, next, { id: categoryId })

        // If the category does not exist, then return an error message
        if (!isCategoryExist) {
            return ApiError(new Error('Category does not exist'), req, next, 400)
        }

        // Update the category details
        await categoryService.updateCategory(req, next, { id: categoryId }, { name, description })

        // Return a success message
        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Category details updated successfully!').message)
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
    const categoryId: number = parseInt(req.params.id)

    try {
        // Check category exist by id
        const isCategoryExist = await categoryService.checkCategoryById(req, next, { id: categoryId })

        // If the category does not exist, then return an error message
        if (!isCategoryExist) {
            return ApiError(new Error('Category does not exist'), req, next, 400)
        }

        // Delete the category
        await categoryService.deleteCategory(req, next, { id: categoryId })

        // Return a success message
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
        // Get all categories
        const categories = await categoryService.getCategories(req, next)

        // Return a success message
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
