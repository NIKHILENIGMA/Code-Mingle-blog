import { NextFunction, Request, Response } from 'express'
import { AsyncHandler } from '@/utils/AsyncHandler'
import { ProtectedRequest } from '@/types/extended/app-request'
import { User } from '@/Lib/Models/User'
import { Post } from '@prisma/client'
import { ApiResponse } from '@/utils/ApiResponse'
import { ApiError } from '@/utils/ApiError'
import responseMessage from '@/constant/responseMessage'
import DraftService from './draft.service'
import { GenerateDraft, DraftContent, DraftWhere, DraftSelectFields, DraftWhereStatus } from '@/types/draft'
import { ENUMS } from '@/types'
import { uploadService } from '@/features/common/upload.service'
import { CloundinaryOption } from '@/types/common/base.types'

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
    const userId: string = (req.user as User)?.id
    if (!userId) {
        return ApiError(new Error(UNAUTHORIZED.message), req, next, UNAUTHORIZED.code)
    }

    try {
        // Get user

        const payload: GenerateDraft = {
            status: ENUMS.DRAFT_STATUS.DRAFT,
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
    const draftContent: DraftContent = req.body as DraftContent
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
        thumbnailImage: true,
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
        status: ENUMS.DRAFT_STATUS.DRAFT
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

export const uploadDraftCoverImage = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    // Get the draft id from the request object
    const draftId = req.params.id
    // Get the user id from the request object
    const draftCoverImagePath = (req.file as Express.Multer.File)?.path || ''
    // Get the avatar URL from the request body
    const { unsplashUrl } = req.body as { unsplashUrl: string }

    // Where clause for the user id
    const userId = (req.user as User)?.id
    if (!userId) {
        return ApiError(new Error(UNAUTHORIZED.message), req, next, UNAUTHORIZED.code)
    }

    if (!unsplashUrl && !draftCoverImagePath) {
        return ApiError(new Error(BAD_REQUEST('No cover image provided').message), req, next, BAD_REQUEST().code)
    }

    // Cloudinary options for uploading the avatar
    const cloudinaryOption: CloundinaryOption = {
        folder: 'posts',
        public_name: `cover_image-${draftId}`,
        quality: 50,
        resource: 'image',
        altName: 'draft cover image'
    }

    //  Where clause for the user id
    const where = { id: userId }

    //  Upload the avatar
    try {
        if (unsplashUrl) {
            await draftService.updateDraftCoverImage(req, next, { image: unsplashUrl }, draftId)
            return ApiResponse(req, res, SUCCESS().code, SUCCESS('Draft Cover image uploaded successfully').message, { image: unsplashUrl })
        } else {
            const draftCoverImageURL = await uploadService.uploadFile(req, next, where, draftCoverImagePath, cloudinaryOption)
            if (!draftCoverImageURL) {
                return ApiError(new Error(METHOD_FAILED('upload avatar').message), req, next, METHOD_FAILED().code)
            }

            await draftService.updateDraftCoverImage(req, next, { image: draftCoverImageURL }, draftId)
            return ApiResponse(req, res, SUCCESS().code, SUCCESS('Draft Cover image uploaded successfully').message, { image: draftCoverImageURL })
        }
    } catch (error) {
        return ApiError(new Error(INTERNAL_SERVICE((error as Error)?.message).message), req, next, INTERNAL_SERVICE().code)
    }
})

export const removeDraftCoverImage = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    // Get the draft id from the request object
    const draftId = req.params.id
    // Get the user id from the request object
    const userId = (req.user as User)?.id
    if (!userId) {
        return ApiError(new Error(UNAUTHORIZED.message), req, next, UNAUTHORIZED.code)
    }

    const public_id = `posts/cover_image-${draftId}-${userId}`
    //  Remove the draft cover image
    try {
        // Remove the draft cover image from Cloudinary
        await uploadService.removeImage(req, next, public_id)

        // Remove the draft cover image from the database
        await draftService.removeDraftCoverImage(req, next, draftId)

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Draft Cover image removed successfully').message)
    } catch (error) {
        return ApiError(new Error(INTERNAL_SERVICE((error as Error)?.message).message), req, next, INTERNAL_SERVICE().code)
    }
})

export const uploadThumbnail = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const thumbnailImage = req.file as Express.Multer.File
    if (!thumbnailImage) {
        return ApiError(new Error(BAD_REQUEST('No thumbnail provided').message), req, next, BAD_REQUEST().code)
    }

    const userId = (req.user as User)?.id
    if (!userId) {
        return ApiError(new Error(UNAUTHORIZED.message), req, next, UNAUTHORIZED.code)
    }

    const draftId = req.params.id
    if (!draftId) {
        return ApiError(new Error(MISSING_ID('draft').message), req, next, MISSING_ID().code)
    }

    try {
        const cloudinaryOption: CloundinaryOption = {
            folder: 'thumbnails',
            public_name: `thumbnail-${draftId}`,
            quality: 50,
            resource: 'image',
            altName: `thumbnail-${userId}`
        }

        const where = { id: userId }
        const uploadThumbnail = await uploadService.uploadFile(req, next, where, thumbnailImage.path, cloudinaryOption)

        if (!uploadThumbnail) {
            return ApiError(new Error(METHOD_FAILED('upload thumbnail').message), req, next, METHOD_FAILED().code)
        }

        await draftService.updateDraftThumbnail(req, next, { thumbnailImage: uploadThumbnail }, draftId)

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Thumbnail uploaded successfully').message, { thumbnail: uploadThumbnail })
    } catch (error) {
        return ApiError(new Error(INTERNAL_SERVICE((error as Error)?.message).message), req, next, INTERNAL_SERVICE().code)
    }
})

export const removeDraftThumbnail = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const draftId = req.params.id
    if (!draftId) {
        return ApiError(new Error(MISSING_ID('draft').message), req, next, MISSING_ID().code)
    }

    const userId = (req.user as User)?.id
    if (!userId) {
        return ApiError(new Error(UNAUTHORIZED.message), req, next, UNAUTHORIZED.code)
    }

    try {
        const public_id = `thumbnails/thumbnail-${draftId}-${userId}`
        await uploadService.removeImage(req, next, public_id)

        await draftService.removeDraftThumbnail(req, next, draftId)

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Thumbnail removed successfully').message)
    } catch (error) {
        return ApiError(new Error(INTERNAL_SERVICE((error as Error)?.message).message), req, next, INTERNAL_SERVICE().code)
    }
})

export const draftPreview = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const draftId = req.params.id
    if (!draftId) {
        return ApiError(new Error(MISSING_ID('draft').message), req, next, MISSING_ID().code)
    }

    const userId = (req.user as User)?.id
    if (!userId) {
        return ApiError(new Error(UNAUTHORIZED.message), req, next, UNAUTHORIZED.code)
    }

    try {
        const preview = await draftService.previewDraftService(req, next, { id: draftId, authorId: userId })

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Draft fetched successfully').message, { preview })
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('get draft').message), req, next, METHOD_FAILED().code)
    }
})
