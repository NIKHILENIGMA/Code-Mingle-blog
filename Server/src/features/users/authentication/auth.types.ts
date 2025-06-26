// This file contains the types for the authentication feature
import { z } from 'zod'
import { forgotPasswordSchema, loginSchema, resetPasswordSchema, signupSchema } from '@/api'
import { ActionType, Resource } from '@prisma/client'
/**
 * Type definition for signup credentials
 * Inferred from the signupSchema Zod schema
 * Used for validating and typing user registration data
 */
export type SignupCredientials = z.infer<typeof signupSchema>

/**
 * Type definition for login credentials
 * Inferred from the loginSchema Zod schema
 * Used for validating and typing user login data
 *
 */

export type LoginCredientials = z.infer<typeof loginSchema>

/**
 * Type definition for forgot password credentials
 * Inferred from the forgotPasswordSchema Zod schema
 * Used for validating and typing forgot password data
 *
 */
export type ForgotPasswordCredientials = z.infer<typeof forgotPasswordSchema>

/**
 * Type definition for reset password credentials
 * Inferred from the resetPasswordSchema Zod schema
 * Used for validating and typing reset password data
 *
 */
export type ResetPasswordCredentials = z.infer<typeof resetPasswordSchema>

export interface AuthResponse {
    access_token: string
    refresh_token: string
}

export interface Permission {
    id: string
    name: string
    resource: Resource
    actions: ActionType
}

export interface UserDTO {
    id: string
    firstName: string | null
    lastName: string | null
    email: string
    username: string
    bio: string | null
    profileImage: string | null
    coverImage: string | null
    lastLoginAt: Date | null
    roleId: string | null
    createdAt: Date
    updatedAt: Date
}

export interface LoginDTO {
    user: {
        id: string
        firstName: string | null
        lastName: string | null
        email: string
        username: string
        profileImage: string | null
        roleId: string
        verifiedEmail: boolean
    }
    tokens: {
        accessToken: string
        refreshToken: string
    }
}

