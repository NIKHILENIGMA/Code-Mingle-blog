import { Request, Response } from 'express'
import { AsyncHandler } from '../utils/AsyncHandler'


export const schedulePost = AsyncHandler(async (_: Request, res: Response) => {
    // Save draft
    await new Promise((resolve) => setTimeout(resolve, 1000))
    res.status(200).send('Draft saved successfully')
})

export const getSchedulePost = AsyncHandler(async (_: Request, res: Response) => {
    // Get scheduled post
    await new Promise((resolve) => setTimeout(resolve, 1000))
    res.status(200).send('Scheduled post retrieved successfully')
})

export const listAllScheduledPosts = AsyncHandler(async (_: Request, res: Response) => {
    // List all scheduled posts
    await new Promise((resolve) => setTimeout(resolve, 1000))
    res.status(200).send('All scheduled posts retrieved successfully')
})
