import React, { useState } from 'react'
import { Button, Input, Label, Checkbox } from '@/components'
import { Link } from 'react-router'
import directUserToGoogleConsentScreen from '@/Utils/OAuth'
import { PiEyeClosedThin, PiEyeThin, FcGoogle } from '@/Utils/Icons'
import { useLoginForm } from '../hooks/useLoginForm'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { LoginRequest } from '../types/authTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema } from '../schema/authSchema'
import { Toaster } from '@/components/ui/sonner'

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<LoginRequest>({
    resolver: zodResolver(LoginSchema),
    mode: 'onBlur', // Validate on blur for better UX
    defaultValues: {
      email: '',
      password: '',
    }, // Set default values for the form fields
  })
  const [rememberMe, setRememberMe] = useState<boolean>(false)
  const [isVisible, setVisibility] = useState<boolean>(false)
  const { login, isLoading } = useLoginForm()

  // Handle the form submission
  const onSubmit = async (data: LoginRequest) => {
    clearErrors() // Clear any previous server errors

    // Call the login function with the form data
    await login(data.email, data.password, rememberMe)
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 py-12">
      {/* Background Grid + Gradient */}
      <div className="absolute inset-0 z-[-1] bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-size-[6rem_4rem] dark:bg-[linear-gradient(to_right,#2b2b2b_1px,transparent_1px),linear-gradient(to_bottom,#2b2b2b_1px,transparent_1px)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_50%_30%,#d5c5ff,transparent)] dark:bg-[radial-gradient(circle_600px_at_50%_30%,#4f388c,transparent)]"></div>
      </div>
      <div className="w-full max-w-md p-10 space-y-8 rounded-md shadow-md bg-background">
        <div className="text-center">
          {/* //todo add logo */}
          {/* <div>
                <img
                    src="/logo.png"
                    alt="Logo"
                    className="w-12 h-12 mx-auto mb-4"
                />
            </div> */}
          <h2 className="mt-6 text-3xl font-extrabold text-secondary-foreground">
            Welcome back!
          </h2>
          <p className="mt-2 text-sm font-medium text-secondary-foreground/40">
            Enter your email and password to log in to your account.
          </p>
        </div>
        {/* Login Form */}
        <form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="space-y-5 rounded-md">
            <div className="relative space-y-1">
              <Label htmlFor="email">Email:</Label>
              <Input
                {...register('email')}
                id="email"
                type="email"
                autoComplete="email"
                placeholder="johndoe@example.com"
                className={`${errors.email ? 'border-red-700' : 'border-primary focus:border-primary-500'}`}
              />
              {errors.email && (
                <div className="text-sm text-red-700">
                  {errors.email.message}
                </div>
              )}
            </div>
            <div className="relative space-y-1">
              <Label htmlFor="password">Password:</Label>
              <div className="relative">
                <Input
                  {...register('password')}
                  id="password"
                  type={isVisible ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="*********"
                  className={` pr-10 ${errors.password ? 'border-red-700' : 'border-primary focus:border-primary-500'}`}
                />
                <button
                  type="button"
                  aria-label="Toggle password visibility"
                  onClick={() => setVisibility(!isVisible)}
                  className="absolute transform -translate-y-1/2 cursor-pointer right-3 top-1/2"
                >
                  {isVisible ? <PiEyeClosedThin /> : <PiEyeThin />}
                </button>
              </div>
              {errors.password && (
                <div className="text-sm text-red-600">
                  {errors.password.message}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox
                id="remember-me"
                name="rememberMe"
                checked={rememberMe}
                onCheckedChange={() => setRememberMe(!rememberMe)}
              />
              <label
                htmlFor="remember-me"
                className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="font-medium text-primary hover:text-primary/80"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <Button
              disabled={isLoading || isSubmitting}
              type="submit"
              variant={'default'}
              className="w-full bg-primary text-primary-foreground hover:bg-secondary"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Logging In...
                </>
              ) : (
                'Login'
              )}
            </Button>
          </div>
        </form>
        <hr />

        <div className="space-y-2 text-center">
          <p className="text-sm font-medium text-secondary-foreground/40">
            Or continue with
          </p>
          <Button
            variant={'outline'}
            className="w-full"
            onClick={() => directUserToGoogleConsentScreen('login')}
          >
            <FcGoogle /> Continue with Google
          </Button>
        </div>

        <div className="text-center">
          <p className="text-sm font-light text-secondary-foreground">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="font-medium text-primary hover:text-primary/80"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default Login
