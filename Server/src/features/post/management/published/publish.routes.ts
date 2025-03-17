import { Router } from 'express'
import { isAuthenticated, validateBody, validateParams, validateQuery } from '../../../../middleware'
import {
    archivePublishedPost,
    checkIsSlugAvailable,
    deletePublishedPost,
    fetchPublishedPost,
    fetchPublishedPosts,
    publishPost,
    updatePublishedPost
} from './publish.controller'
import {
    ListPublishedPostsBodySchema,
    PublishBodySchema,
    PublishedQueryParameterSchema,
    PublishParamsSchema,
    UpdatePublishedPostSchema
} from './publish.schema'

const router = Router()

// Middleware to check if user is authenticated
// -----------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------

router.use(isAuthenticated)

// -----------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------

/**
 * ! Route to publish a post
 * @method POST
 * @route /api/v1/published/new
 * @access Private
 */

router.route('/new').post(validateBody(PublishBodySchema), publishPost)

/**
 * ! Route to update a published post
 * @method PATCH
 * @route /api/v1/published/:id
 * @access Private
 *
 */
router.route('/:id').patch(validateParams(PublishParamsSchema), validateBody(UpdatePublishedPostSchema), updatePublishedPost)

/**
 * ! Route to delete a published post
 * @method DELETE
 * @route /api/v1/published/:id
 * @access Private
 */
router.route('/:id').delete(validateParams(PublishParamsSchema), deletePublishedPost)

/**
 * ! Route to check if a slug is available
 * @method POST
 * @route /api/v1/published/:id
 * @access Private
 */
router.route('/:id').post(checkIsSlugAvailable)

/**
 * ! Route to change the published post to an archived post
 * @method POST
 * @route /api/v1/published/:id
 * @access Private
 */
router.route('/:id').post(validateParams(PublishParamsSchema), archivePublishedPost)

/**
 * ! Route to get all user published posts
 * @method GET
 * @route /api/v1/published/
 * @access Public
 */

router.route('/').get(validateQuery(PublishedQueryParameterSchema), validateBody(ListPublishedPostsBodySchema), fetchPublishedPosts)

/**
 * ! Route to get a published post
 * @method GET
 * @route /api/v1/published/:id
 * @access Public
 *
 */

router.route('/:id').get(validateParams(PublishParamsSchema), fetchPublishedPost)

export default router
