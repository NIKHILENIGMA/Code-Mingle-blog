import { PrismaUserRepository, PrismaKeyStoreRepository } from './Implementations'
import { IUserRepository } from './Interfaces/IUserRepository'
import { IKeyStoreRepository } from './Interfaces/IKeyStore'


export class RepositoryFactory {
    static UserRepository(): IUserRepository {
        return new PrismaUserRepository()
    }

    static KeyStoreRepository(): IKeyStoreRepository {
        return new PrismaKeyStoreRepository()
    }
}
