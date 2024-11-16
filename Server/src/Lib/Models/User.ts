// src/models/User.ts
export interface User {
    id: string
    email: string
    firstName?: string | null
    lastName?: string | null
    username?: string | null
    password: string
    dob?: Date | null
    bio?: string | null
    avatarImg?: string | null
    coverImg?: string | null
    role: string
    createdAt: Date
    updatedAt: Date
}

export interface UserDTO {
    tokens: {
        accessToken: string
        refreshToken: string
    }
    userData: {
        id: string
        email: string
        firstName?: string | null
        lastName?: string | null
        username?: string | null
        dob?: Date | null
        bio?: string | null
        avatarImg?: string | null
        coverImg?: string | null
        role: string
    }
}

export interface ICreateUser {
    newUser: User
}
