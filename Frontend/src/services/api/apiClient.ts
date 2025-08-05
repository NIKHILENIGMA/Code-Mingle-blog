import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

export interface StandardApiResponse<T> {
  success: boolean
  statusCode: number
  message: string
  data?: T
  errors?: { message: string }[]
}

export type ApiError = {
  success: false
  statusCode: number
  message: string
  errors?: Array<{ message: string; field: string }>
}

class ApiClient {
  private instance: AxiosInstance
  private accessToken: string | null = null
  private refreshPromise: Promise<string> | null = null

  constructor() {
    // Initialize the axios instance with default settings
    this.instance = axios.create({
      baseURL: '/api',
      withCredentials: true,
      timeout: 5000,
    })

    // Set up interceptors method
    this.setupInterceptors()
  }

  private setupInterceptors() {
    // Request interceptor to add the access token to headers
    this.instance.interceptors.request.use((config) => {
      const token: string | null = this.getToken()
      if (token !== null) {
        config.headers['Authorization'] = token
      }
      return config
    })

    // Response interceptor to handle token refresh
    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401 && !error.config._retry) {
          error.config._retry = true // Prevent infinite loop
          try {
            const newToken = await this.refreshToken()
            error.config.headers.Authorization = `Bearer ${newToken}`
            return this.instance.request(error.config)
          } catch (refreshError) {
            // Handle token refresh error
            return Promise.reject(refreshError)
          }
        }
        throw error
      },
    )
  }

  // Public methods to interact with the API
  private async refreshToken(): Promise<string> {
    if (!this.refreshPromise) {
      this.refreshPromise = this.performTokenRefresh()
      this.refreshPromise?.finally(() => {
        this.refreshPromise = null
      })
    }

    return this.refreshPromise
  }

  // Method to perform the actual token refresh request
  private async performTokenRefresh(): Promise<string> {
    try {
      const response = await this.instance.post('/v1/users/refresh-token')
      const newAccessToken = response.data.accessToken
      this.setToken(newAccessToken)
      return newAccessToken
    } catch (error) {
      // Handle token refresh error
      return Promise.reject(error)
    }
  }

  // Methods to get and set the access token
  private getToken(): string | null {
    // Retrieve access token from in-memory storage not from localStorage
    const token = this.accessToken
    return token ? `Bearer ${token}` : null
  }

  private setToken(token: string | null) {
    // Set the access token in memory
    this.accessToken = token
  }

  async get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<StandardApiResponse<T>> {
    const response = await this.instance.get(url, config)
    return response.data as StandardApiResponse<T>
  }

  async post<T, K>(
    url: string,
    data: K,
    config?: AxiosRequestConfig,
  ): Promise<StandardApiResponse<T>> {
    try {
      const response = await this.instance.post(url, data, config)
      return response.data as StandardApiResponse<T>
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiError = error.response?.data as ApiError
        return Promise.reject({
          success: false,
          statusCode: apiError.statusCode,
          message: apiError.message,
          errors: apiError.errors,
        })
      }
      return Promise.reject({
        success: false,
        statusCode: 500,
        message: (error as Error).message || 'Network error occurred',
        errors: [],
      })
    }
  }

  async put<T, K>(
    url: string,
    data: K,
    config?: AxiosRequestConfig,
  ): Promise<StandardApiResponse<T>> {
    const response = await this.instance.put(url, data, config)
    return response.data as StandardApiResponse<T>
  }

  async patch<T, K>(
    url: string,
    data: K,
    config?: AxiosRequestConfig,
  ): Promise<StandardApiResponse<T>> {
    const response = await this.instance.patch(url, data, config)
    return response.data as StandardApiResponse<T>
  }

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<StandardApiResponse<T>> {
    const response = await this.instance.delete(url, config)
    return response.data as StandardApiResponse<T>
  }
}

export const client = new ApiClient()
