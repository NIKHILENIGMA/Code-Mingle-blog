import { ISaveDraftBody } from '../Lib/Models/Blog'
import { Request } from 'express'
import { User } from '../models/user.model'
import { KeyStore } from '../models/key-store.model'
import { IForgotPassword, ILoginUser, ISignupUserBody } from '../Lib/Models/User'

/**
 * The custom request object for authenticated requests.
 */

// app-request.d.ts
declare interface ProtectedRequest extends Request {
    user?: Pick<User, 'id' | 'email' | 'role'>
    keyStore?: KeyStore
    accessToken?: string
    refreshToken?: string
}

declare interface ISignupUserRequest extends Request {
    body: ISignupUserBody
}

declare interface ILoginUserRequest extends Request {
    body: ILoginUser
}

declare interface IForgotPasswordRequest extends Request {
    body: IForgotPassword
}

declare interface IResetPasswordRequest extends Request {
    body: {
        token: string
        newPassword: string
    }
}

declare interface ICurrentUser extends Request {
    user: User
}

// Draft controller
declare interface ISaveDraftRequest extends Request {
    body: ISaveDraftBody
}
