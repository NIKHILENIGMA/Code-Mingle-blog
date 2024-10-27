class ApiError extends Error {
    public success: boolean
    public data: string | null
    constructor(
        public statusCode: number,
        public message = 'Something went wrong',
        public errors?: string[],
        public stack = ''
    ) {
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors || []

        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }

    }
}

export default ApiError
