import { createContext, useContext } from 'react'
import { AuthContextType } from '@/features/auth/types/authTypes'

export const AuthContext = createContext<AuthContextType | null>(null)

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }

  return context
}
