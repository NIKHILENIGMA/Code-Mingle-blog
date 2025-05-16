import { NextFunction, Request, Response } from 'express'
import { AsyncHandler } from '@/utils'
import { StandardError } from '@/utils/Errors/StandardError'
import { InternalServerError } from '@/utils/Errors'

export const hasPermission = AsyncHandler(async (req: Request, _: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id

        await Promise.resolve(userId)
        next()
    } catch (error) {
        if(error instanceof StandardError){
            throw error
        }

        throw new InternalServerError('An unexpected error occurred while authorization')
    }
})
