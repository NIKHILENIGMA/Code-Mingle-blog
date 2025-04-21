import { Router } from 'express'
import { followUser, getFollowers, unfollowUser, getFollowing, getFollowStatus } from '@/features/users/followSystem/follow.controller'
import { isAuthenticated, validateBody, validateParams, validateQuery } from '@/api/middlewares'
import { followSchema, getFollowersSchema, getFollowingSchema, getFollowStatusSchema, unfollowSchema } from '../../validators/follow.validator'

const router = Router()

// Middleware to check if the user is authenticated
// ----------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------

router.use(isAuthenticated)

//---------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------

/**
 * Follow a user
 * @method POST
 * @route /api/v1/follow-user/follow/:userId
 */
router.route('/follow/:followingId').post(validateParams(followSchema), followUser)

/**
 * Unfollow a user
 * @method DELETE
 * @route /api/v1/follow-user/unfollow/:userId
 */
router.route('/unfollow/:followingId').delete(validateParams(unfollowSchema), unfollowUser)

/**
 * Get followers
 * @method GET
 * @route /api/v1/follow-user/followers
 */
router.route('/followers').get(validateQuery(getFollowersSchema), getFollowers)

/**
 * Get following
 * @method GET
 * @route /api/v1/follow-user/following
 */
router.route('/following').get(validateQuery(getFollowingSchema), getFollowing)

/**
 * Get follow status
 * @method GET
 * @route /api/v1/follow-status
 */
router.route('/follow-status').get(validateBody(getFollowStatusSchema), getFollowStatus)

export default router
