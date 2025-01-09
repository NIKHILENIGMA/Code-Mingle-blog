import { User } from '../Lib/Models/User'
import { RepositoryFactory } from '../Lib/Repositories'
// import { ApiError } from '../utils/ApiError'
import { IUserRepository } from '../Lib/Repositories/Interfaces/IUserRepository'
// import TokenServices from './token.service'

export default class UserServices {
    private UserRepository: IUserRepository

    constructor() {
        this.UserRepository = RepositoryFactory.UserRepository()
    }

    public async updateUserDetails(id: string, user: User) {
        const updatedUser = await this.UserRepository.update({ id }, user)

        return updatedUser
    }

    public async getUserDetails(id: string) {
        await this.UserRepository.findUserById(id)
    }
}
