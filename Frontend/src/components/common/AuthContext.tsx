import {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react'
import {
  authService,
  currentUserService,
  loginService,
  logoutService,
  refreshTokenService,
} from '@/services/api/authApiServices'
import { api } from '@/services/api/apiInstance'
import { AxiosError } from 'axios'
import { AuthContext } from '@/hooks/useAuthContext'
import { AuthContextType, User } from '@/features/auth/types/authTypes'

// type User = {
//   id: string
//   username: string
//   firstName: string
//   lastName?: string
//   email: string
//   avatar: string
//   role: string
// }

// type AuthContextType = {
//   user: User | null
//   isAuthenticated: boolean
//   accessToken: string | null
//   loading: boolean
//   login: (email: string, password: string) => Promise<void>
//   logout: () => void
//   getUserDetails: () => Promise<void>
//   setIsPersistent: (value: boolean) => void

// }

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [isPersistent, setIsPersistent] = useState<boolean>(
    localStorage.getItem('isPersistent') === 'true',
  )

  const login = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true)
      const response = await loginService(email, password)

      if (response) {
        setUser({
          id: response.user.id,
          username: response.user.username,
          firstName: response.user.firstName,
          lastName: response.user.lastName || '',
          email: response.user.email,
          avatar: response.user.avatar || '',
          role: response.user.role,
        })
        setIsAuthenticated(true)
        setAccessToken(response.accessToken)
        setLoading(false)
      } else {
        throw new Error('Login failed, no response received')
      }
    } catch (error) {
      console.error(
        'Login failed, reason to failed might be: ',
        (error as Error)?.message,
        ' or ',
        (error as Error)?.name,
      )
      setLoading(false)
      setIsAuthenticated(false)
      setUser(null)
      throw error
    }
  }, [])
  const logout = useCallback(async () => {
    try {
      setLoading(true)
      await logoutService()
      setUser({
        id: '',
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        avatar: '',
      })
      setIsAuthenticated(false)
      setAccessToken(null)
      setUser(null)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error(
        'Logout failed, reason might be: ',
        (error as Error)?.message,
        ' or ',
        (error as Error)?.name,
      )
      throw error
    }
  }, [])

  const getUserDetails = useCallback(async () => {
    setLoading(true)
    try {
      const response = await currentUserService()

      if (response) {
        setUser({
          id: response.user.id,
          username: response.user.username,
          firstName: response.user.name,
          lastName: response.user.lastName || '',
          email: response.user.email,
          avatar: response.user.avatar || '',
          role: response.user.role,
        })
        setIsAuthenticated(true)
        setAccessToken(response.accessToken)
      } else {
        throw new Error('Failed to fetch user details, no response received')
      }
    } catch (error) {
      setLoading(false)
      console.error(
        'Failed to fetch user details, reason might be: ',
        (error as Error)?.message,
        ' or ',
        (error as Error)?.name,
      )
    }
  }, [])

  const refreshToken = useCallback(async () => {
    try {
      setLoading(true)
      setIsAuthenticated(false)
      const response = await refreshTokenService()

      if (response) {
        setAccessToken(response.data.token)
        setIsAuthenticated(true)
        setLoading(false)
        return { newAccessToken: response.data.token }
      } else {
        throw new Error('Failed to refresh token, no response received')
      }
    } catch (error) {
      console.error(
        'Failed to refresh token, reason might be: ',
        (error as Error)?.message,
        ' or ',
        (error as Error)?.name,
      )
      throw error
    }
  }, [])

  const handleBrowserRefresh = useCallback(async () => {
    try {
      const response = await refreshTokenService()
      if (response && response.data) {
        setAccessToken(response.data.token)
        setIsAuthenticated(true)

        const user = await currentUserService()
        if (user) {
          setUser(user)
        } else {
          console.warn('No user details received on initial load.')
        }
      } else {
        console.warn('No new access token received on initial load.')
      }
    } catch (error) {
      throw new Error(
        'Failed to refresh token on initial load, reason might be: ' +
          (error as Error)?.message,
      )
    } finally {
      setLoading(false)
    }
  }, [])

  const handleGoogleLogin = useCallback(async (code: string) => {
    try {
      const response = await authService.loginWithGoogle(code)
      if (response.data) {
        setUser(response.data.user)
        setAccessToken(response.data.tokens.accessToken)
      }
    } catch (error) {
      console.error((error as AxiosError)?.message)
    }
  }, [])

  useEffect(() => {
    if (isPersistent && !accessToken) {
      handleBrowserRefresh()
    }
  }, [isPersistent, accessToken, handleBrowserRefresh])

  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use((config) => {
      config.headers.Authorization = accessToken
        ? `Bearer ${accessToken}`
        : config.headers.Authorization

      return config
    })

    return () => {
      api.interceptors.request.eject(authInterceptor)
    }
  }, [accessToken])

  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config
        if (
          error.response &&
          originalRequest &&
          error.response.status === 401
        ) {
          try {
            const { newAccessToken } = await refreshToken()

            if (newAccessToken) {
              setAccessToken(newAccessToken)
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
              return api(originalRequest)
            }
          } catch (error) {
            console.error(
              'Error during token refresh, reason might be: ',
              (error as Error)?.message,
              ' or ',
              (error as Error)?.name,
            )
          }
        }
        return Promise.reject(error)
      },
    )

    return () => {
      api.interceptors.response.eject(refreshInterceptor)
    }
  }, [refreshToken])

  const value: AuthContextType = {
    user,
    accessToken,
    login,
    logout,
    getUserDetails,
    isAuthenticated,
    loading,
    setIsPersistent,
    handleGoogleLogin,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
