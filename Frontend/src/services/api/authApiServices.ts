import axios from 'axios'
import { apiInstance } from './apiInstance'
import { AUTHENTICATION_URL, PROFILE_URL } from '@/constants'

interface SignupCredentials {
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
}

interface LoginCredentials {
  email: string
  password: string
}

class AuthService {
  private static instance: AuthService
  private constructor() {
    // Private constructor to prevent instantiation
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  public async signup(user: SignupCredentials) {
    try {
      const response = await apiInstance.post(
        `${AUTHENTICATION_URL}/signup`,
        user,
      )

      if (response.status === 200) {
        return response.data
      }
      const errorMessage: string = await this.getErrorMessage(response.status)
      throw new Error(errorMessage)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  public async login({ email, password }: LoginCredentials) {
    if (!email || !password) {
      throw new Error('Email and password are required')
    }

    try {
      const response = await apiInstance.post(`${AUTHENTICATION_URL}/login`, {
        email,
        password,
      })
      if (response.status === 200) {
        return response.data
      }

      throw new Error('Failed to login')
    } catch (error) {
      console.error(error)
    }
  }

  public async logout(): Promise<void> {
    try {
      await apiInstance.delete(`${AUTHENTICATION_URL}/logout`)
    } catch (error) {
      console.error(error)
    }
  }

  public async refreshToken() {
    try {
      const response = await apiInstance.post(
        `${AUTHENTICATION_URL}/refresh-token`,
      )

      if (response.status !== 200) {
        throw new Error('Failed to refresh token')
      }

      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message)
      }
    }
  }

  private async getErrorMessage(status: number): Promise<string> {
    const errors: Record<number, string> = {
      400: 'Bad Request: The request was invalid or cannot be otherwise served.',
      401: 'Unauthorized: Authentication is required and has failed or has not yet been provided.',
      403: 'Forbidden: The request was valid, but the server is refusing action.',
      404: 'Not Found: The requested resource could not be found.',
      429: 'Too Many Requests: The user has sent too many requests in a given amount of time.',
      500: 'Internal Server Error: An error occurred on the server.',
      503: 'Service Unavailable: The server is currently unavailable (overloaded or down).',
    }

    if (status in errors) {
      return errors[status]
    }
    return 'An unexpected error occurred'
  }
}

export const authService = AuthService.getInstance()

export const currentUserService = async () => {
  try {
    const response = await apiInstance.get(`${PROFILE_URL}/get-user`)

    if (response.status !== 200) {
      throw new Error('Failed to get current user')
    }

    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const signupService = async (user: SignupCredentials) => {
  try {
    const response = await apiInstance.post(
      `${AUTHENTICATION_URL}/signup`,
      user,
    )

    if (response.status !== 200) {
      throw new Error('Failed to register user account')
    }
    return response.data
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export const loginService = async (email: string, password: string) => {
  try {
    const response = await apiInstance.post(`${AUTHENTICATION_URL}/login`, {
      email,
      password,
    })

    if (response.status !== 200) {
      throw new Error('Failed to login')
    }

    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const logoutService = async (): Promise<void> => {
  try {
    await apiInstance.delete(`${AUTHENTICATION_URL}/logout`)
  } catch (error) {
    console.error(error)
  }
}

export const refreshTokenService = async () => {
  try {
    const response = await apiInstance.post(
      `${AUTHENTICATION_URL}/refresh-token`,
    )

    if (response.status !== 200) {
      throw new Error('Failed to refresh token')
    }

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message)
    }
  }
}

export const forgotPassword = async (email: string) => {
  try {
    const response = await apiInstance.post(
      `${AUTHENTICATION_URL}/forgot-password`,
      { email },
    )

    if (response.status !== 200) {
      throw new Error('Failed to send password reset email')
    }

    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const resetPassword = async (
  password: string,
  confirmPassword: string,
) => {
  try {
    const response = await apiInstance.post(
      `${AUTHENTICATION_URL}/reset-password`,
      { password, confirmPassword },
    )

    if (response.status !== 200) {
      throw new Error('Failed to reset password')
    }

    return response.data
  } catch (error) {
    console.error(error)
  }
}
