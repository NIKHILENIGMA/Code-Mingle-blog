import { NextFunction, Request, Response } from 'express'
import httpResponseMessage from '../constant/httpResponseMessage'
// import logger from '../utils/logger'
// import { THttpError } from '../types/types'

const globalErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
        success: false,
        statusCode: httpResponseMessage.error.internalServerError.code,
        request: {
            ip: req.ip,
            method: req.method,
            url: req.url
        },
        message: httpResponseMessage.error.internalServerError.message,
        stack: err.stack
    
    })
    next()
}

export default globalErrorHandler
