import { isProduction, appConfig } from './app.config'
import {
    FILE_SIZE_LIMIT,
    FILE_UPLOAD_PATH,
    cloudinaryConfig,
    ALLOWED_FORMATS,
    MAX_BYTES,
    FORMAT,
    QUALITY,
    RESOURCE_TYPE,
    OVERWRITE,
    INVALIDATE
} from './cloudinary.config'
import { openAIConfig } from './openai.config'
import { RESEND_API_KEY } from './resend.config'
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI, GOOGLE_TOKEN_EXCHANGE_URL } from './google.config'

export {
    appConfig,
    isProduction,
    FILE_UPLOAD_PATH,
    FILE_SIZE_LIMIT,
    cloudinaryConfig,
    ALLOWED_FORMATS,
    MAX_BYTES,
    FORMAT,
    QUALITY,
    RESOURCE_TYPE,
    OVERWRITE,
    INVALIDATE,
    openAIConfig,
    RESEND_API_KEY,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI,
    GOOGLE_TOKEN_EXCHANGE_URL
}
