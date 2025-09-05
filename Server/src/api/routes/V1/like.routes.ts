import express from 'express'
import { likeStatusOfPost } from '@/features/like/like.controller'

const router = express.Router()

router.route('/:postId/like').post(likeStatusOfPost)

router.route('/:postId/like').delete(likeStatusOfPost)

export default router
