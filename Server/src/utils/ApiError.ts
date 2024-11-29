import { NextFunction, Request } from 'express'

/**
 * Handles API errors by creating an error response object and passing it to the next middleware.
 *
 * @param {Error} err - The error object.
 * @param {Request} req - The Express request object.
 * @param {NextFunction} next - The Express next middleware function.
 * @param {number} [errorStatusCode=500] - The HTTP status code for the error response. Defaults to 500.
 * @returns {void}
 */

export const ApiError = (err: Error, req: Request, next: NextFunction, errorStatusCode: number = 500): void => {
    const errorResponse = {
        success: false,
        statusCode: errorStatusCode,
        request: {
            ip: req.ip,
            method: req.method,
            url: req.url
        },
        message: err instanceof Error ? err.message : 'Internal server error',
        data: null,
        trace: err instanceof Error ? {error: err.stack} : null
    }    

    return next(errorResponse)
}



// export class ApiError extends Error {
//     public success: boolean
//     public data: string | null
//     constructor(
//         public statusCode: number,
//         public message = 'Something went wrong',
//         public errors?: string[],
//         public stack = ''
//     ) {
//         super(message)
//         this.statusCode = statusCode
//         this.data = null
//         this.message = message
//         this.success = false
//         this.errors = errors || []

//         if (stack) {
//             this.stack = stack
//         } else {
//             Error.captureStackTrace(this, this.constructor)
//         }

//     }
// }


