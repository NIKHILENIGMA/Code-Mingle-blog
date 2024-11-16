import { User } from '../Lib/Models/User'
import { RepositoryFactory } from '../Lib/Repositories'
import { ApiError } from '../utils/ApiError'
import { IUserRepository } from '../Lib/Repositories/Interfaces/IUserRepository'
// import TokenServices from './token.service'


export default class UserServices {
    private UserRepository: IUserRepository

    constructor() {
        this.UserRepository = RepositoryFactory.UserRepository()
    }

    
    public async updateUserDetails(id: string, user: User) {
        const updatedUser = await this.UserRepository.update(id, user)

        if (!updatedUser) {
            throw new ApiError(404, 'Error while updating user')
        }

        return updatedUser
    }

    
    public async getUserDetails(id: string) {
        const user = await this.UserRepository.getById(id)

        if (!user) {
            throw new ApiError(404, 'User not found')
        }

        return user
    }

    


}
