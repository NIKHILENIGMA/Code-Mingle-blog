import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios'
import {
  ApiErrorResponse,
  ApiSuccessResponse,
  ApiResponseOrError,
} from '@/Types/apiTypes'
import { AUTHENTICATION_URL } from '@/constants'

// Extend the InternalAxiosRequestConfig type to include _retry property
declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    _retry?: boolean
  }
}

// Base URL for the API, can be changed to the actual API endpoint
const API_URL = '/api'
// Initialize accessToken to null
let accessToken: string | null = null
let refreshTokenPromise: Promise<string> | null = null

function setApiRequestToken(token: string | null): void {
  accessToken = token
}

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

async function fetchAPI<T>(
  config: AxiosRequestConfig,
): Promise<ApiResponseOrError<T>> {
  try {
    const response = await api.request<ApiSuccessResponse<T>>(config)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // If the error is an Axios error and has a response, return the error data
      return error.response.data as ApiErrorResponse
    }
    throw new Error(`Network error: ${(error as Error).message}`)
  }
}

// ───────────────────────────────────────────── REQUEST INTERCEPTOR ────────────────────────────────────────────
// This interceptor adds the access token to the request headers if it exists.
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (accessToken !== null) {
    config.headers.Authorization = `Bearer ${accessToken}` // Add the access token to the request headers
  }

  return config // Return the modified config
})

// ───────────────────────────────────────────── RESPONSE INTERCEPTOR ────────────────────────────────────────────

/**
 * Response interceptor for handling authentication errors and token refresh.
 *
 * This interceptor catches 401 Unauthorized responses and attempts to refresh the access token.
 * It implements a token refresh lock mechanism to prevent multiple simultaneous refresh attempts.
 *
 * @param response - The successful response that passes through unchanged
 * @param error - The error response to be handled
 *
 * Flow:
 * 1. Checks if request can be retried (hasn't been retried before)
 * 2. Verifies the error is a 401 and not from an auth endpoint
 * 3. Attempts to refresh the token, reusing an existing refresh call if one is in progress
 * 4. Retries the original failed request with the new token
 * 5. Redirects to login on refresh failure
 *
 * @throws {Error} If token refresh fails
 * @returns Promise that resolves to the retry response or rejects with the error
 */

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean
    }

    // Exit early if we can't retry
    if (!originalRequest || originalRequest._retry) {
      return Promise.reject(error)
    }

    const isUnauthorized = error.response?.status === 401
    const isAuthEndpoint =
      originalRequest.url?.includes('/refresh') ||
      originalRequest.url?.includes('/login')

    // Skip retrying auth endpoints to avoid loops
    if (!isUnauthorized || isAuthEndpoint) {
      return Promise.reject(error)
    }

    try {
      originalRequest._retry = true // mark request as retried

      // Reuse ongoing refresh token call if already started
      if (!refreshTokenPromise) {
        refreshTokenPromise = (async () => {
          const { data, success } = await fetchAPI<{ accessToken: string }>({
            method: 'POST',
            url: `${AUTHENTICATION_URL}/refresh-token`,
          })

          if (!success || !data?.accessToken) {
            throw new Error('Failed to refresh token')
          }

          setApiRequestToken(data.accessToken) // Update the access token in the API instance
          return data.accessToken
        })()

        // Clear lock after resolution
        refreshTokenPromise.finally(() => {
          refreshTokenPromise = null
        })
      }

      // Wait for the shared refresh promise to resolve
      const newAccessToken = await refreshTokenPromise

      // Set new token on original failed request
      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
      }

      // Retry the original request with the new token
      return api(originalRequest)
    } catch (refreshError) {
      console.error('Silent refresh failed:', refreshError)
      window.location.href = '/login'
      return Promise.reject(refreshError)
    }
  },
)

export { api, fetchAPI, setApiRequestToken }
