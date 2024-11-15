import { KeyStore, UserTokenKeys } from '../../Models/KeyStore'

export interface IKeyStoreRepository  {
    create(data: UserTokenKeys): Promise<KeyStore>
    findByUserId(userId: string): Promise<KeyStore | null>
    findByAccessTokenKey(accessTokenKey: string): Promise<KeyStore | null>
    findByRefreshTokenKey(refreshTokenKey: string): Promise<KeyStore | null>
}
