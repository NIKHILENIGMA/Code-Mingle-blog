import { z } from 'zod'

export const draftContentSchema = z.object({
    title: z.string().min(0, 'Title is required'),
    content: z.string().min(0, 'Content is required'),
    image: z.string().min(0, 'Image is required')
})

export const postId = z.object({
    postId: z.string().uuid('Invalid post id')
})

export const queryDraftSchema = z.object({
    page: z.number().int().positive().default(1).optional(),
    limit: z.number().int().positive().default(5).optional()
})