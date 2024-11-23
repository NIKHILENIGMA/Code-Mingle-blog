import { Request, Response } from 'express'
import { THttpError } from '../types/types'
import httpResponseMessage from '../constant/httpResponseMessage'

const globalErrorHandler = (err: THttpError, req: Request, res: Response) => {
    res.status(err.statusCode || 500).json({
        success: false,
        statusCode: httpResponseMessage.error.internalServerError.code,
        request: {
            ip: req.ip,
            method: req.method,
            url: req.url
        },
        message: httpResponseMessage.error.internalServerError.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    })
}

export default globalErrorHandler
