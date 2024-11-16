import express from 'express'
import { getSchedulePost, listAllScheduledPosts, schedulePost } from '../controllers/schedule.controller'

const router = express.Router()

router.route('/').post(schedulePost)

router.route('/:postId').get(getSchedulePost)

router.route('/').get(listAllScheduledPosts)

export default router
