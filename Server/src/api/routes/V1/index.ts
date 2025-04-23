import { Router } from 'express'
import aiRoutes from './ai.routes'
import authRoutes from './auth.routes'
import categoryRoutes from './category.routes'
import collectionRoutes from './collection.routes'
import commentRoutes from './comment.routes'
import draftRoutes from './draft.routes'
import followRoutes from './follow.routes'
import newLetterRoutes from './newletter.routes'
import likeRoutes from './like.routes'
import profileRoutes from './profile.routes'
import publishRoutes from './publish.route'
import reportRoutes from './report.routes'


const router = Router()

/**
 * @name User Routes 
 * 
 */
router.use('/users/authentication', authRoutes)
// Follow routes
router.use('/users/follow-user', followRoutes)
// Profile routes
router.use('/users/profile', profileRoutes)

/**
 * @name Post Routes 
 * 
 */  
// Like routes
router.use('/posts/:postId/likes', likeRoutes)
// Collection routes
router.use('/posts/:postId/collection', collectionRoutes)
// Comment routes
router.use('/posts/:postId/comments', commentRoutes)
// Draft routes
router.use('/drafts', draftRoutes)
// Publish routes
router.use('/published', publishRoutes)
// OpenAI routes
router.use('/openai', aiRoutes)
// Newsletter routes
router.use('/mail/newletter', newLetterRoutes)

/**
 * @name Admin Routes
 */
// Category routes
router.use('/category', categoryRoutes)
// Report routes
router.use('/report', reportRoutes)



export default router