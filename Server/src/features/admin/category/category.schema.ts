import { z } from 'zod'

export const CategoryBodySchema = z.object({
  name: z.string().min(3).max(255)
})

export const CategoryParamsSchema = z.object({
    id: z.number()
})