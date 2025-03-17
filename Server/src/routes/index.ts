import { Router } from 'express'
import authRoutes from '../features/users/authentication/auth.routes'
import oauthRoutes from '../features/users/oauth/oAuth.routes'
import followRoutes from '../features/users/followSystem/follow.routes'
import preferenceRoutes from '../features/users/preferences/preference.routes'
import profileRoutes from '../features/users/profile/profile.routes'
import collectionRoutes from '../features/post/interaction/collection/collection.routes'
import likeRoutes from '../features/post/interaction/enagement/like.routes'
import commentRoutes from '../features/post/interaction/comments/comment.routes'
import sharingRoutes from '../features/post/interaction/sharing/sharing.routes'
import draftRoutes from '../features/post/management/drafts/draft.routes'
import publishRoutes from '../features/post/management/published/publish.routes'
import reportsRoutes from '../features/post/management/report/report.routes'
import newLetterRoutes from '../features/mail/newletter/newletter.routes'
import aiRoutes from '../features/artficialIntelligence/ai.routes'


// Create a new router 
const router = Router()

//! User routes
/**
 * @name Authentication Routes
 * @description This route is used to authenticate users
 * @route /api/v1/users/authentication
 * @access Public
 */
router.use('/users/authentication', authRoutes)

/**
 * @name OAuth Routes
 * @description This route is used to authenticate users using OAuth
 * @route /api/v1/users/OAuth
 * @access Public
 */
router.use('/users/OAuth', oauthRoutes)

/**
 * @name Follow Routes
 * @description This route is used to follow and unfollow users
 * @route /api/v1/users/follow
 * @access Private
 */
router.use('/users/follow-user', followRoutes)

/**
 * @name Preference Routes
 * @description This route is used to set user preferences
 * @route /api/v1/users/preference
 * @access Private
 */
router.use('/users/preference', preferenceRoutes)
/**
 * @name Profile Routes
 * @description This route is used to get user profile
 * @route /api/v1/users/profile
 * @access Private
 */
router.use('/users/profile', profileRoutes)


//! Post Interaction routes 
/**
 * @name Collection Routes
 * @description This route is used to add and remove posts from collection
 * @route /api/v1/posts/:postId/collection
 * @access Private
 */
router.use('/posts/:postId/collection', collectionRoutes)

/**
 * @name Like Routes
 * @description This route is used to like and unlike posts
 * @route /api/v1/posts/:postId/likes
 * @access Private
 */
router.use('/posts/:postId/likes', likeRoutes)

/**
 * @name Comment Routes
 * @description This route is used to comment on posts
 * @route /api/v1/posts/:postId/comments
 * @access Private
 */
router.use('/posts/:postId/comments', commentRoutes)

/**
 * @name Sharing Routes
 * @description This route is used to share posts
 * @route /api/v1/posts/:postId/share
 * @access Private
 */
router.use('/posts/:postId/share', sharingRoutes)

//! Post Management routes
/**
 * @name Draft Routes
 * @description This route is used to create, update, delete and get drafts
 * @route /api/v1/posts/drafts
 * @access Private
 */
router.use('/drafts', draftRoutes)

/**
 * @name Publish Routes
 * @description This route is used to publish and unpublish posts
 * @route /api/v1/published
 * @access Private
 */
router.use('/published', publishRoutes)

/**
 * @name Reports Routes
 * @description This route is used to get reports
 * @route /api/v1/posts/reports
 * @access Private
 */
router.use('/reports', reportsRoutes)

//! Mail routes
/**
 * @name NewLetter Routes
 * @description This route is used to send newletter
 * @route /api/v1/mail/newletter
 * @access Private
 */
router.use('/mail/newletter', newLetterRoutes)

//! Artificial Intelligence routes
/**
 * @name AI Routes
 * @description This route is used to get AI reports
 * @route /api/v1/ai-assistance
 * @access Private
 */

router.use('/ai-assistance', aiRoutes)

//! Admin routes
/**
 * @name Admin Routes
 * @description This route is used to get reports
 * @route /api/v1/admin
 * @access Private
 */
router.use('/admin/analytics', reportsRoutes)

/**
 * @name Admin Routes
 * @description This route is used to get reports
 * @route /api/v1/admin
 */
router.use('/admin/users', reportsRoutes)

/**
 * @name Admin Routes
 * @description This route is used to get reports
 * @route /api/v1/admin
 * @access Private
 */
router.use('/admin/posts', reportsRoutes)
router.use('/admin/seo', reportsRoutes)
router.use('/admin/settings', reportsRoutes)
router.use('/admin/tags', reportsRoutes)

// router.use('/media', uploadRoutes)

export default router
