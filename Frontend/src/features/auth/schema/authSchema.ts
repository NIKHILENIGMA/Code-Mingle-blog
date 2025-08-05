import { z } from 'zod'

export const SignupSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(6, { message: 'Password too short' }),
  firstName: z.string().min(2, { message: 'First name too short' }),
  lastName: z.string().min(2, { message: 'Last name too short' }),
})

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const ForgotPasswordSchema = z.object({
  email: z.string().email(),
})

export const ResetPasswordSchema = z.object({
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
})
