import dotenvFlow from 'dotenv-flow'

dotenvFlow.config()

interface IAppConfig {
    ENV: string | undefined
    PORT: string | undefined
    SERVER_URL: string | undefined
    DATABASE_URL: string | undefined
}

export const isProduction: boolean = process.env.NODE_ENV === 'production'

export const appConfig: IAppConfig = {
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

export const ARGON_MEMORY_COST: number = Number(process.env.ARGON_MEMORY_COST) || 2 ** 16 // 64MB RAM usage
export const ARGON_TIME_COST: number = Number(process.env.ARGON_TIME_COST) || 3 // 3 iterations
export const ARGON_PARALLELISM: number = Number(process.env.ARGON_PARALLELISM) || 2 // Parallelism factor

export const USER_ROLE_ID: string = 'cmamn2isn0002i1hs0sb0ba2j'

export const JWT_ISSUER = String(process.env.JWT_ISSUER) || 'NodeDrafts'
export const JWT_AUDIENCE = String(process.env.JWT_AUDIENCE) || 'NodeDrafts'
export const JWT_ROLE = String(process.env.JWT_ROLE) || 'user'
export const JWT_SECRET = String(process.env.JWT_SECRET) || 'your-secret-key'
export const JWT_ALGORITHM = String(process.env.JWT_ALGORITHM) || 'RS256'
export const ACCESS_TOKEN_VALIDITY_IN_SEC = Number(process.env.ACCESS_TOKEN_VALIDITY_IN_SEC) || 3600 // 1 hour
export const REFRESH_TOKEN_VALIDITY_IN_SEC = Number(process.env.REFRESH_TOKEN_VALIDITY_IN_SEC) || 86400 // 24 hours
export const RESET_TOKEN_VALIDITY_IN_SEC = Number(process.env.RESET_TOKEN_VALIDITY_IN_SEC) || 3600 // 1 hour

export const PUBLIC_KEY_PATH = String(process.env.PUBLIC_KEY_PATH) || '../../keys/public_key.pem' // Path to your public key file
export const PRIVATE_KEY_PATH = String(process.env.PRIVATE_KEY_PATH) || '../../keys/private_key.pem' // Path to your private key file
