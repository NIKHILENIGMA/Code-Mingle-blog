import { Request, Response } from 'express'
import { AsyncHandler } from '../utils/AsyncHandler'


export const saveDraft = AsyncHandler(async (_: Request, res: Response) => {
    // Save draft
    await new Promise((resolve) => setTimeout(resolve, 1000))
    res.status(200).send('Draft saved successfully')
})


export const getDraft = AsyncHandler(async (_: Request, res: Response) => {
    // Get draft
    await new Promise((resolve) => setTimeout(resolve, 1000))
    res.status(200).send('Draft retrieved successfully')
})

export const listDraft = AsyncHandler(async (_: Request, res: Response) => {
    // List drafts
    await new Promise((resolve) => setTimeout(resolve, 1000))
    res.status(200).send('Drafts listed successfully')
})