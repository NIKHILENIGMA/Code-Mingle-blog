import React, { useState } from 'react'
import { Link } from 'react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLoginForm } from '../hooks/useLoginForm'
import { Eye, EyeOff, Mail, Lock, AlertCircle, Loader2 } from 'lucide-react'
import { Button, Input } from '@/components'

// Zod validation schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().default(false)
})

type LoginFormData = z.infer<typeof loginSchema>

const LoginPage: React.FC = () => {
  const { isAuthenticated } = useAuthContext()
  const { login, isLoading } = useLoginForm()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur', // Validate on blur for better UX
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  })

  if (isAuthenticated) {
    return null
  }

  const onSubmit = async (data: LoginFormData) => {
    try {
      clearErrors() // Clear any previous server errors
      await login(data.email, data.password, data.rememberMe)
    } catch (loginError: unknown) {
      // Handle server-side errors
      if (loginError && typeof loginError === 'object' && 'statusCode' in loginError) {
        handleServerErrors(loginError as { statusCode: number })
      }
    }
  }

  const handleServerErrors = (loginError: { statusCode: number }) => {
    if (loginError.statusCode === 401) {
      // Invalid credentials - show error on both fields
      setError('email', { message: 'Invalid email or password' })
      setError('password', { message: 'Invalid email or password' })
    } else if (loginError.statusCode === 404) {
      setError('email', { message: 'No account found with this email' })
    } else if (loginError.statusCode === 429) {
      setError('email', { message: 'Too many login attempts. Please try again later.' })
    }
    // Global errors are handled by the useLogin hook
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-background text-secondary-foreground">
      <div className="w-full max-w-md">
        <div className="p-8 shadow-xl bg-card rounded-2xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold">Welcome Back</h1>
            <p className="text-secondary-foreground/80">Sign in to your account to continue</p>
          </div>

          {/* Global Error */}
          {/* {error && (
            <div className="flex items-center gap-3 p-4 mb-6 border border-red-200 rounded-lg bg-red-50">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )} */}

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <Input
                  {...register('email')}
                  id="email"
                  type="email"
                  autoComplete="email"
                  className={`w-full pl-10 py-2 transition-colors bg-background ${
                    errors.email
                      ? 'border-red-700 focus:border-red-500'
                      : 'border-primary-300 focus:border-primary-500'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="flex items-center gap-1 mt-2 text-sm text-red-600 dark:text-red-400">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className={`w-5 h-5 ${errors.password ? 'text-red-700' : 'text-gray-400'}`} />
                </div>
                <Input
                  {...register('password')}
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  className={`w-full pl-10 pr-12 py-3 transition-colors ${
                    errors.password
                      ? 'border-red-700'
                      : 'border-primary-300'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="flex items-center gap-1 mt-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  {...register('rememberMe')}
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading || isSubmitting}
              className="w-full"
            >
              {(isLoading || isSubmitting) ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage