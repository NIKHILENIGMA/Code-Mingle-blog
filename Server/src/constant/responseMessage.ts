export default {
    SUCCESS: (message: string) => `The operation was successful: ${message}`,
    NOT_FOUND: (message: string) => `The requested resource was not found: ${message}`,
    BAD_REQUEST: (message: string) => `The request was invalid: ${message}`,
    METHOD_FAILED: (message: string) => `The operation failed: ${message}`,
    ALREADY_EXIST: (email: string) => `The user with ${email} already exists`,
    INTERNAL_SERVICE: (message: string)=> `Internal service error: ${message}`,
    INVALID_PASSWORD: 'Provided password is incorrect',
    INVALID_TOKEN: 'Provided token is invalid',
    TOKEN_EXPIRED: 'Provided token is expired',
    MISSING_ID:(message: string) => `Missing id in request params for ${message} operation`,
    MISSING_USER: 'User not found in request',
    UNAUTHORIZED: 'Unauthorized request',
    MISSING_BODY: 'Request body is missing',
    MISSING_FILE: 'Request file is missing',
    
}