import { Router } from 'express'
import { isAuthenticated, validateParams } from '@/api/middlewares'
import {
    checkIsSlugAvailable,
    deletePublishedPost,
    fetchPublishedPost,
    getPublishedPosts,
    publishPost
} from '@/features/post/published/publish.controller'
import { PublishParamsSchema } from '../../validators/publish.validator'

const router = Router()

// Public routes
router.route('/').get(getPublishedPosts)
router.route('/:id').get(validateParams(PublishParamsSchema), fetchPublishedPost)
router.route('/check-slug').get(checkIsSlugAvailable)

/**
 * Private routes
 * - Get the published post by id
 *
 */
router.route('/:id').post(isAuthenticated, publishPost).delete(isAuthenticated, deletePublishedPost)

export default router
