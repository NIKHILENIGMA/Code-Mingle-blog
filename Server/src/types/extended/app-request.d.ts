import { ISaveDraftBody } from '../../Lib/Models/Blog'
import { Request } from 'express'
import { User } from '../models/user.model'
import { IForgotPassword, ILoginUser, ISignupUserBody } from '../../Lib/Models/User'
import { KeyStore } from '@/Lib/Models/KeyStore'
import { User } from '@/Lib/Models/User'

/**
 * The custom request object for authenticated requests.
 */

// app-request.d.ts
/**
 * Extends the base Request interface to include authentication and user-related properties
 * @interface ProtectedRequest
 * @extends {Request}
 * @property {Pick<User, 'id' | 'email' | 'role'>} [user] - Selected user properties for the authenticated user
 * @property {KeyStore} [keyStore] - Key storage for authentication tokens
 * @property {string} [accessToken] - JWT access token for authentication
 * @property {string} [refreshToken] - JWT refresh token for renewing access
 */
export interface ProtectedRequest extends Request {
    user?: Pick<User, 'id' | 'email' | 'role'>
    keyStore?: KeyStore
    accessToken?: string
    refreshToken?: string
    resource?: object | null
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
