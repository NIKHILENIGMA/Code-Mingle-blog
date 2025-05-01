import { isProduction } from '@/config'
import { NextFunction, Request } from 'express'
import { logger } from './logger/index'
import { ERROR_TYPES } from '@/constant/error-types'

type ERROR_TYPES = { code: number; message: string; subType?: string }

/**
 * Handles API errors by creating an error response object and passing it to the next middleware.
 *
 * @param {Error} err - The error object.
 * @param {Request} req - The Express request object.
 * @param {NextFunction} next - The Express next middleware function.
 * @param {number} [errorStatusCode=500] - The HTTP status code for the error response. Defaults to 500.
 * @returns {void}
 */

export const ApiError = (err: Error | AppError, req: Request, next: NextFunction, errorStatusCode?: number): void => {
    let statusCode = errorStatusCode || 500

    // Check if the error is an instance of AppError and set the status code accordingly
    if (err instanceof AppError && !errorStatusCode) {
        statusCode = err.statusCode
    }

    // Error response object
    const errorResponse = {
        success: false,
        statusCode: statusCode,
        request: {
            ip: req.ip,
            method: req.method,
            url: req.url
        },
        message: err instanceof Error ? err.message : 'Internal server error',
        data: null,
        trace: err instanceof Error && !isProduction ? { error: err.stack } : null,
        errorType: err instanceof AppError ? err?.subType : undefined
    }

    // Log the error details if not in production
    if (!isProduction) {
        logger.error('API Error:', {
            message: errorResponse.message, // Error message
            statusCode: errorResponse.statusCode, // HTTP status code
            request: errorResponse.request, // Request details
            trace: errorResponse.trace, // Stack trace (if available)
            errorType: errorResponse.errorType, // Error type (if available)
            time: new Date().toISOString() // Timestamp of the error
        })
    }

    return next(errorResponse)
}

/**
 * Application error class that standardizes error handling
 *
 * @class AppError
 * @property {number} statusCode - The HTTP status code for the error.
 * @property {string} subType - Optional subtype of the error.
 * @property {Error} originalError - Optional original error object.
 */
export class AppError extends Error {
    public statusCode: number
    public subType?: string
    public originalError?: Error

    constructor(message: string, statusCode: number = 500, subType?: string, originalError?: Error) {
        super(message)
        this.name = 'AppError'
        this.statusCode = statusCode
        this.subType = subType
        this.originalError = originalError
    }

    /**
     * Factory method to create error from ERROR_TYPES
     */
    static from(errorType: ERROR_TYPES, originalError?: Error): AppError {
        return new AppError(errorType.message, errorType.code, errorType.subType, originalError)
    }
}
