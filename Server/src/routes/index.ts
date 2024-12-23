import express from 'express'
import userRoutes from './user.routes'
import authRoutes from './auth.routes'
import blogRoutes from './blog.routes'
import draftRoutes from './draft.routes'
import uploadRoutes from './upload.routes'
import scheduleRoutes from './schedule.routes'
import commentRoutes from './comment.routes'
import likeRoutes from './like.routes'

/**
 * This code snippet is creating a router using Express.js, a popular Node.js web application framework. The router is then used to define routes for the application.
 *
 */

const router = express.Router()

router.use('/users', userRoutes)
router.use('/authentication', authRoutes)
router.use('/posts/:postId/comments', commentRoutes)
router.use('/posts/:postId/likes', likeRoutes)
router.use('/posts/schedule', scheduleRoutes)
router.use('/posts', blogRoutes)
router.use('/drafts', draftRoutes)
router.use('/media', uploadRoutes)

export default router
