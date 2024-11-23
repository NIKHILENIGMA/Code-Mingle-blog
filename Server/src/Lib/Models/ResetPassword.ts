export interface ResetPassword {
    id: number
    userId: string
    resetToken: string
    expiresAt: string
    createdAt: Date
    updatedAt: Date
}

export interface resetToken {
    userId: string
    resetToken: string
    expiresAt: string
}
