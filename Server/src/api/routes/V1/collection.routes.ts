import { Router } from 'express'
import {
    createCollection,
    getUserCollection,
    listCollection,
    removeCollection,
    addPostToCollection,
    removePostFromCollection,
    getPostFromCollection,
    listPostsInCollection
} from '@/features/post/collection/collection.controller'
import { isAuthenticated, validateBody, validateParams, validateQuery } from '@/api/middlewares'
import { CollectionBodySchema, CollectionParamsSchema, CollectionQuerySchema, PostParamsSchema } from '@/api/validators/collection.validator'

const router = Router()

//-------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------

router.use(isAuthenticated)

//-------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------

/**
 *! Route for creating a new collection.
 * @method POST
 * @route /api/v1/user/collection/create-collection
 * @access Private
 */
router.route('/create').post(validateBody(CollectionBodySchema), createCollection)

/**
 *! Route for removing a collection.
 * @method DELETE
 * @route /api/v1/user/collection/:collectionId
 * @access Private
 */
router.route('/:collectionId').delete(validateParams(CollectionParamsSchema.merge(PostParamsSchema)), removeCollection)

/**
 *! Route for adding a post to a collection.
 * @method POST
 * @route /api/v1/user/collection/:collectionId/posts/:postId
 */
router
    .route('/:collectionId/posts/:postId')
    .put(validateParams(CollectionParamsSchema.merge(PostParamsSchema)), validateBody(CollectionBodySchema), addPostToCollection)

/**
 *! Route for removing a post from a collection.
 * @method DELETE
 * @route /api/v1/user/collection/:collectionId/posts/:postId
 * @access Private
 */
router.route('/:collectionId/posts/:postId').delete(validateParams(CollectionParamsSchema.merge(PostParamsSchema)), removePostFromCollection)

/**
 * ! Route for getting a post from a collection.
 * @method GET
 * @route /api/v1/user/collection/:collectionId/posts/:postId
 * @access Private
 */
router.route('/:collectionId/posts/:postId').get(validateParams(CollectionParamsSchema.merge(PostParamsSchema)), getPostFromCollection)

/**
 * ! Route for getting a list of posts in a collection.
 * @method GET
 * @route /api/v1/user/collection/:collectionId/posts
 * @access Private
 */
router.route('/:collectionId/posts').get(validateParams(CollectionParamsSchema), validateQuery(CollectionQuerySchema), listPostsInCollection)

/**
 *! Route for getting a single of collections.
 * @method GET
 * @route /api/v1/user/collection/:collectionId
 * @access Private
 *
 */
router.route('/:collectionId').get(validateParams(CollectionParamsSchema), getUserCollection)

/**
 *! Route for getting a list of collections.
 * @method GET
 * @route /api/v1/user/collection/
 * @access Private
 */
router.route('/').get(validateQuery(CollectionQuerySchema), listCollection)

export default router
