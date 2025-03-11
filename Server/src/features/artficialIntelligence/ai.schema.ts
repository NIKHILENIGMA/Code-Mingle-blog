import { z } from 'zod'

export const promptSchema = z.object({
    type: z.string().optional(),
    text: z.string().nonempty('Text is required'),
})
