import { corsOptions } from './corsOptions'
import responseMessage from './responseMessage'
import { LOG_DIR, FORMAT_TIMESTAMP, LOG_LEVELS } from './logConstants'

export { corsOptions, responseMessage, LOG_DIR, FORMAT_TIMESTAMP, LOG_LEVELS }


export const HTTP_STATUS_CODES = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500
}