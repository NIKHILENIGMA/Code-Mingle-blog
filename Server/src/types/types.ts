// Error Types
export type THttpError = {
    success: boolean
    statusCode: number
    request: {
        ip?: string | null
        method: string
        url: string
    }
    message: string
    data: unknown
    trace?: object | null
    stack?: string | null
}

// Reponse Types
export type THttpResponse = {
    success: boolean
    statusCode: number
    request: {
        ip?: string | null
        method: string
        url: string
    }
    message: string
    data?: unknown
}

export interface UserDTO {
    id: string
    email: string
    firstName?: string | null
    lastName?: string | null
    username?: string | null
    dob?: Date | null
    bio?: string | null
    createdAt: Date
    updatedAt: Date
}
