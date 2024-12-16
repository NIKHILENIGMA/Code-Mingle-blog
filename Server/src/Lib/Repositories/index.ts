
import { IUserRepository } from './Interfaces/IUserRepository'
import { IKeyStoreRepository } from './Interfaces/IKeyStore'
import { IResetPasswordRepository } from './Interfaces/IResetPasswordRepository'
import { PrismaUserRepository } from './PrismaRepos/PrismaUserRepository'
import { PrismaResetPasswordRepository } from './PrismaRepos/PrismaResetPasswordRepository'
import { PrismaKeyStoreRepository } from './PrismaRepos/PrismaKeyStoreRepository'
import { PrismaDraftRepository } from './PrismaRepos/PrismaDraftRepository'
import { IDraftRepository } from './Interfaces/IDraftRepository'

export class RepositoryFactory {
    static UserRepository(): IUserRepository {
        return new PrismaUserRepository()
    }

    static KeyStoreRepository(): IKeyStoreRepository {
        return new PrismaKeyStoreRepository()
    }

    static ResetPasswordRepository(): IResetPasswordRepository {
        return new PrismaResetPasswordRepository()
    }

    static DraftRepository(): IDraftRepository {
        return new PrismaDraftRepository()
    }
    
}
