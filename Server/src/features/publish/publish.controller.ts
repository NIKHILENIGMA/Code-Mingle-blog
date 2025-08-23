import { Request, Response } from 'express'
import { ApiResponse, AsyncHandler, entitiesValidation } from '@/utils'
import { publishService } from './publish.service'
import { OrderBy, PublishPayload, ThumbnailFile } from './publish.types'
import { BadRequestError, DatabaseError, NotFoundError, UnauthorizedError } from '@/utils/Errors'
import { PublishBodySchema } from '@/api'
import { ENUMS } from '@/types'
import { fileValidation } from '@/utils/entitiesValidation'
import { ThumbnailFileSchema } from '@/features/publish/publish.validator'

export const publishPost = AsyncHandler(async (req: Request, res: Response) => {
    // Get the user id from the request object
    const userId = req.user?.id
    if (!userId) {
        throw new UnauthorizedError('User not logged in')
    }
    const postId: string = req.params.id
    if (!postId) {
        throw new NotFoundError('Post not found')
    }

    // Get the post content from the request body
    const body = req.body as PublishPayload

    const validateData = entitiesValidation<PublishPayload>(PublishBodySchema, body)

    // Save the post
    await publishService.publishPost(userId, postId, validateData)

    ApiResponse(req, res, 201, 'Post published successfully')
})

export const addThumbnailToPost = AsyncHandler(async (req: Request, res: Response) => {
    const thumbnailFile = req?.file as ThumbnailFile
    if (thumbnailFile === undefined) {
        throw new BadRequestError('Thumbnail file is required')
    }

    const validatedFile: ThumbnailFile = fileValidation<ThumbnailFile>(ThumbnailFileSchema, thumbnailFile)

    const userId: string | undefined = req.user?.id
    if (!userId || typeof userId !== 'string') {
        throw new UnauthorizedError('User is not logged in')
    }

    await Promise.resolve({ userId, validatedFile })

    ApiResponse(req, res, 200, 'Thumbnail file uploaded successfully')
})

export const getSearchTags = AsyncHandler(async (req: Request, res: Response) => {
    const searchQuery = req.query.search as string
    if (!searchQuery || searchQuery.length < 3) {
        throw new BadRequestError('Search query must be at least 3 characters long')
    }

    const tags = await publishService.getSearchTags(searchQuery)
    if (!tags) {
        throw new NotFoundError('No tags found for the given search query')
    }

    ApiResponse(req, res, 200, 'Tags fetched successfully', { tags })
})

export const checkIsSlugAvailable = AsyncHandler(async (req: Request, res: Response) => {
    const customSlug = req.query.isSlug as string

    if (!customSlug || customSlug.length < 3) {
        throw new BadRequestError('Slug is required')
    }

    const isAvailable = await publishService.isSlugAvailable(customSlug)

    if (isAvailable === undefined) {
        throw new DatabaseError('Slug not found')
    }

    if (isAvailable) {
        ApiResponse(req, res, 200, 'Slug is available', { isAvailable })
    } else {
        ApiResponse(req, res, 200, 'Slug is not available', { isAvailable })
    }
})

export const deletePublishedPost = AsyncHandler(async (req: Request, res: Response) => {
    // Get the user id from the request object
    const userId = req.user?.id
    if (!userId && typeof userId !== 'string') {
        throw new UnauthorizedError('User not logged in')
    }
    // Get the post id from the request params
    const postId = req.params.id
    if (!postId) {
        throw new NotFoundError('Post id not found')
    }

    await publishService.deletePublishedPost(userId, postId)

    ApiResponse(req, res, 200, `Post: ${postId} deleted successfully`)
})

export const changeCurrentPostStatus = AsyncHandler(async (req: Request, res: Response) => {
    const userId: string | undefined = req.user?.id
    if (!userId) {
        throw new UnauthorizedError('User not logged in')
    }

    const postId: string = req.params.id
    if (!postId) {
        throw new NotFoundError('Post id not found')
    }

    const status = req.query.status as ENUMS.DRAFT_STATUS
    if (!status) {
        throw new BadRequestError('Status is required')
    }

    await publishService.changePublishedPostStatus(postId, status)

    ApiResponse(req, res, 200, `Post with id ${postId} status change to ${status}`)
})

export const getAllPublishedPosts = AsyncHandler(async (req: Request, res: Response) => {
    const { limit, page, order } = req.query as { limit: string; page: string; order: string }
    const pageNumber = parseInt(page) || 1
    const limitNumber = parseInt(limit) || 10
    const orderBy: OrderBy = order === 'asc' ? 'asc' : 'desc'

    if (pageNumber < 1 || limitNumber < 1) {
        throw new BadRequestError('Page and limit must be greater than 0')
    }

    const skip = (pageNumber - 1) * limitNumber

    const allPosts = await publishService.getCommunityPublishedPost(limitNumber, skip, orderBy)

    ApiResponse(req, res, 200, 'Published posts fetched successfully', { communityPosts: allPosts })
})
