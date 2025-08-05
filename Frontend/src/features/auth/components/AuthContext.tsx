import { FC, ReactNode, useCallback, useEffect, useState } from 'react'
import { AuthContext } from '@/features/auth/hooks/useAuthContext'
import { AuthContextType, User } from '@/features/auth/types/authTypes'
import { authService } from '../services/authApiServices'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  accessToken: string | null
}

const initialAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
  accessToken: null,
}

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState)
  const isPersistent = localStorage.getItem('isPersistent') === 'true'

  // Change the authentication state after user logs in
  // This will set the user and access token in the auth state
  const loggedIn = (data: User, token: string): void => {
    if (!data || !token) return

    setAuthState({
      user: data,
      isAuthenticated: !!token,
      accessToken: token,
    })
  }
  // Change the authentication state after user logs out
  // This will reset the auth state to initial state
  const loggedOut = (): void => {
    setAuthState(initialAuthState)
    // Clear localStorage for persistent login
    localStorage.removeItem('isPersistent')
  }

  // Create the context value
  const value: AuthContextType = {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    accessToken: authState.accessToken,
    loggedIn,
    loggedOut,
  }

  // Fetch the user profile if the user is authenticated
  const keepUserLoggedIn = useCallback(async (): Promise<boolean> => {
    try {
      // Get the access token from refresh endpoint
      const tokenResponse = await authService.refreshToken()
      if (!tokenResponse.success || !tokenResponse.data) {
        return false
      }

      // Get the user profile using the access token
      const userResponse = await authService.getProfile()
      if (!userResponse.success || !userResponse.data) {
        return false
      }

      // Update the auth state with user data and access token
      loggedIn(userResponse.data, tokenResponse.data.accessToken)
      return true
    } catch (error) {
      console.warn('Failed to keep user logged in:', error)
      return false
    }
  }, [])

  // Check if the user is already logged in and fetch their profile
  useEffect(() => {
    const initializeAuth = async () => {
      if (
        isPersistent &&
        authState.isAuthenticated === false &&
        authState.accessToken === null
      ) {
        const success = await keepUserLoggedIn()

        if (!success) {
          loggedOut()
        }
      }
    }

    initializeAuth()
  }, [
    authState.isAuthenticated,
    authState.accessToken,
    isPersistent,
    keepUserLoggedIn,
  ])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
