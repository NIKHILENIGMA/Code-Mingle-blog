import { Button } from '@/components'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const NotFoundPage: FC = () => {
  const navigate = useNavigate()
  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-background text-secondary-foreground">
      <div className="flex flex-col items-center space-y-6 text-center">
        {/* Error Code */}
        <h1 className="text-[10rem] font-bold text-secondary-foreground">
          404
        </h1>

        {/* Error Message */}
        <h2 className="text-2xl font-semibold">PAGE NOT FOUND</h2>

        {/* Additional Info */}
        <p className="text-secondary-foreground/70">
          Your search has ventured beyond the known universe
        </p>

        {/* Back to Home Button */}
        <div className='flex items-center space-x-4'>
          <Button
            onClick={() => navigate(-1)}
            variant={'outline'}
            className="hover:bg-secondary/80"
          >
            Go back
          </Button>
          <Button onClick={() => navigate('/')} className="hover:bg-primary/80">
            Home
          </Button>
        </div>
      </div>

      {/* Left Illustration */}
      <img
        src="/not-found-standing-girl.svg"
        alt="Left Illustration"
        className="hidden md:block w-44 h-auto absolute left-[27%] bottom-220"
      />

      {/* Right Illustration */}
      <img
        src="/not-found-sitting-boy.svg"
        alt="Right Illustration"
        className="hidden md:block w-44 h-auto absolute right-[20%] bottom-[30%]"
      />
    </div>
  )
}

export default NotFoundPage
