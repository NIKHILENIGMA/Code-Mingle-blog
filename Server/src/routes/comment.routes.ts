import express from 'express'
import { addComment, removeComment, editComment } from '../controllers/comment.controller'

const router = express.Router()

router.route('/:postId/comments').post(addComment)

router.route('/:postId/comments/:commentId').patch(editComment)

router.route('/:postId/comments/:commentId').delete(removeComment)

export default router
