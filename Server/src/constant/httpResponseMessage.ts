const httpResponseMessage = {
    success: {
        ok: {
            code: 200,
            message: 'OK'
        },
        created: {
            code: 201,
            message: 'Created'
        },
        accepted:{
            code: 204,
            message: 'No Content'
        },
        noContent: {
            code: 204,
            message: 'No Content'
        }
    },
    error: {
        badRequest:{
            code: 400,
            message: 'Bad Request'
        },
        unauthorized:{
            code: 401,
            message: 'Unauthorized'
        },        
        forbidden:{
            code: 403,
            message: 'Forbidden'
        },        
        notFound: {
            code: 404,
            message: 'Not Found'
        },
        conflict: {
            code: 409,
            message: 'Conflict'
        },
        tooManyRequests: {
            code: 429,
            message: 'Too Many Requests'
        },
        internalServerError: {
            code: 500,
            message: 'Internal Server Error'
        },
        notImplemented: {
            code: 501,
            message: 'Not Implemented'
        },
        badGateway: {
            code: 502,
            message: 'Bad Gateway'
        },

    }
}

export default httpResponseMessage
