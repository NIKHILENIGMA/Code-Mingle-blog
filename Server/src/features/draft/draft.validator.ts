import { z } from 'zod'

export const UpdateDraftBodySchema = z.object({
    title: z
        .string()
        .min(0, { message: 'Title must be at least 2 characters long' })
        .max(255, { message: 'Title must be at most 255 characters long' })
        .optional(),
    content: z.string().min(1, { message: 'Content is required' }).optional()
})

export const DraftParamsSchema = z.object({
    id: z.string().uuid({ message: 'Invalid draft ID format' })
})

export const DraftQuerySchema = z.object({
    page: z
        .string()
        .optional()
        .transform((val) => (val ? parseInt(val, 10) : undefined))
        .refine((val) => val === undefined || (Number.isInteger(val) && val > 0), {
            message: 'Page must be a positive integer.'
        }),
    limit: z
        .string()
        .optional()
        .transform((val) => (val ? parseInt(val, 10) : undefined))
        .refine((val) => val === undefined || (Number.isInteger(val) && val > 0), {
            message: 'Limit must be a positive integer.'
        })
})
