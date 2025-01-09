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

const { MISSING_ID, MISSING_USER, METHOD_FAILED, BAD_REQUEST, SUCCESS, NOT_FOUND } = responseMessage

/**
 ** Creates a new draft.
 *
 ** This function is an asynchronous handler that processes the request to create a new draft.
 ** It retrieves the user from the request, validates the user, and then calls the draft service
 ** to create a new draft. The response is sent back with the draft ID if successful.
 *
 */
export const createDraft = AsyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Get draft
    try {
        const user = (req as ProtectedRequest)?.user as User | undefined

        if (!user) {
            return ApiError(new Error(MISSING_USER.message), req, next, MISSING_USER.code)
        }

        const userId: string = (user as unknown as User)?.id

        const draftId = await draftService.newDraftService(req, next, userId)

        return ApiResponse(req, res, 200, 'Draft created successfully', { draftId: draftId })
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('create  draft').message), req, next, METHOD_FAILED().code)
    }
})

/**
 ** Saves a draft with the provided details.
 * 
 ** This function is an asynchronous handler that processes the request to save a draft.
 ** It retrieves the user from the request, validates the user, and then calls the draft service
 ** to save the draft. The response is sent back with the draft details if successful.

 */
export const saveDraft = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // Save draft
    const draftId = req.params.id

    const user = req as ProtectedRequest
    const userId: string = (user as unknown as User).id

    const { body } = req as ISaveDraftRequest

    if (!draftId) {
        return ApiError(new Error(MISSING_ID('draft').message), req, next, MISSING_ID().code)
    }

    if (!body) {
        return ApiError(new Error(responseMessage.MISSING_BODY.message), req, next, responseMessage.MISSING_BODY.code)
    }

    try {
        const draftSaved = await draftService.saveDraftService(req, next, draftId, userId, body)

        if (!draftSaved) {
            return ApiError(new Error(BAD_REQUEST('draft not saved').message), req, next, BAD_REQUEST().code)
        }

        return ApiResponse(req, res, SUCCESS().code, draftSaved)
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('save draft').message), req, next, METHOD_FAILED().code)
    }
})

/**
 ** Removes a draft with the provided ID.
 
 ** This function is an asynchronous handler that processes the request to remove a draft.
 ** It retrieves the user from the request, validates the user, and then calls the draft service
 ** to remove the draft. The response is sent back with the draft details if successful.
 *
 */

export const removeDraft = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const draftId = req.params?.id

    if (!draftId) {
        return ApiError(new Error(MISSING_ID('draft').message), req, next, MISSING_ID().code)
    }
    const user = req as ProtectedRequest

    if (!user) {
        return ApiError(new Error(MISSING_USER.message), req, next, MISSING_USER.code)
    }

    const userId: string = (user as unknown as User)?.id

    try {
        const removedDraft = await draftService.removeDraftService(req, next, draftId, userId)

        if (!removedDraft) {
            return ApiError(new Error(BAD_REQUEST('draft not removed').message), req, next, BAD_REQUEST().code)
        }

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Draft remove successfully').message, removedDraft)
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('remove draft').message), req, next, METHOD_FAILED().code)
    }
})

/**
 ** Retrieves a draft with the provided ID.
 ** This function is an asynchronous handler that processes the request to retrieve a draft.
 ** It retrieves the user from the request, validates the user, and then calls the draft service
 ** to retrieve the draft. The response is sent back with the draft details if successful
 */

export const getDraft = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params?.id // Get draft ID

    if (!id) {
        return ApiError(new Error(MISSING_ID('draft').message), req, next, MISSING_ID().code)
    }

    const user = req as ProtectedRequest // Check if user is logged in

    if (!user) {
        return ApiError(new Error(MISSING_USER.message), req, next, MISSING_USER.code)
    }

    const userId: string = (user as unknown as User)?.id

    try {
        const draft: Partial<BlogDraft> | void = await draftService.getDraftService(req, next, id, userId)

        if (!draft || draft === undefined) {
            return ApiError(new Error(NOT_FOUND('draft').message), req, next, NOT_FOUND().code)
        }

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Draft fetched successfully').message, { draft })
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('get draft').message), req, next, METHOD_FAILED().code)
    }
})

/**
 * Retrieves all drafts for a specific user.
 */

export const getUserDrafts = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // Get user drafts
    const user = req as ProtectedRequest
    const userId: string = (user as unknown as User).id

    try {
        const drafts = await draftService.getUserDraftService(req, next, userId)

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Drafts fetched successfully').message, drafts)
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('get user drafts').message), req, next, METHOD_FAILED().code)
    }
})

// export const getUserPublishedDrafts = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
//     // Get user drafts
//     const user = req as ProtectedRequest
//     const userId: string = (user as unknown as User).id

//     try {
//         const drafts = await draftService.getUserPublishedDraftService(req, next, userId)

//         return ApiResponse(req, res, 200, 'Drafts fetched successfully', drafts)
//     } catch (error) {
//         return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('get user drafts').message), req, next, METHOD_FAILED().code)
//     }
// })

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
        return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('list draft').message), req, next, METHOD_FAILED('list draft').code)
    }
})

export const getUserDraft = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // Get user drafts
    const user = req as ProtectedRequest
    const userId: string = (user as unknown as User).id

    try {
        const drafts = await draftService.getUserDraftService(req, next, userId)

        return ApiResponse(req, res, 200, 'Drafts fetched successfully', drafts)
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('get user drafts').message), req, next, METHOD_FAILED().code)
    }
})
