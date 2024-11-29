import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { ApiError } from '../utils/ApiError'

export const validateSchema = (schema: z.Schema) => {
    return (req: Request, _: Response, next: NextFunction) => {
        try {
            schema.parse(req.body)
            next()
        } catch (error) {
            if (error instanceof z.ZodError) {
                return ApiError(new Error(error.errors[0].message), req, next, 400)
            }
            next(error)
        }
    }
}
