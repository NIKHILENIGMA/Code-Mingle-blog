import { FC } from 'react'
import { Button, Img } from '@/components'
import { RxCross2 } from 'react-icons/rx'

interface ShowBlogCoverImageProps {
  image: string
}

const ShowBlogCoverImage: FC<ShowBlogCoverImageProps> = ({ image }) => {
  const handleRemoveBlogImage = () => {
    console.log('Removing Blog Image  ')
  }
  return (
    <div className="w-[55vw] h-[60vh] relative space-y-2 overflow-hidden">
      <Img
        src={image}
        alt="cover-img"
        cn="w-full h-full object-cover rounded-lg"
      />
      <div className="absolute top-0 right-2">
        <Button onClick={handleRemoveBlogImage}>
          <RxCross2 fontSize={18} />
        </Button>
      </div>
    </div>
  )
}

export default ShowBlogCoverImage
