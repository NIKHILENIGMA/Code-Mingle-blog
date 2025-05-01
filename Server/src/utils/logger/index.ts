import winston from 'winston'
import { createTransports } from './transports'
import { logFormats } from './formats'
import { LOG_DIR, LOG_LEVELS } from '@/constant'
import { isProduction } from '@/config'

class Logger {
    static instance: winston.Logger 

    public static getInstance(): winston.Logger {
        if (!Logger.instance) {
            const transports = createTransports(LOG_DIR)

            Logger.instance = winston.createLogger({
                level: process.env.LOG_LEVEL || 'info',
                levels: LOG_LEVELS,
                format: isProduction ? logFormats.productionFormat : logFormats.developmentFormat,
                transports: [
                    transports.console,
                    transports.developmentFile,
                    transports.errorFile,
                    transports.combinedFile
                ],
                exceptionHandlers: [transports.exceptionFile],
                rejectionHandlers: [transports.exceptionFile],
                exitOnError: false,
            })
        }

        return Logger.instance;
    }
}


export const logger = Logger.getInstance()