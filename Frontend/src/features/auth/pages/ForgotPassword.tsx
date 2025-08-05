import { FC } from 'react'
import { Button, Input, Label } from '@/components'
import { Link } from 'react-router-dom'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ForgotPasswordSchema } from '../schema/authSchema'
import { ForgotPasswordRequest } from '../types/authTypes'

const ForgotPassword: FC = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordRequest>({
    resolver: zodResolver(ForgotPasswordSchema),
    mode: 'onBlur', // Validate on blur for better UX
    defaultValues: {
      email: '',
    }, // Set default values for the form fields
  })

  const onSubmit = async (data: ForgotPasswordRequest) => {
    clearErrors() // Clear any previous server errors
    // Here you would typically call your API to handle the forgot password logic
    console.log('Forgot Password Data:', data)
    // For example, you might send a request to your backend to initiate the password reset process
  }

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="absolute inset-0 z-[-1] bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] dark:bg-[linear-gradient(to_right,#2b2b2b_1px,transparent_1px),linear-gradient(to_bottom,#2b2b2b_1px,transparent_1px)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_55%_40%,#d5c5ff,transparent)] dark:bg-[radial-gradient(circle_600px_at_55%_40%,#4f388c,transparent)]"></div>
      </div>
      <div className="w-full max-w-md p-10 space-y-8 rounded-md shadow-md bg-background">
        <div className="px-4 space-y-2 text-center">
          <h1 className="text-3xl font-bold text-center">Forgot Password?</h1>
          <p className="text-sm text-center text-secondary-foreground/40">
            Enter your email address below and we'll send you a link to reset
            your password.
          </p>
        </div>
        <form
          className="w-full px-12 space-y-3"
          onSubmit={() => handleSubmit(onSubmit)}
        >
          <Label htmlFor="email">Email: </Label>
          <Input
            {...register('email')}
            className={`${
              errors.email
                ? 'border-red-700'
                : 'border-primary focus:border-primary-500'
            }`}
            type="email"
            typeof="email"
            id="email"
            autoComplete="off"
            placeholder="johndoe@example.com"
          />
          {errors.email && (
            <div className="text-sm text-red-700">{errors.email.message}</div>
          )}

          <div>
            <Button
              disabled={isSubmitting}
              type="submit"
              className="w-full hover:bg-primary/80"
            >
              Reset Password
            </Button>
          </div>
        </form>
        <div className="text-sm text-center text-secondary-foreground/40">
          <Link
            to="/login"
            className="relative inline-flex items-center gap-2 px-3 py-2 transition-colors duration-200 rounded-md text-md text-secondary-foreground hover:underline"
          >
            <FaArrowLeftLong className="dark:text-white" /> Back to login?{' '}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
