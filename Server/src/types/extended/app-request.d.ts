// eslint-disable-next-line @typescript-eslint/no-unused-vars
import express from 'express'
import { UserDTO } from '@/features/authentication/auth.types'
import { FlattenedPermissions } from '@/utils/FlatPermission'
import { Comment, Post } from '@prisma/client'

declare global {
    namespace Express {
        interface Request {
            user?: UserDTO,
            session?: {
                id?: string
                userId?: string
                accessToken?: string
                refreshToken?: string
                valid: boolean
            }
            rolePermissions?: FlattenedPermissions
            resourceData: {
                post?: Post
                comment?: Comment
            }

        }
    }
}
