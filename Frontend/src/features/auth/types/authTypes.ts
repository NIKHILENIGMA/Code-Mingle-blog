import { z } from 'zod'
import { ForgotPasswordSchema, LoginSchema, SignupSchema } from '../schema/authSchema'

export interface TokenData {
  accessToken: string
}

export interface UserDTO {
  id: string
  firstName: string
  lastName: string
  email: string
  username: string
  profileImage: string | null
  roleId: string
  verifiedEmail: boolean
}

export interface User {
  id: string
  username: string
  firstName: string
  lastName?: string
  email: string
  avatar: string
  role: string
}

// This context type is used to manage the authentication state across the application.
export type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  accessToken: string | null
  loggedIn: (data: User, token: string) => void
  loggedOut: () => void
}

export type LoginRequest = z.infer<typeof LoginSchema>

export type SignupSchemaType = z.infer<typeof SignupSchema>

export type ForgotPasswordRequest = z.infer<typeof ForgotPasswordSchema>


export interface SignupRequest {
  firstName: string
  lastName: string
  email: string
  username: string
  password: string
}

export interface GoogleRequest {
  code: string
}

export interface ChangePasswordRequest {
  oldPassword: string
  newPassword: string
}

export interface LoginResponse {
  user: User
  tokens: {
    accessToken: string
    refreshToken: string
  }
}

export interface RefreshTokenResponse {
  accessToken: string
}

export type OAuthState = 'login' | 'signup' | 'linked'
