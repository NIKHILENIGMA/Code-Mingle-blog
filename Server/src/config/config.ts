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
    reset_validity: process.env.RESET_TOKEN_VALIDITY_IN_SEC,
}

export const configMailService = {
    resendApiKey: process.env.RESEND_MAIL_SERVICE_API_KEY,
}
