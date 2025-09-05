import { format } from 'winston'
import { IS_PRODUCTION } from '@/config'
import { FORMAT_TIMESTAMP } from '@/constant'

/**
 * A collection of logging formats used for different environments and purposes.
 */
export const logFormats = {
    /**
     * Error format for logging errors.
     * Formats the log entry as a JSON string containing the timestamp, log level,
     * message, stack trace (if not in production), additional metadata, environment,
     * and service name.
     *
     * @example
     * {
     *   "timestamp": "2023-01-01T00:00:00.000Z",
     *   "level": "ERROR",
     *   "message": "An error occurred",
     *   "stack": "Error: ...",
     *   "environment": "development",
     *   "service": "api-service"
     * }
     */

    // Error format
    errorFormat: format.printf((info) => {
        const { timestamp, level, message, stack, ...meta } = info

        return JSON.stringify(
            {
                timestamp,
                level: level.toLocaleUpperCase(),
                message,
                stack: !IS_PRODUCTION ? stack : undefined,
                ...meta,
                environment: !IS_PRODUCTION ? 'development' : '',
                service: process.env.SERVICE_NAME || 'api-service'
            },
            null,
            2
        )
    }),

    /**
     * Development format for logging in development environments.
     * Combines timestamp, colorization, and custom formatting for console output.
     *
     * @example
     * [2023-01-01 00:00:00.000] [INFO] Server started { "port": 3000 }
     */
    developmentFormat: format.combine(
        format.timestamp({ format: FORMAT_TIMESTAMP }),
        format.colorize(),
        format.printf(({ timestamp, level, message, ...meta }) => {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            return `[${timestamp}] [${level}] ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''}`
        })
    ),

    /**
     * Production format for logging in production environments.
     * Combines timestamp and JSON formatting for structured logs.
     *
     * @example
     * {
     *   "timestamp": "2023-01-01T00:00:00.000Z",
     *   "level": "INFO",
     *   "message": "Server started",
     *   "port": 3000
     * }
     */
    productionFormat: format.combine(format.timestamp({ format: FORMAT_TIMESTAMP }), format.json())
}
