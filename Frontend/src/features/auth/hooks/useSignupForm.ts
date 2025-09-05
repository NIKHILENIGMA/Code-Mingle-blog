import { useState } from 'react'
import { authService } from '../services/authApiServices'
import { ApiError } from '@/services/api/apiClient'
import { toast } from 'sonner'
import { SignupRequest } from '../types/authTypes'
import { useNavigate } from 'react-router'

export const useSignupForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const signup = async (data: SignupRequest) => {
    setIsLoading(true)
    try {
      await authService.signup(data)
      // Show success message
      toast.success('Signup successful! Please log in to continue.')
      // Navigate to the desired page after successful signup
      navigate('/login')
    } catch (err) {
      const apiResponse = err as ApiError
      toast.error(
        apiResponse.message ||
          'Login failed. Please check your credentials and try again.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, signup }
}
