// Interface for the User Repository.
import { User, CreateUserDTO, UpdateUserDTO, UserWhere, UserEmailWhere } from '../../Models/User'

/* This code snippet is defining an interface named `IUserRepository` in TypeScript. This interface specifies the methods that a user repository class must implement. The methods include `create`, `update`, `delete`, `findUserByEmail`, `findUserById`, and `getAllUsers`.

*/

export interface IUserRepository {
    create(user: CreateUserDTO): Promise<User>
    update(where: UserWhere, user: UpdateUserDTO): Promise<User | null>
    delete(where: UserWhere): Promise<void>
    updatePassword(where: UserWhere, password: string): Promise<User | null>
    findUserByEmail(where: UserEmailWhere): Promise<User | null>
    findUserById(where: UserWhere): Promise<User | null>
    getAllUsers(): Promise<User[] | null>
}
