import { Request, Response } from 'express'
import { THttpResponse } from '@/types/api/responses.types'
import config from '../config/config'
import logger from './logger'
import { EApplicationEnvironment } from '../constant/application'


/**
 * Sends a standardized API response.
 *
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 * @param responseStatusCode - The status code to send in the response.
 * @param responseMessage - The message to send in the response.
 * @param data - Optional data to include in the response. Defaults to null.
 *
 * @returns void
 */

export const ApiResponse = (req: Request, res: Response, responseStatusCode: number, responseMessage: string, data: unknown = null): void => {
    const response: THttpResponse = {
        success: true,
        statusCode: responseStatusCode,
        request: {
            ip: req.ip || null,
            method: req.method,
            url: req.url
        },
        message: responseMessage,
        data: data
    }

    logger.info(`${response.request.method} ${response.request.url} ${response.statusCode} ${response.message}`)

    if (config.ENV === EApplicationEnvironment.PRODUCTION) {
        delete response.request.ip
    }

    res.status(responseStatusCode).json(response)
}



// class ApiResponse<T> {
//     statusCode: number
//     data: T
//     message: string
//     success: boolean
//     constructor(statusCode: number, data: T, message: string = 'Success') {
//         this.statusCode = statusCode
//         this.data = data
//         this.message = message
//         this.success = statusCode < 400
//     }
// }

// export { ApiResponse }
