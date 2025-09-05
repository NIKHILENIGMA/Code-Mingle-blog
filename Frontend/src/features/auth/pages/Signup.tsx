import { Button, Checkbox, Input, Label } from '@/components'
import directUserToGoogleConsentScreen from '@/Utils/OAuth'
import { FC, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { PiEyeClosedThin, PiEyeThin } from 'react-icons/pi'
import { Link } from 'react-router'
import { OAuthState, SignupRequest } from '@/features/auth/types/authTypes'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignupSchema } from '../schema/authSchema'
import { useSignupForm } from '../hooks/useSignupForm'
import { Toaster } from '@/components/ui/sonner'
import { AlertCircle } from 'lucide-react'

const Signup: FC = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<SignupRequest>({
    resolver: zodResolver(SignupSchema),
    mode: 'onBlur', // Validate on blur for better UX
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    }, // Set default values for the form fields
  })
  const [isVisible, setVisibility] = useState(false)
  const { isLoading, signup } = useSignupForm()

  const onSubmit = async (data: SignupRequest) => {
    clearErrors() // Clear any previous errors
    // Call the signup function from the custom hook
    await signup(data)
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 py-12">
      {/* Background Grid + Gradient */}
      <div className="absolute inset-0 z-[-1] bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-size-[6rem_4rem] dark:bg-[linear-gradient(to_right,#2b2b2b_1px,transparent_1px),linear-gradient(to_bottom,#2b2b2b_1px,transparent_1px)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_50%_30%,#d5c5ff,transparent)] dark:bg-[radial-gradient(circle_600px_at_50%_30%,#4f388c,transparent)]"></div>
      </div>
      <div className="w-full max-w-md p-10 space-y-8 rounded-md shadow-md dark:shadow-lg bg-background">
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
            Create an account
          </h2>
          <p className="mt-2 text-sm font-medium text-secondary-foreground/40">
            Enter your details to sign up for a new account.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2 rounded-md">
            <div className="relative flex flex-col space-x-4 md:flex-row md:items-center">
              <div className="relative space-y-1 ">
                <Label htmlFor="firstName">First Name:</Label>
                <Input
                  {...register('firstName')}
                  id="firstName"
                  type="text"
                  autoComplete="off"
                  required
                  placeholder="John"
                  className={`bg-card ${errors.firstName ? 'border-red-700' : ''}`}
                />
                {errors.firstName && (
                  <div className="flex px-1 space-x-2 text-xs text-red-700">
                    <AlertCircle className="w-4 h-4" />

                    <span className="">{errors.firstName.message}</span>
                  </div>
                )}
              </div>
              <div className="relative space-y-1">
                <Label htmlFor="lastName">Last Name:</Label>
                <Input
                  {...register('lastName')}
                  id="lastName"
                  type="text"
                  autoComplete="off"
                  required
                  placeholder="Doe"
                  className={`bg-card ${errors.lastName ? 'border-red-700' : ''}`}
                />
                {errors.lastName && (
                  <div className="flex px-1 space-x-2 text-xs text-red-700">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.lastName.message}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="relative space-y-1">
              <Label htmlFor="email">Email:</Label>
              <Input
                {...register('email')}
                id="email"
                type="email"
                autoComplete="off"
                required
                placeholder="johndoe@example.com"
                className={`bg-card ${errors.email ? 'border-red-700' : ''}`}
              />
              {errors.email && (
                <div className="flex px-1 space-x-2 text-xs text-red-700">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.email.message}</span>
                </div>
              )}
            </div>
            <div className="relative space-y-1">
              <span
                onClick={() => setVisibility(!isVisible)}
                className={`absolute transform -translate-y-1/2 cursor-pointer right-3 ${errors.password ? 'top-1/2' : 'top-3/4'}`}
              >
                {isVisible ? <PiEyeClosedThin /> : <PiEyeThin />}
              </span>
              <Label htmlFor="password">Password:</Label>
              <Input
                {...register('password')}
                id="password"
                type={isVisible ? 'text' : 'password'}
                autoComplete="current-password"
                required
                placeholder="*********"
                className={`bg-card ${errors.password ? 'border-red-700' : ''}`}
              />
              {errors.password && (
                <div className='flex px-1 space-x-2 text-xs text-red-700'>
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm text-red-700">
                    {errors.password.message}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox id="terms" required />
              <label
                htmlFor="terms"
                className="ml-2 text-sm font-normal leading-snug peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                By signing up, you agree to our{' '}
                <Link
                  to="/terms"
                  className="underline text-primary hover:text-primary/80"
                >
                  Terms and Conditions
                </Link>
              </label>
            </div>
          </div>

          <div>
            <Button
              disabled={isSubmitting || isLoading}
              type="submit"
              variant={'default'}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/80"
            >
              <span className="font-medium">Sign up</span>
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
            onClick={() =>
              directUserToGoogleConsentScreen('signup' as OAuthState)
            }
          >
            <FcGoogle /> Sign up with Google
          </Button>
        </div>

        <div className="text-center">
          <p className="text-sm font-light text-secondary-foreground">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-primary hover:text-primary/80"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default Signup
