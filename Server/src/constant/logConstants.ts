import path from 'path'
// import * as fs from 'fs'

export const LOG_DIR = path.join(__dirname, '..', '..', 'logs')

export const FORMAT_TIMESTAMP = 'YYYY-MM-DD HH:mm:ss.SSS'

export const LOG_LEVELS = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
}
