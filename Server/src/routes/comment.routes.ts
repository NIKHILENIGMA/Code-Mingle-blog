import { Router } from 'express'
import { addComment, removeComment, editComment, getCommentsByPost, createReplyToComment, getRepliesByCommentId, getCommentById, removeReply } from '../controllers/comment.controller'
import { isAuthenticated } from '../middleware/authentication.middleware'
// import { addCommentSchema } from '../schemas/comment.schema'
// import { validateSchema } from '../middleware/validateSchema.middleware'

const router = Router({mergeParams: true})

// Middleware to check if user is authenticated
//---------------------------------------------------------------------------------------------

router.use(isAuthenticated)

//---------------------------------------------------------------------------------------------

/**
 * Route to add a comment to a post
 */

router.route('/').post(addComment)

router.route('/:commentId').patch(editComment)

router.route('/:commentId').delete(removeComment)

router.route('/').get(getCommentsByPost)

router.route('/:commentId').get(getCommentById)

router.route('/:commentId/addReply').post(createReplyToComment)

router.route('/:commentId/replies').get(getRepliesByCommentId)

router.route('/:commentId/replies/:replyId').delete(removeReply)


export default router
