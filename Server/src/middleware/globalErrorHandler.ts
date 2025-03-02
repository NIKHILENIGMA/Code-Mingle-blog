import { NextFunction, Request, Response } from 'express'
import { THttpError } from '../types/types'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler = (error: THttpError, _: Request, res: Response, __: NextFunction) => {
    const statusCode = error.statusCode || 500 // Default to 500 if undefined
    const message = error.message || 'Internal Server Error'

    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })

}

export default globalErrorHandler
