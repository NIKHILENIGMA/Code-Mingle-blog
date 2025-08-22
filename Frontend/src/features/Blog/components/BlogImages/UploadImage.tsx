import React, { useRef } from 'react'
import { Button, Input } from '@/components'

const UploadImage: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.files?.[0]
    Promise.resolve(value)
    // const trimUrl = url?.split("blob:")[1] ?? "";
  }

  return (
    <div className="flex items-center justify-center w-full py-2">
      <div className="flex items-center justify-center w-full ">
        <Input
          id="upload"
          type="file"
          ref={fileInputRef}
          placeholder="Upload Image"
          onChange={handleFile}
          className={`hidden`}
        />
        <Button
          onClick={() => fileInputRef.current?.click()}
          variant="secondary"
          className="w-full"
        >
          Upload Image
        </Button>
      </div>
    </div>
  )
}

export default UploadImage
