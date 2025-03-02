import dotenvFlow from 'dotenv-flow'

dotenvFlow.config()

export default {
    ENV: process.env.ENV,
    PORT: process.env.PORT,
    SERVER_URL: process.env.SERVER_URL,
    DATABASE_URL: process.env.DATABASE_URL
}

export const tokenInfo = {
    token_issuer: process.env.JWT_ISSUER,
    token_audience: process.env.JWT_AUDIENCE,
    access_validity: process.env.ACCESS_TOKEN_VALIDITY_IN_SEC,
    refresh_validity: process.env.REFRESH_TOKEN_VALIDITY_IN_SEC,
    role: process.env.JWT_ROLE,
    reset_validity: process.env.RESET_TOKEN_VALIDITY_IN_SEC
}

export const configMailService = {
    resendApiKey: process.env.RESEND_MAIL_SERVICE_API_KEY
}

export const keyPath = {
    PUBLIC_KEY_PATH: (process.env.PUBLIC_KEY_PATH as string) || '../../keys/public_key.pem',
    PRIVATE_KEY_PATH: (process.env.PRIVATE_KEY_PATH as string) || '../../keys/private_key.pem'
}

export const openAIConfig = {
    OPENAI_MODEL: (process.env.OPENAI_MODEL as string) || 'gpt-4o-mini',
    OPENAI_API_KEY: process.env.OPENAI_API_KEY as string,
    OPENAI_API_URL: process.env.OPENAI_API_URL as string
}

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