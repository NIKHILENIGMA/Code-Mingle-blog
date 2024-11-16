import { Request, Response } from 'express'
import { AsyncHandler } from '../utils/AsyncHandler'


export const addLike = AsyncHandler(async (_: Request, res: Response) => {
    // Add like logic
    await Promise.resolve()
    res.status(200).json({ message: 'Like added successfully' })
})


export const unLike = AsyncHandler(async (_: Request, res: Response) => {
    // Edit like logic
    await Promise.resolve()
    res.status(200).json({ message: 'unLike successfully' })
})


