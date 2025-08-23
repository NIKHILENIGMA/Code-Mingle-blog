// This file contains the types for the authentication feature
import { z } from 'zod'
import { forgotPasswordSchema, loginSchema, resetPasswordSchema, signupSchema } from '@/api'
import { Post, User, Comment, ActionType } from '@/generated/prisma/client'
import { changePassword } from '@/features/authentication/auth.validator'
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

export interface CookieTokens {
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
    firstName: string
    lastName: string | null
    email: string
    username: string
    profileImage: string | null
    roleId: string
    verifiedEmail: boolean
}

export interface LoginDTO {
    user: UserDTO
    tokens: {
        accessToken: string
        refreshToken: string
    }
}


export const RESOURCE_ID_PARAMS = {
    COMMENT: 'commentId',
    POST: 'postId',
    REPORT: 'reportId',
    USER: 'id'
} as const

export type Resource = keyof typeof RESOURCE_ID_PARAMS
export type Action = 'read' | 'create' | 'update' | 'delete'

export type ResourceDataMap = {
    COMMENT: Comment
    POST: Post
    REPORT: Report
    USER: User
}

export interface GoogleTokenExchangeResponse {
    access_token: string
    expires_in: number
    scope: string
    token_type: string
    id_token: string
    refresh_token?: string
}

export interface GoogleDecodedTokenPayload {
    iss: string
    azp: string
    aud: string
    sub: string
    email: string
    email_verified: boolean
    at_hash: string
    name: string
    picture: string
    given_name: string
    family_name: string
    iat: number
    exp: number
}


export type ChangePassword = z.infer<typeof changePassword>

export enum OAuthProvider {
    GOOGLE = 'GOOGLE',
    GITHUB = 'GITHUB'
}

export interface CreateUserByGoogleOAuthPayload {
    given_name: string
    family_name: string
    email: string
    picture: string
    sub: string
    provider: OAuthProvider.GOOGLE
    accessToken: string
    refreshToken?: string
    tokenExpiry?: Date

}