import { FC } from 'react'
import { Button, Input, Label } from '@/components'
import { Link } from 'react-router-dom'
import { FaArrowLeftLong } from 'react-icons/fa6'

const ForgotPassword: FC = () => {
  const handleSubmit = () => {}
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="absolute inset-0 z-[-1] bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] dark:bg-[linear-gradient(to_right,#2b2b2b_1px,transparent_1px),linear-gradient(to_bottom,#2b2b2b_1px,transparent_1px)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_55%_40%,#d5c5ff,transparent)] dark:bg-[radial-gradient(circle_600px_at_55%_40%,#4f388c,transparent)]"></div>
      </div>
      <div className="flex flex-col rounded-lg shadow-sm p-14 bg-background">
        <div className="px-12 space-y-2 text-center">
          <h1 className="text-3xl font-bold text-center">Forgot Password?</h1>
          <p className="text-sm text-center text-secondary-foreground/40">
            Enter your email address below and we'll send you a link to reset
            your password.
          </p>
        </div>
        <form
          className="w-full px-12 space-y-3"
          onSubmit={() => handleSubmit()}
        >
          <Label htmlFor="email">Email: </Label>
          <Input
            typeof="email"
            id="email"
            name="email"
            autoComplete="off"
            autoFocus
            required
            placeholder="johndoe@example.com"
          />

          <div>
            <Button type="submit" className="w-full hover:bg-primary/80">
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
