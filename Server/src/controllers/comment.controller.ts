import { Request, Response } from 'express'
import { AsyncHandler } from '../utils/AsyncHandler'


export const addComment = AsyncHandler(async (_: Request, res: Response) => {
    // Add comment logic
    await Promise.resolve()
    res.status(200).json({ message: 'Comment added successfully' })
})


export const editComment = AsyncHandler(async (_: Request, res: Response) => {
    // Edit comment logic
    await Promise.resolve()
    res.status(200).json({ message: 'Comment edited successfully' })
})

export const removeComment = AsyncHandler(async (_: Request, res: Response) => {
    // Delete comment logic
    await Promise.resolve()
    res.status(200).json({ message: 'Comment deleted successfully' })
})   

