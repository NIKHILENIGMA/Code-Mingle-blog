// src/utils/logger/morgan.ts
import { IncomingMessage, ServerResponse } from 'http'
import morgan from 'morgan'
import { logger } from './index'

interface StreamObject {
    method: string
    url: string
    status: number
    contentLength: string | undefined
    responseTime: number
    timestamp: string
    userAgent: string | undefined
    remoteAddress: string | undefined
    httpVersion: string
}

/**
 * Morgan format function to log HTTP requests in a structured format.
 * @param tokens - The morgan token indexer.
 * @param req - The incoming HTTP request.
 * @param res - The outgoing HTTP response.
 * @returns A JSON string with the log information.
 */

const morganFormat = (tokens: morgan.TokenIndexer, req: IncomingMessage, res: ServerResponse) => {
    return JSON.stringify({
        method: tokens.method(req, res),
        url: tokens.url(req, res),
        status: Number(tokens.status(req, res)),
        contentLength: tokens.res(req, res, 'content-length'),
        responseTime: Number(tokens['response-time'](req, res)),
        timestamp: tokens.date(req, res, 'iso'),
        userAgent: tokens['user-agent'](req, res),
        remoteAddress: tokens['remote-addr'](req, res),
        httpVersion: tokens['http-version'](req, res)
    })
}

export const morganMiddleware = morgan(morganFormat, {
    stream: {
        write: (message: string) => {
            const logObject = JSON.parse(message) as StreamObject
            logger.http('HTTP Request', logObject)
        }
    },
    skip: (_, res) => process.env.NODE_ENV === 'production' && res.statusCode < 400
})
