import { KeyStore } from '../../Models/KeyStore'
import { IBaseRepository } from './IBaseRepository'

export interface IKeyStoreRepository extends IBaseRepository<KeyStore> {
    findKeyStoreByUserId(userId: string): Promise<KeyStore | null>
    findKeyStoreByAccessKey(accessTokenKey: string): Promise<KeyStore | null>
    findKeyStoreByIdAndRefreshKey(userId: string, refreshTokenKey: string): Promise<KeyStore | null>
    deleteKeyStoreByRefreshKey(refreshTokenKey: string): Promise<void>
    
}
