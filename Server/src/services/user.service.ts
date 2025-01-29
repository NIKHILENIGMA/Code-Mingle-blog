// import { NextFunction, Request } from 'express'
import { UpdateUserDTO } from '../Lib/Models/User'
import { RepositoryFactory } from '../Lib/Repositories'
import { IUserRepository } from '../Lib/Repositories/Interfaces/IUserRepository'
// import { ApiError } from '../utils/ApiError'

export default class UserServices {
    private UserRepository: IUserRepository

    constructor() {
        this.UserRepository = RepositoryFactory.UserRepository()
    }

    public async updateUserDetails(id: string, user: UpdateUserDTO) {
        await this.UserRepository.update({ id }, user)
    }

    public async getUserDetails(id: string) {
        await this.UserRepository.findUserById({ id })
    }
}
