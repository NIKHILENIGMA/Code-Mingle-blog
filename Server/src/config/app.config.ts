import dotenvFlow from 'dotenv-flow'

dotenvFlow.config()

export const isProduction = process.env.NODE_ENV === 'production'

export const appConfig = {
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


export const keyPath = {
    PUBLIC_KEY_PATH: (process.env.PUBLIC_KEY_PATH as string) || '../../keys/public_key.pem',
    PRIVATE_KEY_PATH: (process.env.PRIVATE_KEY_PATH as string) || '../../keys/private_key.pem'
}
