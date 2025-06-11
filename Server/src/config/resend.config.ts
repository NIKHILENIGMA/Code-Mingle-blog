import dotenvFlow from 'dotenv-flow'

dotenvFlow.config()

// configMailService

export const RESEND_API_KEY = process.env.RESEND_MAIL_SERVICE_API_KEY // resendApiKey
