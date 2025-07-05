import { FC, ReactNode, useCallback, useEffect, useState } from 'react'
import { AuthContext } from '@/features/auth/hooks/useAuthContext'
import { AuthContextType, User, UserDTO } from '@/features/auth/types/authTypes'
import { setApiRequestToken } from '@/services/api/apiInstance'
import { authService } from '../services/authApiServices'

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const isPersistent = localStorage.getItem('isPersistent') === 'true'

  const formatUser = (userData: UserDTO): User => ({
    id: userData.id,
    username: userData.username,
    firstName: userData.firstName,
    lastName: userData.lastName || '',
    email: userData.email,
    avatar: userData.profileImage || '',
    role: userData.roleId,
  })

  const userAuthenticatedState = useCallback((userData: UserDTO, token: string) => {
    setUser(formatUser(userData))
    setIsAuthenticated(true)
    setAccessToken(token)
    setApiRequestToken(token)
  }, [])

  const userLoggedOut = () => {
    setUser(null)
    setIsAuthenticated(false)
    setAccessToken(null)
    setApiRequestToken(null)
  }

  const value: AuthContextType = {
    user,
    isAuthenticated,
    accessToken,
    userAuthenticatedState,
    userLoggedOut,
  }

  const getCurrentSession = useCallback(async () => {
    try {
      // Attempt to refresh the token
      const { success, data } = await authService.refreshToken()
      if (!success || !data?.accessToken) throw new Error('No access token')

      // Fetch the current user details
      const { data: userData } = await authService.getCurrentUser()
      if (!userData) throw new Error('No user data')

      // Update the user state and access token
      userAuthenticatedState(userData, data.accessToken)
    } catch (err) {
      throw new Error(
        'Failed to get current session, reason might be: ' +
          (err as Error).message,
      )
    }
  }, [userAuthenticatedState])

  // Fetch the current user details on initial load for persistent sessions to ensure the user is authenticated
  useEffect(() => {
    if (isPersistent && !accessToken && !user) {
      getCurrentSession()
    }
  }, [accessToken, isPersistent, getCurrentSession, user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
