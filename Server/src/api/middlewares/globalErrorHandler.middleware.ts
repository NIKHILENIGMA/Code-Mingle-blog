import { NextFunction, Request, Response } from 'express'
import { REQUESTS } from '@/types'
import { isProduction } from '@/config'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler = (error: REQUESTS.THttpError, _: Request, res: Response, __: NextFunction) => {
    const statusCode = error.statusCode || 500 // Default to 500 if undefined
    const message = error.message ? `Global Error: ${error.message}` : 'GE: Internal Server Error'
    const stack = error.stack || 'No stack trace available'

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        stack: isProduction ? undefined : stack
    })
}

export default globalErrorHandler
