import { useState } from 'react'
import { authService } from '../services/authApiServices'
import { useAuthContext } from './useAuthContext'
import { useLocation, useNavigate } from 'react-router'
import { ApiError } from '@/services/api/apiClient'
import { toast } from 'sonner'

export const useLoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { loggedIn } = useAuthContext()
  const navigate = useNavigate()
  const location = useLocation()

  const login = async (email: string, password: string, rememberMe = false) => {
    setIsLoading(true)

    try {
      // Call the login API
      const response = await authService.login({ email, password })

      const { success, data } = response
      if (!response.success) {
        return
      }

      // Update the authentication state
      if (success && data !== undefined) {
        loggedIn(data.user, data.tokens.accessToken)
      }

      // Save the remember me preference in localStorage
      if (rememberMe) {
        localStorage.setItem('isPersistent', 'true')
      }

      // Show success message
      toast.success('Login successful!')

      // Redirect to the page the user was trying to access before login
      const from = location.state?.from?.pathname || '/'
      navigate(from, { replace: true })

      // Handle successful login (e.g., store tokens, redirect)
    } catch (err) {
      const apiResponse = err as ApiError
      toast.error(apiResponse.message || 'Login failed. Please check your credentials and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, login }
}
