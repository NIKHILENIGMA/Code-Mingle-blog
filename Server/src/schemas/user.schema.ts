import { z } from 'zod'

export const createUserSchema = z.object({
    firstName: z.string().min(1, 'Name is required'),
    lastName: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long')
})

