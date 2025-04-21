// Error Types
/**
 * Type definition for HTTP error responses
 * @typedef {Object} THttpError
 * @property {boolean} success - Indicates if the request was successful
 * @property {number} statusCode - The HTTP status code
 * @property {Object} request - Information about the request
 * @property {string|null} [request.ip] - The IP address of the requester
 * @property {string} request.method - The HTTP method used
 * @property {string} request.url - The URL that was requested
 * @property {string} message - The error message
 * @property {unknown} data - Additional error data
 * @property {object|null} [trace] - Stack trace information
 * @property {string|null} [stack] - Error stack trace
 */

export type THttpError = {
    success: boolean
    statusCode: number
    request: {
        ip?: string | null
        method: string
        url: string
    }
    message: string
    data: unknown
    trace?: object | null
    stack?: string | null
}


// Request Body Types
/**
 * Interface for the request body when signing up a user
 * @interface ISignupUserBody
 * @typedef {Object} ISignupUserBody
 * @property {string} email - The user's email address
 * @property {string} password - The user's password
 */
export interface ILoginUser {
    email: string
    password: string
}


