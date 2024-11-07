import { IUserRepository } from '../Lib/Repositories/Interfaces/IUserRepository'
import { RepositoryFactory } from '../Lib/Repositories'
import { User } from '../Lib/Models/User'
import { ICreateUser } from '../Lib/Models/User'
import { HashedPassword } from '../utils/PasswordManager'
import crypto from 'crypto'
import { createTokens } from '../helpers/JWTTokens'
import ApiError from '../utils/ApiError'

export class UserService {
    private UserRepository: IUserRepository

    constructor() {
        this.UserRepository = RepositoryFactory.createUserRepository()
    }

    /**
     * This TypeScript function creates a new user, checks for existing email, hashes the password,
     * generates tokens, and handles errors.
     * @param {User} user - The `createUser` function you provided is responsible for creating a new
     * user in your system. It performs the following steps:
     * @returns The `createUser` function returns a Promise that resolves to an object containing the
     * generated tokens and the newly created user.
     */

    async createUser(user: User): Promise<ICreateUser> {
        try {
            // Check if email already exists
            const emailExists = await this.UserRepository.findByEmail(user.email)

            if (emailExists) {
                throw new ApiError(400, 'Email already exists')
            }

            // Hash password
            const hashPassword = await HashedPassword(user.password)

            if (!hashPassword) {
                throw new ApiError(500, 'Error occured while hashing password')
            }
            user.password = hashPassword

            // Create user
            const newUser = await this.UserRepository.create(user)

            // Generate tokens
            const accessTokenKey = crypto.randomBytes(32).toString('hex')
            const refreshTokenKey = crypto.randomBytes(32).toString('hex')

            // Token generation
            const tokens = await createTokens(newUser, { accessTokenKey, refreshTokenKey })

            if (!tokens) {
                throw new ApiError(500, 'Error generating tokens')
            }

            return { tokens, newUser }
        } catch (error: unknown) {
            throw new ApiError(500, (error as Error).message)
        }
    }

    async getUserById(id: string): Promise<User | null> {
        try {
            if (!id) {
                throw new ApiError(400, 'Id is required')
            }

            // Get user by id
            const user = await this.UserRepository.getById(id)

            if (!user) {
                throw new ApiError(404, 'User not found')
            }

            return user
        } catch (error) {
            throw new ApiError(500, `Error occured while service: ${(error as Error).message}`)
        }
    }

    async getAllUsers(): Promise<User[]> {
        return await this.UserRepository.getAll()
    }

    async updateUserDetails(id: string, user: User): Promise<User | null> {
        return await this.UserRepository.update(id, user)
    }

    async deleteUser(id: string): Promise<void> {
        return await this.UserRepository.delete(id)
    }
}
