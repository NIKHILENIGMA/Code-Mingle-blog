import { Response } from 'express'

interface SuccessResponse<T> {
    status: boolean
    message: string
    statusCode: number
    data?: T | object
}

/**
 * Sends a success response with a standardized format
 * @template T - Type of the data payload
 * @param {Response} res - Express response object
 * @param {string} message - Success message to be included in response
 * @param {T | null} [data=null] - Optional data payload to be included in response
 * @param {number} [statusCode=200] - HTTP status code for the response
 * @returns {void}
 */
export const successResponse = <T>({
    res,
    statusCode = 200,
    message,
    data,
}: {
    res: Response
    message: string
    data?: T
    statusCode: number
}): void => {
    const code = statusCode // Default to 200 if no status code is provided
    const response: SuccessResponse<T> = {
        status: true, // Indicates success
        statusCode, // HTTP status code
        message, // Success message
        data // Optional data payload
    }
    res.status(code).json(response)
}
