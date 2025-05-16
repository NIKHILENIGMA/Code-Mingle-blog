// eslint-disable-next-line @typescript-eslint/no-unused-vars
import express from 'express'

declare global {
    namespace Express {
        interface Request {
            user?: {
                id?: string
                email?: string
                roleId?: string
                lastLoginAt?: Date
                
            }
            session?: {
                id?: string
                userId?: string
                accessToken?: string
                refreshToken?: string
                valid: boolean
            }
        }
    }
}
