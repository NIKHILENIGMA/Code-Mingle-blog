import winston from 'winston'
import { createTransports } from './transports'
import { logFormats } from './formats'
import { LOG_DIR, LOG_LEVELS } from '@/constant'
import { isProduction } from '@/config'

/**
 * Logger class implementing the Singleton pattern for winston logger configuration
 */
class Logger {
    /** Static instance of winston Logger */
    static instance: winston.Logger

    /**
     * Gets the singleton instance of the winston logger
     * Creates a new logger instance if one doesn't exist
     * Configures logging levels, formats and transports
     * @returns {winston.Logger} The configured winston logger instance
     */
    public static getInstance(): winston.Logger {
        if (!Logger.instance) {
            const transports = createTransports(LOG_DIR)

            Logger.instance = winston.createLogger({
                level: process.env.LOG_LEVEL || 'info',
                levels: LOG_LEVELS,
                format: isProduction ? logFormats.productionFormat : logFormats.developmentFormat,
                transports: [transports.console, transports.developmentFile, transports.errorFile, transports.combinedFile],
                exceptionHandlers: [transports.exceptionFile],
                rejectionHandlers: [transports.exceptionFile],
                exitOnError: false
            })
        }

        return Logger.instance
    }
}

export const logger = Logger.getInstance()
