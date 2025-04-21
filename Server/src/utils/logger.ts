// src/logger.ts
import { createLogger, format, transports } from 'winston'
import * as fs from 'fs'
import * as path from 'path'
import { isProduction } from '@/config'



// Ensure log directory exists
const logDir = path.join(__dirname, '..', '..', 'logs')
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir)
}

const logger = createLogger({
    level: 'info',
    format: isProduction ? format.json() : format.combine(format.colorize(), format.simple()),
    transports: [
        new transports.Console({
            level: 'info'
        }),
        new transports.File({
            filename: path.join(logDir, 'development.logs'),
            level: 'info'
        }),
        new transports.File({
            filename: path.join(logDir, 'error.logs'),
            level: 'error'
        })
    ]
})

// Stream to be used by Morgan
export const winstonStream = {
    write: (message: string) => logger.info(message.trim())
}

export default logger
