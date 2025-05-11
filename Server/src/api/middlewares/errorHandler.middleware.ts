import { isProduction } from '@/config'
import { StandardError } from '@/utils/Errors/StandardError'
import { logger } from '@/utils/logger'
import { NextFunction, Request, Response } from 'express'

/**
 * Middleware function to handle errors in the application.
 *
 * This function captures errors thrown during the request lifecycle,
 * formats them into a standardized error response object, logs the error details,
 * and sends the response back to the client. It supports both generic `Error` objects
 * and custom `StandardError` instances.
 *
 * @param err - The error object, which can be either a generic `Error` or a custom `StandardError`.
 * @param req - The Express `Request` object representing the HTTP request.
 * @param res - The Express `Response` object used to send the HTTP response.
 *
 * @remarks
 * - In production mode, sensitive information such as stack traces and client IP addresses
 *   are removed from the response for security purposes.
 * - The error details are logged using the `logger` utility for debugging and monitoring.
 *
 * @example
 * ```typescript
 * app.use((err, req, res, next) => {
 *   errorHandler(err, req, res);
 * });
 * ```
 *
 * @throws Will not throw an error itself but ensures the error is properly handled and logged.
 */

export const errorHandler = (err: Error | StandardError, req: Request, res: Response, next: NextFunction) => {
    
    // Error Response Object
    const errorResponse = {
        success: false,
        statusCode: 500,
        request: {
            ip: req.ip,
            method: req.method,
            url: req.url,
            'user-agent': req.headers['user-agent']
        },
        message: 'The server encountered an error while processing your request.',
        data: null,
        errors: [{ message: 'Internal Server Error' }],
        trace: isProduction ? undefined : { error: err.stack }
    }

    // Check if the error is an instance of StandardError or a generic Error
    if (err instanceof StandardError) {
        errorResponse.statusCode = err.StatusCode
        errorResponse.errors = err.serialize()
        errorResponse.message = err.message
    } else if (err instanceof Error) {
        errorResponse.message = err.message || 'Internal Server Error'
        errorResponse.errors = [{ message: err.message || 'Something went wrong' }]
    }

    // Log the error details
    logger.error('Error Handler:', {
        statusCode: errorResponse.statusCode,
        message: errorResponse.message,
        request: {
            ip: req.ip,
            method: req.method,
            url: req.url,
            'user-agent': req.headers['user-agent']
        },
        trace: errorResponse.trace?.error,
        errors: errorResponse.errors,
        time: new Date().toISOString()
    })

    // Remove sensitive information in production
    if (isProduction) {
        delete errorResponse.trace
        delete errorResponse.request['user-agent']
        delete errorResponse.request.ip
    }

    if (res.headersSent) {
        return next(err) // If headers are already sent, delegate to the default Express error handler
        
    }

    // Send the error response
    res.status(errorResponse.statusCode).json(errorResponse)
}
