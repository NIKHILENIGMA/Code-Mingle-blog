import { Request } from 'express'
import { User } from '../models/user.model'
import { KeyStore } from '../models/key-store.model'

/**
 * The custom request object for authenticated requests.
 */

// app-request.d.ts
declare interface ProtectedRequest extends Request {

    user?: User;
    keyStore?: KeyStore;
    accessToken?: string;

}


