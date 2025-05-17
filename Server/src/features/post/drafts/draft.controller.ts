import { Request, Response } from 'express'
import { AsyncHandler, ApiResponse, entitiesValidation } from '@/utils'
import { Post } from '@prisma/client'
import { uploadService } from '@/features/common/upload.service'
import { CloundinaryOption } from '@/types/common/base.types'
import { ENUMS } from '@/types'
import { BadRequestError, DatabaseError, InternalServerError, NotFoundError, UnauthorizedError } from '@/utils/Errors'
import draftService from './draft.service'
import { DraftUpdateFields } from './draft.types'
import { UpdateDraftBodySchema } from '@/api'
export const createDraft = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    // Get draft
    const userId: string | undefined = req.user?.id
    if (!userId) {
        throw new UnauthorizedError('User is not logged in')
    }

    const draftId = await draftService.createDraftService({
        status: ENUMS.DRAFT_STATUS.DRAFT,
        userId,
        slug: ''
    })

    ApiResponse(req, res, 201, 'Draft created successfully', { draftId })
})

export const saveDraft = AsyncHandler(async (req: Request, res: Response) => {
    /// Get draft ID
    const draftId: string = req.params.id
    if (!draftId) {
        throw new NotFoundError('Draft ID is missing')
    }

    /// Get user
    const userId: string | undefined = req.user?.id
    if (!userId || userId === undefined) {
        throw new UnauthorizedError('User is not logged in')
    }

    /// Get the draft content from the request body
    const body = req.body as DraftUpdateFields
    if (!body) {
        throw new BadRequestError('Draft content is missing')
    }
    // Validate the request body against the UpdateDraftBodySchema
    const validateData: DraftUpdateFields = entitiesValidation<DraftUpdateFields>(UpdateDraftBodySchema, body)

    // Save draft
    const successMessage: string = await draftService.saveDraftService(draftId, userId, validateData)
    if (!successMessage) {
        throw new DatabaseError('Draft not found')
    }

    /// Return success message
    ApiResponse(req, res, 200, successMessage, { draftId })
})

export const removeDraft = AsyncHandler(async (req: Request, res: Response) => {
    /// Get draft ID
    const draftId = req.params?.id
    if (!draftId) {
        throw new NotFoundError('Draft ID is missing')
    }

     // Get logged in user
    const userId: string | undefined = req.user?.id
    if (!userId || userId === undefined) {
        throw new UnauthorizedError('User is not logged in')
    }

    /// Remove draft
    const successMessage: string | void = await draftService.removeDraftService(draftId, userId)
    if (!successMessage) {
        throw new DatabaseError('Draft not found')
    }

    /// Return success message
    ApiResponse(req, res, 200, 'Draft removed successfully', { draftId })
})

export const getUserDraft = AsyncHandler(async (req: Request, res: Response) => {
    /// Get draft ID
    const draftId = req.params?.id
    if (!draftId) {
        throw new NotFoundError('Draft ID is missing')
    }

    // Get logged in user
    const userId: string | undefined = req.user?.id
    if (!userId || userId === undefined) {
        throw new UnauthorizedError('User is not logged in')
    }

    /// Get draft
    const draft: Partial<Post> | null = await draftService.getDraftService(draftId, userId, ENUMS.DRAFT_STATUS.DRAFT)
    if (!draft) {
        throw new DatabaseError('Draft not found')
    }

    /// Return draft
    ApiResponse(req, res, 200, 'Draft fetched successfully', { draft })
})

export const getCurrentUserDrafts = AsyncHandler(async (req: Request, res: Response) => {
    // Get logged in user
    const userId: string | undefined = req.user?.id
    if (!userId || userId === undefined) {
        throw new UnauthorizedError('User is not logged in')
    }

    const drafts: Post[] | null = await draftService.getUserDraftsService(userId, ENUMS.DRAFT_STATUS.DRAFT)
    if (!drafts) {
        throw new DatabaseError('Drafts not found')
    }

    return ApiResponse(req, res, 200, 'Drafts fetched successfully', drafts)
})

export const uploadDraftCoverImage = AsyncHandler(async (req: Request, res: Response) => {
    // Get the draft id from the request object
    const draftId = req.params.id
    if (!draftId) {
        throw new NotFoundError('Draft ID is missing')
    }

    // Get the user id from the request object
    const draftCoverImagePath = (req.file as Express.Multer.File)?.path || ''
    if (!draftCoverImagePath) {
        throw new NotFoundError('Draft cover image is missing')
    }
    // Get the avatar URL from the request body
    const { unsplashUrl } = req.body as { unsplashUrl: string }

    // Get logged in user
    const userId: string | undefined = req.user?.id
    if (!userId || userId === undefined) {
        throw new UnauthorizedError('User is not logged in')
    }

    if (!unsplashUrl && !draftCoverImagePath) {
        throw new BadRequestError('No draft cover image provided or unsplash URL')
    }

    // Cloudinary options for uploading the avatar
    const cloudinaryOption: CloundinaryOption = {
        folder: 'posts',
        public_name: `cover_image-${draftId}`,
        quality: 50,
        resource: 'image',
        altName: 'draft cover image'
    }

    //  Upload the avatar
    if (unsplashUrl) {
        await draftService.updateDraftCoverImageService(draftId, userId, unsplashUrl)
        return ApiResponse(req, res, 200, 'Draft Cover image uploaded successfully', { image: unsplashUrl })
    } else {
        const draftCoverImageURL = await uploadService.uploadFile(userId, draftCoverImagePath, cloudinaryOption)
        if (!draftCoverImageURL) {
            throw new BadRequestError('Draft cover image upload failed')
        }

        await draftService.updateDraftCoverImageService(draftId, userId, draftCoverImageURL)
        ApiResponse(req, res, 200, 'Draft Cover image uploaded successfully', { image: draftCoverImageURL })
    }
})

export const removeDraftCoverImage = AsyncHandler(async (req: Request, res: Response) => {
    // Get the draft id from the request object
    const draftId = req.params.id
    if (!draftId) {
        throw new NotFoundError('Draft ID is missing')
    }
    // Get logged in user
    const userId: string | undefined = req.user?.id
    if (!userId || userId === undefined) {
        throw new UnauthorizedError('User is not logged in')
    }

    // Create the public id for the draft cover image
    const public_id = `posts/cover_image-${draftId}-${userId}`

    // Remove the draft cover image from Cloudinary
    await uploadService.removeImage(public_id)

    // Remove the draft cover image from the database
    const successMessage = await draftService.removeDraftCoverImageService(draftId, userId)

    if (!successMessage) {
        throw new BadRequestError('Draft cover image removal failed')
    }

    ApiResponse(req, res, 200, successMessage)
})

export const uploadThumbnail = AsyncHandler(async (req: Request, res: Response) => {
    // Check if the request contains a file
    const thumbnailImage = req.file as Express.Multer.File
    if (!thumbnailImage) {
        throw new NotFoundError('Thumbnail image is missing')
    }

    // Get logged in user
    const userId: string | undefined = req.user?.id
    if (!userId || userId === undefined) {
        throw new UnauthorizedError('User is not logged in')
    }

    // Get the draft id from the request object
    const draftId = req.params.id
    if (!draftId) {
        throw new NotFoundError('Draft ID is missing')
    }

    // Set the Cloudinary options for uploading the thumbnail
    const cloudinaryOption: CloundinaryOption = {
        folder: 'thumbnails',
        public_name: `thumbnail-${draftId}`,
        quality: 50,
        resource: 'image',
        altName: `thumbnail-${userId}`
    }

    // Upload the thumbnail image to Cloudinary
    const uploadThumbnail = await uploadService.uploadFile(userId, thumbnailImage.path, cloudinaryOption)
    if (!uploadThumbnail) {
        throw new InternalServerError('Thumbnail upload failed')
    }

    // Update the draft thumbnail in the database
    const successMessage: string | void = await draftService.updateDraftThumbnailService(draftId, userId, uploadThumbnail)
    if (!successMessage) {
        throw new DatabaseError('Draft thumbnail update failed')
    }

    // Return the success message
    ApiResponse(req, res, 200, successMessage, { thumbnail: uploadThumbnail })
})

export const removeDraftThumbnail = AsyncHandler(async (req: Request, res: Response) => {
    const draftId = req.params.id
    if (!draftId) {
        throw new NotFoundError('Draft ID is missing')
    }

    // Get logged in user
    const userId: string | undefined = req.user?.id
    if (!userId || userId === undefined) {
        throw new UnauthorizedError('User is not logged in')
    }

    // Create the public id for the draft thumbnail
    const public_id = `thumbnails/thumbnail-${draftId}-${userId}`
    // Remove the draft thumbnail from Cloudinary
    await uploadService.removeImage(public_id)

    const successMessage: string | void = await draftService.removeDraftThumbnailService(draftId, userId)

    if (!successMessage) {
        throw new DatabaseError('Draft thumbnail removal failed')
    }

    ApiResponse(req, res, 200, successMessage)
})

export const draftPreview = AsyncHandler(async (req: Request, res: Response) => {
    // Get the draft id from the request object
    const draftId = req.params.id
    if (!draftId) {
        throw new NotFoundError('Draft ID is missing')
    }

    // Get logged in user
    const userId: string | undefined = req.user?.id
    if (!userId || userId === undefined) {
        throw new UnauthorizedError('User is not logged in')
    }

    const preview = await draftService.previewDraftService(draftId, userId, ENUMS.DRAFT_STATUS.DRAFT)

    if (!preview) {
        throw new DatabaseError('Draft preview not found')
    }

    ApiResponse(req, res, 200, 'Draft fetched successfully', { preview })
})
