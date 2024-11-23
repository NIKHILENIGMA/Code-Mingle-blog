import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

export const validateSchema = (schema: z.Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body)
            next()
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({
                    message: error.errors.map((err) => ({
                        field: err.path.join('.'),
                        message: err.message
                    }))
                })
            }
            next(error)
        }
    }
}
