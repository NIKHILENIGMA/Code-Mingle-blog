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

export interface IUser {
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
    createdAt: Date
    updatedAt: Date
}

export interface ISignupUserBody {
    firstName?: string
    lastName?: string
    email: string
    password: string
}

export interface ILoginUser {
    email: string
    password: string
}

export interface IForgotPassword {
    email: string
}