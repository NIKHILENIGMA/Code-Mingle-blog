import { FC, useState } from 'react'
import { Button, Input, Label } from '@/components'
import { GiConfirmed } from 'react-icons/gi'
import { PiEyeClosedThin, PiEyeThin } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'

interface ResetPasswordFormState {
  newPassword: string
  confirmPassword: string
}

interface VisibleState {
  newPasswordVisible: boolean
  confirmPasswordVisible: boolean
}

const ResetPassword: FC = () => {
  const [formState, setFormState] = useState<ResetPasswordFormState>({
    newPassword: '',
    confirmPassword: '',
  })
  const navigate = useNavigate()
  const [visibleState, setVisibleState] = useState<VisibleState>({
    newPasswordVisible: false,
    confirmPasswordVisible: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = () => {
    navigate('/login')
  }
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="absolute inset-0 z-[-1] bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] dark:bg-[linear-gradient(to_right,#2b2b2b_1px,transparent_1px),linear-gradient(to_bottom,#2b2b2b_1px,transparent_1px)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_55%_40%,#d5c5ff,transparent)] dark:bg-[radial-gradient(circle_600px_at_55%_40%,#4f388c,transparent)]"></div>
      </div>
      <div className="flex flex-col w-full max-w-md p-10 space-y-8 rounded-md shadow-md bg-background">
        <div className="px-8 space-y-2 text-center">
          <h1 className="text-3xl font-bold text-center">Reset Password</h1>
          <p className="text-sm text-center text-secondary-foreground/40">
            Enter your new password below to reset it.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="w-full px-8 space-y-3">
          <div className="relative space-y-1">
            <Label htmlFor="newPassword">New Password: </Label>
            <span
              className="absolute z-10 cursor-pointer right-2 top-9"
              onClick={() =>
                setVisibleState((prev) => ({
                  ...prev,
                  newPasswordVisible: !prev.newPasswordVisible,
                }))
              }
            >
              {visibleState.newPasswordVisible ? (
                <PiEyeClosedThin />
              ) : (
                <PiEyeThin />
              )}
            </span>
            <Input
              type={visibleState.newPasswordVisible ? 'text' : 'password'}
              id="password"
              value={formState.newPassword}
              name="newPassword"
              placeholder="*********"
              className="bg-card"
              autoComplete="off"
              onChange={handleChange}
              autoFocus
              required
            />
            <span className="text-xs select-none text-secondary-foreground/40">
              Your password must be at least 8 characters long
            </span>
          </div>
          <div className="relative space-y-1">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <span
              className="absolute z-10 cursor-pointer right-2 top-9"
              onClick={() =>
                setVisibleState((prev) => ({
                  ...prev,
                  confirmPasswordVisible: !prev.confirmPasswordVisible,
                }))
              }
            >
              {visibleState.confirmPasswordVisible ? (
                <PiEyeClosedThin />
              ) : (
                <PiEyeThin />
              )}
            </span>
            <Input
              type={visibleState.confirmPasswordVisible ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              autoComplete="off"
              value={formState.confirmPassword}
              onChange={handleChange}
              placeholder="*********"
              className="bg-card"
              required
            />
            <span className="text-xs select-none text-secondary-foreground/40">
              Your passwords must match
            </span>
          </div>
          <div className="text-sm text-secondary-foreground/40">
            Please ensure your new password is strong and secure.
          </div>

          <div>
            <Button type="submit" className="w-full">
              <GiConfirmed className="dark:text-white" />
              Confirm
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
