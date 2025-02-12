export default {
    SUCCESS: (message?: string) => ({ code: 200, message: `The operation was successful: ${message}` }),
    NOT_FOUND: (message?: string) => ({ code: 404, message: `The requested resource was not found: ${message}` }),
    BAD_REQUEST: (message?: string) => ({ code: 400, message: `The request was invalid: ${message}` }),
    METHOD_FAILED: (message?: string) => ({ code: 424, message: `The operation failed: ${message}` }),
    ALREADY_EXIST: (email?: string) => ({ code: 409, message: `The user with ${email} already exists` }),
    INTERNAL_SERVICE: (message?: string) => ({ code: 500, message: `Internal service error: ${message}` }),
    MISSING_ID: (message?: string) => ({ code: 400, message: `Missing id in request params for ${message} operation` }),
    HEALTH_CHECK: { code: 200, message: 'Server is up and running' },
    INVALID_PASSWORD: { code: 401, message: 'Provided password is incorrect' },
    INVALID_TOKEN: { code: 401, message: 'Provided token is invalid' },
    TOKEN_EXPIRED: { code: 401, message: 'Provided token is expired' },
    MISSING_USER: { code: 400, message: 'User not found in request' },
    UNAUTHORIZED: { code: 401, message: 'Unauthorized request' },
    MISSING_BODY: { code: 400, message: 'Request body is missing' },
    MISSING_FILE: { code: 400, message: 'Request file is missing' }
}
