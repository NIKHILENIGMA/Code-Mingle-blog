/**
 * Error types for the application.
 * These are used to standardize error handling and responses.
 * Each error type has a status code and a message.
 *
 * @module error-types
 * @property {number} status - The HTTP status code for the error.
 * @property {string} message - The error message to be returned.
 */
export const ERROR_TYPES = {
    // Client Errors (4xx)
    BAD_REQUEST: (message = 'Bad request') => ({
        status: 400,
        message
    }),

    UNAUTHORIZED: (message = 'Unauthorized') => ({
        status: 401,
        message
    }),

    FORBIDDEN: (message = 'Access forbidden') => ({
        status: 403,
        message
    }),

    NOT_FOUND: (message = 'Resource Not found') => ({
        status: 404,
        message
    }),

    CONFLICT: (message = 'Conflict') => ({
        status: 409,
        message
    }),

    UNPROCESSABLE_ENTITY: (message = 'Unprocessable entity') => ({
        status: 422,
        message
    }),

    VALIDATION_ERROR: (message = 'Validation failed') => ({
        status: 422,
        message
    }),

    // Server Errors (5xx)
    INTERNAL_SERVICE: (message = 'Internal server error') => ({
        code: 500,
        message
    }),
    DATABASE_ERROR: (message = 'Database operation failed') => ({
        code: 500,
        message,
        subType: 'DATABASE_ERROR'
    }),
    SERVICE_ERROR: (message = 'Service operation failed') => ({
        code: 500,
        message,
        subType: 'SERVICE_ERROR'
    }),
    EXTERNAL_API_ERROR: (message = 'External API failed') => ({
        code: 502,
        message
    }),
    METHOD_FAILED: (message = 'Method execution failed') => ({
        code: 500,
        message,
        subType: 'METHOD_FAILED'
    })
}
