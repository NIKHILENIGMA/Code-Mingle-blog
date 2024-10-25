import React from 'react'
import { Img } from '@/components'

const CoverImage: React.FC = () => {
  return (
    <div className='w-full h-[10vw]'>
      <Img
          src="https://images.unsplash.com/photo-1498477386155-805b90bf61f7?q=80&w=1908&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="cover-image"
          cn="object-cover w-full h-1/2"
        />
    </div>
  )
}

export default CoverImage
