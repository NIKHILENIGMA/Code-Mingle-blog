//note Purpose: Interface for the User Repository.
import { IGenericsRepository } from './IGenericsRepository'
import { User } from '../../Models/User'

export interface IUserRepository extends IGenericsRepository<User> {
    findByEmail(email: string): Promise<User | null>
}
