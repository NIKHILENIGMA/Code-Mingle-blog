import { IGenericsRepository } from './IGenericsRepository'
import { KeyStore } from '../../Models/KeyStore'

export interface IKeyStoreRepository extends IGenericsRepository<KeyStore> {
    findByUserId(userId: string): Promise<KeyStore | null>
    findByAccessTokenKey(accessTokenKey: string): Promise<KeyStore | null>
    findByRefreshTokenKey(refreshTokenKey: string): Promise<KeyStore | null>
}
