
import { IUserRepository } from './Interfaces/IUserRepository'
import { IKeyStoreRepository } from './Interfaces/IKeyStore'
import { IResetPasswordRepository } from './Interfaces/IResetPasswordRepository'
import { PrismaUserRepository } from './Prisma/PrismaUserRepository'
import { PrismaResetPasswordRepository } from './Prisma/PrismaResetPasswordRepository'
import { PrismaKeyStoreRepository } from './Prisma/PrismaKeyStoreRepository'
import { PrismaBlogRepository } from './Prisma/PrismaBlogRepository'
import { IBlogRepository } from './Interfaces/IBlogRepository'

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

    static BlogRepository(): IBlogRepository {
        return new PrismaBlogRepository()
    }
    
}
