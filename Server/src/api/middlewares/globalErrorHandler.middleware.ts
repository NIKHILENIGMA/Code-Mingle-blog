import { NextFunction, Request, Response } from 'express'
import { REQUESTS } from '@/types'
import { isProduction } from '@/config'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler = (error: REQUESTS.THttpError, req: Request, res: Response, __: NextFunction) => {
    const statusCode = error.statusCode || 500 // Default to 500 if undefined
    const message = error.message ? error.message : 'GE: Internal Server Error'
    const stack = error.stack || 'No stack trace available'

    if (message.includes('PrismaClientKnownRequestError')) {
        const prismaError = error as unknown as { code: string; message: string; meta: { target: string[] } }
        const errorMessage = `Prisma Error: ${prismaError.code} - ${prismaError.message}`
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: errorMessage,
            request: {
                ip: req.ip,
                method: req.method,
                url: req.url
            },
            data: null,
            trace: !isProduction ? { error: error.stack } : null
        })
        return
    }

    if (!error.statusCode) {
        const defaultError = {
            success: false,
            statusCode: 500,
            request: {
                ip: req.ip,
                method: req.method,
                url: req.url
            },
            message: error instanceof Error ? error.message : 'Internal server error',
            data: null,
            trace: !isProduction ? { error: error.stack } : null
        }

        res.status(500).json(defaultError)
        return
    }

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        request: {
            ip: req.ip,
            method: req.method,
            url: req.url
        },
        data: null,
        trace: !isProduction ? { error: error.stack } : null,
        stack: isProduction ? undefined : stack
    })
}

export default globalErrorHandler
