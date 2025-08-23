import { z } from 'zod'

export const signupSchema = z.object({
    firstName: z.string().min(1, 'firstname is required').optional(),
    lastName: z.string().min(1, 'lastname is required').optional(),
    email: z.string().email('Invalid email address'),
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters long')
        .max(20, 'Password must be at most 20 characters long')
        .refine((val) => /[a-zA-Z]/.test(val), {
            message: 'Password must contain at least one letter'
        })
        .refine((val) => /[0-9]/.test(val), {
            message: 'Password must contain at least one number'
        })
        .refine((val) => /[!@#$%^&*]/.test(val), {
            message: 'Password must contain at least one special character'
        })
})

export const loginSchema = z.object({
    email: z
        .string()
        .email('Invalid email address'),
    password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(20, 'Password must be at most 20 characters long')
})

export const forgotPasswordSchema = z.object({
    email: z
        .string()
        .email('Invalid email address')
})

export const resetPasswordSchema = z.object({
    id: z.string().uuid(),
    newPassword: z.string().min(6, 'Password must be at least 6 characters long'),
    token: z.string()
})

export const refreshTokenSchema = z.object({
    refresh_token: z.string().optional()
})

export const changePassword = z.object({
    oldPassword: z
        .string()
        .min(6, 'Old password must be at least 6 characters long')
        .max(20, 'Old password must be at most 20 characters long')
        .refine((val) => /[a-zA-Z]/.test(val), {
            message: 'Old password must contain at least one letter'
        })
        .refine((val) => /[0-9]/.test(val), {
            message: 'Old password must contain at least one number'
        })
        .refine((val) => /[!@#$%^&*]/.test(val), {
            message: 'Old password must contain at least one special character'
        }),
    newPassword: z
        .string()
        .min(6, 'New password must be at least 6 characters long')
        .max(20, 'New password must be at most 20 characters long')
        .refine((val) => /[a-zA-Z]/.test(val), {
            message: 'New password must contain at least one letter'
        })
        .refine((val) => /[0-9]/.test(val), {
            message: 'New password must contain at least one number'
        })
        .refine((val) => /[!@#$%^&*]/.test(val), {
            message: 'New password must contain at least one special character'
        }),
    confirmPassword: z
        .string()
        .min(6, 'Confirm password must be at least 6 characters long')
        .max(20, 'Confirm password must be at most 20 characters long')
        
})
