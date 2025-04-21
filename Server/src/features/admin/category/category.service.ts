import { ApiError } from '../../../utils/ApiError'
import { NextFunction, Request } from 'express'
import { responseMessage } from '../../../constant'
import prisma from '@/config/prisma.config'
import { CategoryDTO, CategoryWhere } from './category.types'

const { METHOD_FAILED, NOT_FOUND } = responseMessage

export default class CategoryService {
    constructor() {}

    public async categoryExist(req: Request, next: NextFunction, { name }: { name: string }): Promise<boolean | void> {
        try {
            const category = await prisma.category.findFirst({
                where: {
                    name
                }
            })

            return category ? true : false
        } catch (error) {
            return ApiError(
                error instanceof Error ? error : new Error(METHOD_FAILED('fetch published post').message),
                req,
                next,
                METHOD_FAILED().code
            )
        }
    }

    public async checkCategoryById(req: Request, next: NextFunction, { id }: { id: number }): Promise<boolean | void> {
        try {
            const category = await prisma.category.findFirst({
                where: {
                    id
                }
            })

            return category ? true : false
        } catch (error) {
            return ApiError(
                error instanceof Error ? error : new Error(METHOD_FAILED('fetch published post').message),
                req,
                next,
                METHOD_FAILED().code
            )
        }
    }

    public async createCategory(req: Request, next: NextFunction, { name, description }: { name: string; description: string }): Promise<void> {
        try {
            await prisma.category.create({
                data: {
                    name,
                    description
                }
            })
        } catch (error) {
            return ApiError(
                error instanceof Error ? error : new Error(METHOD_FAILED('fetch published post').message),
                req,
                next,
                METHOD_FAILED().code
            )
        }
    }

    public async updateCategory(
        req: Request,
        next: NextFunction,
        where: { id: number },
        payload: { name: string; description?: string }
    ): Promise<void> {
        try {
            await prisma.category.update({
                where,
                data: payload
            })
        } catch (error) {
            return ApiError(
                error instanceof Error ? error : new Error(METHOD_FAILED('fetch published post').message),
                req,
                next,
                METHOD_FAILED().code
            )
        }
    }

    public async deleteCategory(req: Request, next: NextFunction, where: CategoryWhere): Promise<void> {
        try {
            const category = await prisma.category.findFirst({
                where
            })

            if (!category) {
                return ApiError(new Error(NOT_FOUND('category').message), req, next, NOT_FOUND().code)
            }

            await prisma.category.delete({
                where
            })
        } catch (error) {
            return ApiError(
                error instanceof Error ? error : new Error(METHOD_FAILED('fetch published post').message),
                req,
                next,
                METHOD_FAILED().code
            )
        }
    }

    public async getCategory(req: Request, next: NextFunction, where: CategoryWhere): Promise<CategoryDTO | void> {
        try {
            const category = await prisma.category.findFirst({
                where
            })

            if (!category) {
                return ApiError(new Error(NOT_FOUND('category').message), req, next, NOT_FOUND().code)
            }

            return category
        } catch (error) {
            return ApiError(
                error instanceof Error ? error : new Error(METHOD_FAILED('fetch published post').message),
                req,
                next,
                METHOD_FAILED().code
            )
        }
    }

    public async getCategories(req: Request, next: NextFunction): Promise<CategoryDTO[] | void> {
        try {
            return await prisma.category.findMany()
        } catch (error) {
            return ApiError(
                error instanceof Error ? error : new Error(METHOD_FAILED('fetch published post').message),
                req,
                next,
                METHOD_FAILED().code
            )
        }
    }
}
