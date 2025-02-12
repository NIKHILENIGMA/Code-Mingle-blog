import { z } from 'zod'

/**
 * 
 */
export const UpdateDraftBodySchema = z.object({
    title: z.string().min(2).max(255),
    content: z.string().min(1),
    image: z.string().url().optional()
})

export const DraftParamsSchema = z.object({
    id: z.string().uuid('Invalid draft id')
})


export const QueryDraftSchema = z.object({
    page: z.number().int().positive().default(1).optional(),
    limit: z.number().int().positive().default(5).optional()
})