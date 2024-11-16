import { Request, Response } from 'express'
import { AsyncHandler } from '../utils/AsyncHandler'


export const uploadMedia = AsyncHandler(async (_: Request, res: Response) => {
    // Save draft
    await new Promise((resolve) => setTimeout(resolve, 1000))
    res.status(200).send('Media uploaded successfully')
})


export const embedMedia = AsyncHandler(async (_: Request, res: Response) => {
    // Save draft
    await new Promise((resolve) => setTimeout(resolve, 1000))
    res.status(200).send('Media embedded successfully')
})


export const deleteMedia = AsyncHandler(async (_: Request, res: Response) => {
    // Save draft
    await new Promise((resolve) => setTimeout(resolve, 1000))
    res.status(200).send('Media deleted successfully')
})
