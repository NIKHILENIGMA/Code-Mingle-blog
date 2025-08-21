import { FC } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router'
import { Toaster } from '@/components/ui/sonner'

const Main: FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow">
        <Outlet />
        <Toaster />
      </main>
      <Footer />
    </div>
  )
}

export default Main
