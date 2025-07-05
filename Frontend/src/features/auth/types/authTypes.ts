import { z } from "zod"
import { LoginSchema, SignupSchema } from "../schema/authSchema"

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
  userAuthenticatedState: (userData: UserDTO, token: string) => void
  userLoggedOut: () => void
}


export type LoginSchemaType = z.infer<typeof LoginSchema>

export type SignupSchemaType = z.infer<typeof SignupSchema>


export interface LoginResponse {
  user: UserDTO
  tokens: {
    accessToken: string
    refreshToken: string
  }
}

export interface ApiResponse<T> {
  success: boolean
  statusCode: number
  message: string
  data?: T
  errors?: { message: string }[]
}
