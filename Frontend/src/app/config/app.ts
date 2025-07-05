
type ResponseType = 'code'
enum ENIRONMENT {
    DEVELOPMENT = 'DEVELOPMENT', 
    PRODUCTION = 'PRODUCTION'
}
// Application
export const NODE_ENV: string = import.meta.env.VITE_NODE_ENV || 'development'
export const SERVER_BASE_URL= import.meta.env.VITE_SERVER_BASE_URL || 'http://localhost:5000'
export const IS_DEVELOPMENT: boolean = import.meta.env.NODE_ENV === ENIRONMENT.DEVELOPMENT
export const IS_PRODUCTION: boolean = import.meta.env.NODE_ENV === ENIRONMENT.PRODUCTION


// Google OAuth 2.0 
export const GOOGLE_CLIENT_ID: string = import.meta.env.VITE_GOOGLE_CLIENT_ID
export const GOOGLE_REDIRECT_URI: string = import.meta.env.VITE_GOOGLE_REDIRECT_URI
export const GOOGLE_SCOPE: string = 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile'
export const GOOGLE_ACCESS_TYPE: string = 'offline'
export const GOOGLE_RESPONSE_TYPE: ResponseType = 'code' 
export const GOOGLE_PROMPT: string = 'consent'

