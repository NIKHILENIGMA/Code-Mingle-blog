import dotenvFlow from 'dotenv-flow'

dotenvFlow.config()

// configMailService
export const resendConfig = {
    resendApiKey: process.env.RESEND_MAIL_SERVICE_API_KEY
}