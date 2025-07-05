import { fetchAPI } from '@/services/api/apiInstance'
import { AUTHENTICATION_URL } from '@/constants'
import {
  ApiResponse,
  LoginSchemaType,
  LoginResponse,
  SignupSchemaType,
  UserDTO,
} from '../types/authTypes'

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

  public async signup(user: SignupSchemaType): Promise<ApiResponse<null>> {
    try {
      const response = await fetchAPI<null>({
        method: 'POST',
        url: `${AUTHENTICATION_URL}/signup`,
        data: user,
      })

      if (!response.success) {
        if (
          'errors' in response &&
          response.errors &&
          response.errors.length > 0
        ) {
          const errorMessages = response.errors.map((error) => error.message)
          throw new Error(errorMessages.join(', '))
        }
        throw new Error(response.message || 'Signup failed')
      }

      if (response.statusCode !== 200 && response.statusCode !== 201) {
        throw new Error(`Signup failed with status: ${response.statusCode}`)
      }

      return {
        success: true,
        statusCode: response.statusCode,
        message: 'Signup successful',
        data: null, // Assuming signup always returns true on success
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('An unexpected error occurred during signup')
    }
  }

  public async login(
    payload: LoginSchemaType,
  ): Promise<ApiResponse<LoginResponse>> {
    try {
      const response = await fetchAPI<LoginResponse>({
        method: 'POST',
        url: `${AUTHENTICATION_URL}/login`,
        data: payload,
      })

      if (!response || typeof response !== 'object') {
        return {
          success: false,
          statusCode: 500,
          message: 'Invalid response structure',
        }
      }

      if (!response.success) {
        if (
          'errors' in response &&
          response.errors &&
          response.errors.length > 0
        ) {
          return {
            success: response.success,
            statusCode: response.statusCode,
            message: response.message || 'Login failed',
            errors: response.errors,
          }
        }

        // If the response is not successful, return an error object
        if (!response.data) {
          return {
            success: false,
            statusCode: response.statusCode,
            message: response.message || 'Error: Login failed',
          }
        }
      }
      return {
        success: true,
        statusCode: response.statusCode,
        message: response.message || 'Login successful',
        data: response.data,
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }

      throw new Error('An unexpected error occurred during login')
    }
  }

  public async logout(): Promise<ApiResponse<null>> {
    try {
      const response = await fetchAPI<null>({
        method: 'DELETE',
        url: `${AUTHENTICATION_URL}/logout`,
      })

      if (!response || typeof response !== 'object') {
        return {
          success: false,
          statusCode: 500,
          message: 'Invalid response structure',
        }
      }

      if (
        !response.success &&
        'errors' in response &&
        response.errors &&
        response.errors.length > 0
      ) {
        return {
          success: false,
          statusCode: response.statusCode,
          message: response.message || 'Logout failed',
          errors: response.errors
            ? response.errors.map((error) => ({ message: error.message }))
            : [],
        }
      }

      if (response.statusCode !== 200) {
        return {
          success: false,
          statusCode: response.statusCode,
          message: response.message || 'Logout failed',
        }
      }

      return {
        success: true,
        statusCode: response.statusCode,
        message: response.message || 'Logout successful',
      }
    } catch (error) {
      console.error(error)
      return {
        success: false,
        statusCode: 500,
        message: 'An unexpected error occurred during logout',
        data: null,
      }
    }
  }

  public async getCurrentUser(): Promise<ApiResponse<UserDTO>> {
    try {
      const response = await fetchAPI<UserDTO>({
        method: 'GET',
        url: `${AUTHENTICATION_URL}/current-user`,
      })

      if (!response || typeof response !== 'object') {
        return {
          success: false,
          statusCode: 500,
          message: 'Invalid response structure',
        }
      }

      if (!response.success || response.statusCode !== 200) {
        if (
          'errors' in response &&
          response.errors &&
          response.errors.length > 0
        ) {
          return {
            success: response.success,
            statusCode: response.statusCode,
            message: response.message || 'Failed to get current user',
            errors: response.errors.map((error) => ({
              message: error.message,
            })),
          }
        }
      }

      if (!response.data) {
        return {
          success: false,
          statusCode: response.statusCode,
          message: response.message || 'No user data returned',
        }
      }

      return {
        success: true,
        statusCode: response.statusCode,
        message: response.message || 'Current user retrieved successfully',
        data: response.data,
      }
    } catch (error) {
      console.error(error)
      throw new Error('Failed to get current user')
    }
  }

  public async refreshToken(): Promise<ApiResponse<{ accessToken: string }>> {
    try {
      const res = await fetchAPI<{ accessToken: string }>({
        method: 'POST',
        url: `${AUTHENTICATION_URL}/refresh-token`,
      })

      if (!res || typeof res !== 'object') {
        return {
          success: false,
          statusCode: 500,
          message: 'Invalid response structure',
        }
      }

      if (!res.success || res.statusCode !== 200) {
        if ('errors' in res && res.errors && res.errors.length > 0) {
          return {
            success: res.success,
            statusCode: res.statusCode,
            message: res.message || 'Failed to refresh token',
            errors: res.errors.map((error) => ({ message: error.message })),
          }
        }
      }

      // Assuming the response data contains the access token
      if (!res.data) {
        return {
          success: false,
          statusCode: res.statusCode,
          message: res.message || 'No access token returned',
        }
      }

      return {
        success: true,
        statusCode: res.statusCode,
        message: res.message || 'Token refreshed successfully',
        data: { accessToken: res.data.accessToken },
      }
    } catch (error) {
      console.error(error)
      throw new Error('Failed to refresh token')
    }
  }

  public async loginWithGoogle(
    code: string,
  ): Promise<ApiResponse<LoginResponse>> {
    try {
      const response = await fetchAPI<LoginResponse>({
        method: 'POST',
        url: `${AUTHENTICATION_URL}/google-callback`,
        data: { code },
      })

      if (!response || typeof response !== 'object') {
        return {
          success: false,
          statusCode: 500,
          message: 'Invalid response structure',
        }
      }

      if (!response.success) {
        if (
          'errors' in response &&
          response.errors &&
          response.errors.length > 0
        ) {
          return {
            success: response.success,
            statusCode: response.statusCode,
            message: response.message || 'Google login failed',
            errors: response.errors.map((error) => ({
              message: error.message,
            })),
          }
        }

        // If the response is not successful, return an error object
        if (!response.data) {
          return {
            success: false,
            statusCode: response.statusCode,
            message: response.message || 'Error: Google login failed',
          }
        }
      }

      // If the response is successful, return the user and tokens
      return {
        success: true,
        statusCode: response.statusCode,
        message: response.message || 'Google login successful',
        data: response.data,
      }
    } catch (error) {
      console.error(
        `An error while get user details after successful google login: ${(error as Error)?.message}`,
      )
      return {
        success: false,
        statusCode: 500,
        message: 'An unexpected error occurred during Google login',
      }
    }
  }
}

export const authService = AuthService.getInstance()
