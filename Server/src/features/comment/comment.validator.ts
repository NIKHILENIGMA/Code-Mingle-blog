import { z } from 'zod'

export const addCommentSchema = z.object({
    content: z.string().min(1, 'Comment is required').max(255, 'Comment is too long')
})

export const commentId = z.object({
    commentId: z.string().cuid('Invalid comment id')
})

export const queryCommentSchema = z.object({
    page: z
        .string()
        .transform((val) => parseInt(val, 10))
        .refine((val) => !isNaN(val), {
            message: 'Page must be a valid number'
        }),
    limit: z
        .string()
        .transform((val) => parseInt(val, 10))
        .refine((val) => !isNaN(val), {
            message: 'Limit must be a valid number'
        })
})

export const replyId = z.object({
    replyId: z.string().cuid('Invalid reply id')
})
