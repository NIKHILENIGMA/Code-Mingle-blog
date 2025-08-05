import dotenvFlow from 'dotenv-flow'

dotenvFlow.config()

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'your-google-client-id'
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_SECRET || 'your-client-secret'
export const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:5173/login'

export const GOOGLE_TOKEN_EXCHANGE_URL: string = 'https://oauth2.googleapis.com/token'

export const GOOGLE_JWKS_URI: string = 'https://www.googleapis.com/oauth2/v3/certs';