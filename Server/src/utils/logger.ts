import path from 'path'
import { createLogger, format, transports } from 'winston'

const { combine, timestamp, json, colorize } = format

// Custom format for console logging with colors

const consoleLogFormat = format.combine(
    format.colorize(),
    format.printf(({ level, message }) => {
        return `${level}: ${message}`
    })
)

// Create a winston logger
const logger = createLogger({
    level: 'info',
    format: combine(
        colorize(),
        timestamp(), 
        json()
    ),
    transports: [
        new transports.Console({
            format: consoleLogFormat,
        }),
        new transports.File({ 
            filename: path.join(__dirname, '../', '../', 'logs', `${process.env.NODE_ENV}.log`), 
        })
    ]
})

export default logger