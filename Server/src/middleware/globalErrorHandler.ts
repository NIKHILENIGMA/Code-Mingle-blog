import { Request, Response } from 'express'
import httpResponseMessage from '../constant/httpResponseMessage'

const globalErrorHandler = (err: Error, req: Request, res: Response) => {

    res.status(500).json({
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
