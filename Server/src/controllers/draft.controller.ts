import { NextFunction, Request, Response } from 'express'
import { AsyncHandler } from '../utils/AsyncHandler'
import { ISaveDraftRequest, ProtectedRequest } from '../types/app-request'
import prisma from '../Lib/database/PrismaConnection'
import { User } from '../Lib/Models/User'
import { PostStatus } from '@prisma/client'
import { ApiResponse } from '../utils/ApiResponse'
import { ApiError } from '../utils/ApiError'
import responseMessage from '../constant/responseMessage'
import { BlogDraft } from '../Lib/Models/Blog'
import DraftService from '../services/draft.service'

const draftService = new DraftService()

export const createDraft = AsyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Get draft
    try {
        const user = (req as ProtectedRequest)?.user as User | undefined

        if (!user) {
            return ApiError(new Error(responseMessage.MISSING_USER), req, next, 400)
        }

        const userId: string = (user as unknown as User)?.id

        const draftId = await draftService.newDraftService(req, next, userId)

        return ApiResponse(req, res, 200, 'Draft created successfully', { draftId: draftId })
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(responseMessage.METHOD_FAILED('create  draft')), req, next, 500)
    }
})

export const saveDraft = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // Save draft
    const draftId = req.params.id

    const user = req as ProtectedRequest
    const userId: string = (user as unknown as User).id

    const { body } = req as ISaveDraftRequest

    if (!draftId) {
        return ApiError(new Error(responseMessage.MISSING_ID('draft')), req, next, 400)
    }

    if (!body) {
        return ApiError(new Error(responseMessage.MISSING_BODY), req, next, 400)
    }

    try {
        const draftSaved = await draftService.saveDraftService(req, next, draftId, userId, body)

        if (!draftSaved) {
            return ApiError(new Error(responseMessage.BAD_REQUEST('draft not saved')), req, next, 400)
        }

        return ApiResponse(req, res, 200, draftSaved)
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(responseMessage.METHOD_FAILED('save draft')), req, next, 500)
    }
})

export const removeDraft = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const draftId = req.params?.id

    if (!draftId) {
        return ApiError(new Error(responseMessage.MISSING_ID('draft')), req, next, 400)
    }
    const user = req as ProtectedRequest

    if (!user) {
        return ApiError(new Error(responseMessage.MISSING_USER), req, next, 400)
    }

    const userId: string = (user as unknown as User)?.id

    try {
        const removedDraft = await draftService.removeDraftService(req, next, draftId, userId)

        if (!removedDraft) {
            return ApiError(new Error(responseMessage.BAD_REQUEST('draft not removed')), req, next, 400)
        }

        return ApiResponse(req, res, 200, removedDraft)
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(responseMessage.METHOD_FAILED('remove draft')), req, next, 500)
    }
})

export const getDraft = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params?.id

    if (!id) {
        return ApiError(new Error(responseMessage.MISSING_ID('draft')), req, next, 400)
    }

    const user = req as ProtectedRequest

    if (!user) {
        return ApiError(new Error(responseMessage.MISSING_USER), req, next, 400)
    }

    const userId: string = (user as unknown as User)?.id

    try {
        const draft: Partial<BlogDraft> | void = await draftService.getDraftService(req, next, id, userId)

        if (!draft || draft === undefined) {
            return ApiError(new Error(responseMessage.NOT_FOUND('draft')), req, next, 404)
        }

        return ApiResponse(req, res, 200, 'Draft fetched successfully', { draft: draft })
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(responseMessage.METHOD_FAILED('get draft')), req, next, 500)
    }
})

export const listDraft = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // List drafts
    const user = req as ProtectedRequest
    const userId: string = (user as unknown as User).id
    try {
        const getAllDraft = await prisma.post.findMany({
            where: {
                status: PostStatus.DRAFT,
                authorId: userId
            },
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                id: true,
                title: true,
                createdAt: true
            }
        })

        return ApiResponse(req, res, 200, 'Drafts fetched successfully', getAllDraft)
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(responseMessage.METHOD_FAILED('list draft')), req, next, 500)
    }
})
