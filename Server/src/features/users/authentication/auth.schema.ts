import { z } from 'zod'

export const signupSchema = z.object({
    firstName: z.string().min(1, 'Name is required').optional(),
    lastName: z.string().min(1, 'Name is required').optional(),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long')
})


export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long')
})


export const forgotPasswordSchema = z.object({
    email: z.string().email('Invalid email address')
})

export const resetPasswordSchema = z.object({
    newPassword: z.string().min(6, 'Password must be at least 6 characters long'),
    token: z.string()
})

export const refreshTokenSchema = z.object({
    refresh_token: z.string().optional()
})