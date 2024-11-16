import express from 'express'
import { addLike } from '../controllers/like.controller'

const router = express.Router()

router.route('/:postId/like').post(addLike)

router.route('/:postId/like').delete(addLike)

export default router
