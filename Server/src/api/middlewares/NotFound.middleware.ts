import { NextFunction, Request, Response } from 'express'
import { NotFoundError } from '@/utils/Errors'



export const notFound = (req: Request, _: Response, next: NextFunction): void => {
    next(new NotFoundError(`Route not found ${req.originalUrl} `))
}
