// Description: Configuration for Cloudinary and file upload settings
import dotenvFlow from 'dotenv-flow'

dotenvFlow.config()

export const FILE_SIZE_LIMIT: number = parseInt(process.env.FILE_UPLOAD_MAX_SIZE || '5242880') // max 5MB for file uploads
export const FILE_UPLOAD_PATH: string = process.env.FILE_UPLOAD_PATH || './public/uploads' // default upload path

export const cloudinaryConfig = {
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
    API_KEY: process.env.CLOUDINARY_API_KEY as string,
    API_SECRET: process.env.CLOUDINARY_API_SECRET as string
}

export const CLOUDINARY_CLOUD_NAME: string = process.env.CLOUDINARY_CLOUD_NAME || 'CLOUDINARY_CLOUD_NAME'
export const CLOUDINARY_API_KEY: string = process.env.CLOUDINARY_API_KEY || 'API_KEY'
export const CLOUDINARY_API_SECRET: string = process.env.CLOUDINARY_API_SECRET || 'API_SECRET'

export const ALLOWED_FORMATS: string[] = ['jpg', 'png', 'jpeg']
export const MAX_BYTES = FILE_SIZE_LIMIT
export const FORMAT = 'webp' 
export const QUALITY: number = 100
export const RESOURCE_TYPE: 'image' | 'auto' | 'raw' | 'video' = 'image'
export const OVERWRITE = true
export const INVALIDATE = true
