import { Router } from 'express'
import { isAuthenticated } from '@/api/middlewares'
import { checkIsSlugAvailable, deletePublishedPost, getAllPublishedPosts, publishPost } from '@/features/publish/post/published/publish.controller'

const router = Router()

/**
 * Public routes
 * - Get all the posts of other writers
 * - Check custom slug is avaliable or not
 */
router.route('/').get(getAllPublishedPosts)
router.route('/check-slug').get(checkIsSlugAvailable)

/**
 * Private routes
 * - Get the published post by id
 * - Change current status of the post
 */
router.route('/:id').post(isAuthenticated, publishPost).delete(isAuthenticated, deletePublishedPost)
// router.route('/change-current-status').patch(isAuthenticated)

export default router
