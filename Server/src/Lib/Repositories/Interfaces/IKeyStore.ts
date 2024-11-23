import { KeyStore } from '../../Models/KeyStore'
import { IBaseRepository } from './IBaseRepository'

export interface IKeyStoreRepository extends IBaseRepository<KeyStore> {
    findByAccessKey(accessTokenKey: string): Promise<KeyStore | null>
    findKeyStoreByUserId(userId: string): Promise<KeyStore | null>
}
