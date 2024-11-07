import { IUserRepository } from './Interfaces/IUserRepository'
import { PrismaUserRepository } from '../Repositories/Implementations/PrismaUserRepository'

export class RepositoryFactory {
    static createUserRepository(): IUserRepository {
        return new PrismaUserRepository()
    }
}
