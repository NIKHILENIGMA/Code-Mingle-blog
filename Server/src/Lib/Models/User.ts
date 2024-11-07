
export interface User {
    id: string
    email: string
    password: string
}

export interface ICreateUser {
    tokens: {
        accessToken: string
        refreshToken: string
    }
    newUser: User
}