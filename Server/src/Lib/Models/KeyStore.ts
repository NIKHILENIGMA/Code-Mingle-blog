export interface KeyStore {
    id: number
    userId: string
    accessKey: string
    refreshKey: string
    createdAt: Date
    updatedAt: Date
}

export interface UserTokenKeys {
    userId: string
    accessKey: string
    refreshKey: string
}

export interface Tokens {
    accessToken: string
    refreshToken: string
}

export interface TokenKeys {
    accessKey: string
    refreshKey: string
}

export interface verifyResetToken {
    userId: string
    resetKey: string
}
