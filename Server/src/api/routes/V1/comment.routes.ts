import { validateParams, validateQuery } from '@/api/middlewares/validateSchema.middleware'
import { Router } from 'express'
import {
    addComment,
    removeComment,
    editComment,
    getCommentsByPost,
    createReplyToComment,
    getRepliesByCommentId,
    getCommentById,
    removeReply
} from '@/features/post/comments/comment.controller'
import { isAuthenticated } from '@/api/middlewares/authentication.middleware'
import { validateBody } from '@/api/middlewares/validateSchema.middleware'
import { addCommentSchema, commentId, queryCommentSchema, replyId } from '../../validators/comment.validator'

const router = Router({ mergeParams: true })

// Middleware to check if user is authenticated
//---------------------------------------------------------------------------------------------

router.use(isAuthenticated)

//---------------------------------------------------------------------------------------------

/**
 * Route to add a comment to a post
 */

router.route('/').post(validateBody(addCommentSchema), addComment)

router.route('/:commentId').patch(validateParams(commentId), validateBody(addCommentSchema), editComment)

router.route('/:commentId').delete(validateParams(commentId), removeComment)

router.route('/').get(validateQuery(queryCommentSchema), getCommentsByPost)

router.route('/:commentId').get(getCommentById)

router.route('/:commentId/addReply').post(validateParams(commentId), createReplyToComment)

router.route('/:commentId/replies').get(validateParams(commentId), getRepliesByCommentId)

router.route('/:commentId/replies/:replyId').delete(validateParams(commentId), validateParams(replyId), removeReply)

export default router
