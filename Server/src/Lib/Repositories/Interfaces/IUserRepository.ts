//note Purpose: Interface for the User Repository.
// import { IGenericsRepository } from './IGenericsRepository'
import { User } from '../../Models/User'
import { IBaseRepository } from './IBaseRepository'

export interface IUserRepository extends IBaseRepository<User> {
    findUserByEmail(email: string): Promise<User | null>
    findUserById(id: string): Promise<User | null>
    getAllUsers(): Promise<User[] | null>
}
