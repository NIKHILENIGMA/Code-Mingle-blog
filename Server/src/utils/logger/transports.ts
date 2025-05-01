import path from 'node:path'
import { transports } from 'winston'
import { logFormats } from './formats'

/**
 * Creates and configures Winston transport instances for different logging purposes
 * @param logDir - Directory path where log files will be stored
 * @returns {Object} Object containing configured Winston transports:
 *   - console: Console transport for development logging
 *   - developmentFile: File transport for development logs
 *   - errorFile: File transport for error logs
 *   - exceptionFile: File transport for exception logs
 *   - combinedFile: File transport for combined logs in production format
 */
export const createTransports = (logDir: string) => ({
    console: new transports.Console({
        level: 'info', // level info
        format: logFormats.developmentFormat
    }),

    developmentFile: new transports.File({
        filename: path.join(logDir, 'development.logs'),
        level: 'info',
        format: logFormats.developmentFormat,
        maxsize: 1024 * 1024 * 5, // 5MB
        maxFiles: 5,
        tailable: true
    }),

    errorFile: new transports.File({
        filename: path.join(logDir, 'error.logs'),
        level: 'error',
        format: logFormats.errorFormat,
        maxsize: 1024 * 1024 * 5, // 5MB
        maxFiles: 5,
        tailable: true
    }),

    exceptionFile: new transports.File({
        filename: path.join(logDir, 'exceptions.logs'),
        format: logFormats.errorFormat,
        handleExceptions: true,
        maxsize: 1024 * 1024 * 5, // 5MB
        maxFiles: 5
    }),

    combinedFile: new transports.File({
        filename: path.join(logDir, 'combined.logs'),
        format: logFormats.productionFormat,
        maxsize: 1024 * 1024 * 5, // 5MB
        maxFiles: 5,
        tailable: true
    })
})
