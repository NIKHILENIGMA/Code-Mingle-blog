import { NextFunction, Request, Response } from 'express'
import { AsyncHandler } from '../utils/AsyncHandler'
import { ProtectedRequest } from '../types/app-request'
import { User } from '../Lib/Models/User'
import { Post } from '@prisma/client'
import { ApiResponse } from '../utils/ApiResponse'
import { ApiError } from '../utils/ApiError'
import responseMessage from '../constant/responseMessage'
import DraftService from '../services/draft.service'
import { GenerateDraft, DraftContent, DraftWhere, DraftSelectFields, DraftWhereStatus } from '../types/draft'
import { DRAFT_STATUS } from '../constant/draftStatus'

const draftService = new DraftService()

const { MISSING_ID, MISSING_BODY, MISSING_USER, METHOD_FAILED, BAD_REQUEST, SUCCESS, NOT_FOUND, UNAUTHORIZED, INTERNAL_SERVICE } = responseMessage

/**
 ** Creates a new draft.
 *
 ** This function is an asynchronous handler that processes the request to create a new draft.
 ** It retrieves the user from the request, validates the user, and then calls the draft service
 ** to create a new draft. The response is sent back with the draft ID if successful.
 *
 */
export const createDraft = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction): Promise<void> => {
    // Get draft
    try {
        // Get user
        const userId: string = (req.user as User)?.id

        const payload: GenerateDraft = {
            status: DRAFT_STATUS.DRAFT,
            authorId: userId
        }

        const draftId = await draftService.newDraftService(req, next, payload)

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Draft created successfully').message, { draftId })
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(INTERNAL_SERVICE('generate draft').message), req, next, INTERNAL_SERVICE().code)
    }
})

/**
 ** Saves a draft with the provided details.
 * 
 ** This function is an asynchronous handler that processes the request to save a draft.
 ** It retrieves the user from the request, validates the user, and then calls the draft service
 ** to save the draft. The response is sent back with the draft details if successful.

 */
export const saveDraft = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    /// Get draft ID
    const draftId: string = req.params.id
    if (!draftId) {
        return ApiError(new Error(MISSING_ID('draft').message), req, next, MISSING_ID().code)
    }

    /// Get user
    const userId: string = (req.user as User)?.id
    if (!userId) {
        return ApiError(new Error(UNAUTHORIZED.message), req, next, UNAUTHORIZED.code)
    }

    /// Get draft content
    const draftContent: DraftContent = (req.body as DraftContent)
    if (!draftContent) {
        return ApiError(new Error(MISSING_BODY.message), req, next, MISSING_BODY.code)
    }

    const where = {
        id: draftId,
        authorId: userId
    }

    try {
        // Save draft
        const successMessage = await draftService.saveDraftService(req, next, {
            where,
            draftContent
        })

        if (!successMessage) {
            return ApiError(new Error(BAD_REQUEST('draft not saved').message), req, next, BAD_REQUEST().code)
        }

        return ApiResponse(req, res, SUCCESS().code, SUCCESS(successMessage).message)
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(INTERNAL_SERVICE('save draft').message), req, next, INTERNAL_SERVICE().code)
    }
})

/**
 ** Removes a draft with the provided ID.
 
 ** This function is an asynchronous handler that processes the request to remove a draft.
 ** It retrieves the user from the request, validates the user, and then calls the draft service
 ** to remove the draft. The response is sent back with the draft details if successful.
 *
 */

export const removeDraft = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    /// Get draft ID
    const draftId = req.params?.id
    if (!draftId) {
        return ApiError(new Error(MISSING_ID('draft').message), req, next, MISSING_ID().code)
    }

    /// Get user ID
    const userId: string = (req.user as User)?.id
    if (!userId) {
        return ApiError(new Error(UNAUTHORIZED.message), req, next, UNAUTHORIZED.code)
    }

    /// Where clause
    const where: DraftWhere = {
        id: draftId,
        authorId: userId
    }

    try {
        /// Remove draft
        const successMessage = await draftService.removeDraftService(req, next, { where })

        if (!successMessage) {
            return ApiError(new Error(BAD_REQUEST('draft not removed').message), req, next, BAD_REQUEST().code)
        }

        /// Return success message
        return ApiResponse(req, res, SUCCESS().code, SUCCESS(successMessage).message)
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

export const getDraft = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    /// Get draft ID
    const id = req.params?.id
    if (!id) {
        return ApiError(new Error(MISSING_ID('draft').message), req, next, MISSING_ID().code)
    }

    /// Get user
    const userId: string = (req.user as User)?.id
    if (!userId) {
        return ApiError(new Error(MISSING_USER.message), req, next, MISSING_USER.code)
    }

    /// Where clause
    const where: DraftWhere = {
        id,
        authorId: userId
    }

    /// Select fields
    const selectedFields: DraftSelectFields = {
        id: true,
        title: true,
        content: true,
        image: true,
        createdAt: true
    }

    try {
        /// Get draft
        const draft: Partial<Post> | void = await draftService.getDraftService(req, next, { where, selectedFields })

        if (!draft || draft === undefined) {
            return ApiError(new Error(NOT_FOUND('draft').message), req, next, NOT_FOUND().code)
        }

        /// Return draft
        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Draft fetched successfully').message, { draft })
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('get draft').message), req, next, METHOD_FAILED().code)
    }
})

/**
 * Retrieves all drafts for a specific user.
 *
 ** This function is an asynchronous handler that processes the request to retrieve all drafts for a specific user.
 ** It retrieves the user from the request, validates the user, and then calls the draft service to retrieve all drafts.
 */

export const getUserDrafts = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    /// Get user Id
    const userId: string = (req.user as User)?.id
    if (!userId) {
        return ApiError(new Error(UNAUTHORIZED.message), req, next, UNAUTHORIZED.code)
    }

    /// Where clause for draft status
    const where: DraftWhereStatus = {
        authorId: userId,
        status: DRAFT_STATUS.DRAFT
    }

    try {
        const drafts = await draftService.getUserDraftsService(req, next, { where })

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Drafts fetched successfully').message, drafts)
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('get user drafts').message), req, next, METHOD_FAILED().code)
    }
})

/**
 ** Retrieves all drafts.
 *
 ** This function is an asynchronous handler that processes the request to retrieve all drafts.
 ** It calls the draft service to retrieve all drafts.
 */

export const listDraft = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    /// List drafts
    try {
        const getAllDrafts: Post[] | void = await draftService.listDraftService(req, next)

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('All Drafts fetched successfully').message, getAllDrafts)
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('list draft').message), req, next, METHOD_FAILED('list draft').code)
    }
})
