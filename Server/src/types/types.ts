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

export interface Context {
    alt: string
    user: string 
}

export interface UploadOptions {
    folder: string
    resource_type: 'auto' | 'image' | 'raw' | 'video'
    overwrite: boolean
    invalidate: boolean
    public_id: string
    allowed_formats: string[]
    format: 'webp'
    quality: number 
    max_bytes: number
    context: Context
}

export interface CloundinaryOption {
    folder: string
    public_name: string
    quality: number
    resource: 'image' | 'auto' | 'raw' | 'video'
    altName: string
}