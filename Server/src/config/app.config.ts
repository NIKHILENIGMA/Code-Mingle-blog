import { ROLE } from '@/types/common/enum.types'
import dotenvFlow from 'dotenv-flow'
import path from 'path'

dotenvFlow.config()

interface IAppConfig {
    ENV: string | undefined
    PORT: string | undefined
    SERVER_URL: string | undefined
    DATABASE_URL: string | undefined
}

// Check if the environment is production
export const isProduction: boolean = process.env.NODE_ENV === 'production'

// Check if the environment is development
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

// Argon2 Configuration
export const ARGON_MEMORY_COST: number = Number(process.env.ARGON_MEMORY_COST) || 2 ** 16 // 64MB RAM usage
export const ARGON_TIME_COST: number = Number(process.env.ARGON_TIME_COST) || 3 // 3 iterations
export const ARGON_PARALLELISM: number = Number(process.env.ARGON_PARALLELISM) || 2 // Parallelism factor

// User Role ID
// export const USER_ROLE_ID: string = 'cmamn2isn0002i1hs0sb0ba2j'

// JWT Configuration
export const JWT_ISSUER = String(process.env.JWT_ISSUER) || 'NodeDrafts'
export const JWT_AUDIENCE = String(process.env.JWT_AUDIENCE) || 'NodeDrafts'
export const JWT_ROLE = String(process.env.JWT_ROLE) || ROLE.USER 
export const JWT_ALGORITHM = String(process.env.JWT_ALGORITHM) || 'RS256'
export const ACCESS_TOKEN_VALIDITY_IN_SEC = Number(process.env.ACCESS_TOKEN_VALIDITY_IN_SEC) || 3600 // 1 hour
export const REFRESH_TOKEN_VALIDITY_IN_SEC = Number(process.env.REFRESH_TOKEN_VALIDITY_IN_SEC) || 86400 // 24 hours
export const RESET_TOKEN_VALIDITY_IN_SEC = Number(process.env.RESET_TOKEN_VALIDITY_IN_SEC) || 3600 // 1 hour

// Paths to Key Files
export const PRIVATE_KEY_PATH = path.resolve(process.cwd(), process.env.PRIVATE_KEY_PATH || './keys/private.pem')
export const PUBLIC_KEY_PATH = path.resolve(process.cwd(), process.env.PUBLIC_KEY_PATH || './keys/public.pem')
