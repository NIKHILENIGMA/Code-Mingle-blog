import { KeyStore } from '../../Models/KeyStore'
import { IBaseRepository } from './IBaseRepository'

export interface IKeyStoreRepository extends IBaseRepository<KeyStore> {
    findByUserId(userId: string): Promise<KeyStore | null>
    findByAccessKey(accessTokenKey: string): Promise<KeyStore | null>
    findByRefreshKey(refreshTokenKey: string): Promise<KeyStore | null>
}
