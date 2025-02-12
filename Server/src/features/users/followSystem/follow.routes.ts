import { Router } from 'express'
import { followUser, getFollowers, unfollowUser, getFollowing, getFollowStatus } from './follow.controller'
import { isAuthenticated } from '../../../middleware/authentication.middleware'
import { validateBody, validateParams } from '../../../middleware/validateSchema.middleware'
import { followSchema, getFollowersSchema, getFollowingSchema, getFollowStatusSchema, unfollowSchema } from './follow.schema'
import { validateQuery } from './../../../middleware/validateSchema.middleware'

const router = Router()

// Middleware to check if the user is authenticated
// ----------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------

router.use(isAuthenticated)

// ----------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------

/**
 * Follow a user
 * @method POST
 * @route /api/v1/follow/:userId
 */
router.route('/follow/:followingId').post(validateParams(followSchema), followUser)

/**
 * Unfollow a user
 * @method DELETE
 * @route /api/v1/unfollow/:userId
 */
router.route('/unfollow/:followingId').delete(validateParams(unfollowSchema), unfollowUser)

/**
 * Get followers
 * @method GET
 * @route /api/v1/followers
 */
router.route('/followers').get(validateQuery(getFollowersSchema), getFollowers)

/**
 * Get following
 * @method GET
 * @route /api/v1/following
 */
router.route('/following').get(validateQuery(getFollowingSchema), getFollowing)

/**
 * Get follow status
 * @method GET
 * @route /api/v1/follow-status
 */
router.route('/follow-status').get(validateBody(getFollowStatusSchema), getFollowStatus)

export default router
