import { client, StandardApiResponse } from '@/services/api/apiClient'
import {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  RefreshTokenResponse,
  GoogleRequest,
  ChangePasswordRequest,
  User,
} from '../types/authTypes'
import { AUTHENTICATION_URL } from '@/constants'

class AuthService {
  private static instance: AuthService

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  public async signup(
    credientials: SignupRequest,
  ): Promise<StandardApiResponse<null>> {
    return client.post<null, SignupRequest>(
      `${AUTHENTICATION_URL}/signup`,
      credientials,
    )
  }

  public async login(
    payload: LoginRequest,
  ): Promise<StandardApiResponse<LoginResponse>> {
    return client.post<LoginResponse, LoginRequest>(
      `${AUTHENTICATION_URL}/login`,
      payload,
    )
  }

  public async logout(): Promise<StandardApiResponse<null>> {
    return client.delete<null>(`${AUTHENTICATION_URL}/logout`)
  }

  public async getProfile(): Promise<StandardApiResponse<User>> {
    return client.get<User>(`${AUTHENTICATION_URL}/current-user`)
  }

  public async refreshToken(): Promise<
    StandardApiResponse<RefreshTokenResponse>
  > {
    return client.post<RefreshTokenResponse, void>(
      `${AUTHENTICATION_URL}/refresh-token`,
      undefined,
    )
  }

  public async loginWithGoogle(
    code: string,
  ): Promise<StandardApiResponse<LoginResponse>> {
    return client.post<LoginResponse, GoogleRequest>(
      `${AUTHENTICATION_URL}/google-login-callback`,
      { code },
    )
  }

  public async signupWithGoogle(code: string) {
    return client.post<LoginResponse, GoogleRequest>(
      `${AUTHENTICATION_URL}/google-signup-callback`,
      { code },
    )
  }

  public async changePassword(payload: ChangePasswordRequest) {
    return client.post<null, ChangePasswordRequest>(
      `${AUTHENTICATION_URL}/change-password`,
      payload,
    )
  }
}

export const authService = AuthService.getInstance()

// try {
//   const response = await fetchAPI<null>({
//     method: 'POST',
//     url: `${AUTHENTICATION_URL}/signup`,
//     data: user,
//   })

//   if (!response.success) {
//     if (
//       'errors' in response &&
//       response.errors &&
//       response.errors.length > 0
//     ) {
//       const errorMessages = response.errors.map((error) => error.message)
//       throw new Error(errorMessages.join(', '))
//     }
//     throw new Error(response.message || 'Signup failed')
//   }

//   if (response.statusCode !== 200 && response.statusCode !== 201) {
//     throw new Error(`Signup failed with status: ${response.statusCode}`)
//   }

//   return {
//     success: true,
//     statusCode: response.statusCode,
//     message: 'Signup successful',
//     data: null, // Assuming signup always returns true on success
//   }
// } catch (error) {
//   if (error instanceof Error) {
//     throw error
//   }
//   throw new Error('An unexpected error occurred during signup')
// }
