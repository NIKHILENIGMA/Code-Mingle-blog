export const fileUploadConfig = {
    FILE_SIZE_LIMIT: parseInt(process.env.FILE_UPLOAD_MAX_SIZE || '5242880'), // 5MB
    FILE_UPLOAD_PATH: (process.env.FILE_UPLOAD_PATH as string) || './public/uploads'
}

export const cloudinaryConfig = {
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
    API_KEY: process.env.CLOUDINARY_API_KEY as string,
    API_SECRET: process.env.CLOUDINARY_API_SECRET as string
}

export const ALLOWED_FORMATS: string[] = ['jpg', 'png', 'jpeg']
export const MAX_BYTES = fileUploadConfig.FILE_SIZE_LIMIT
export const FORMAT = 'webp'
export const QUALITY: number = 100
export const RESOURCE_TYPE: 'image' | 'auto' | 'raw' | 'video' = 'image'
export const OVERWRITE = true
export const INVALIDATE = true
