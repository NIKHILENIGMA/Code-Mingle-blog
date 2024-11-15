import { User } from '../Lib/Models/User'
import { RepositoryFactory } from '../Lib/Repositories'
import { genSalt, hash } from 'bcrypt'
import { ApiError } from '../utils/ApiError'
import { IUserRepository } from '../Lib/Repositories/Interfaces/IUserRepository'
import TokenServices from './token.service'

export default class UserServices {
    private UserRepository: IUserRepository
    private tokenService: TokenServices

    constructor() {
        this.UserRepository = RepositoryFactory.UserRepository()
        this.tokenService = new TokenServices()
    }

    /**
     * This TypeScript function creates a new user, hashes their password, generates access and refresh
     * tokens, and returns the tokens along with the user data excluding the password.
     * @param {User} user - The `createUser` function you provided is responsible for creating a new
     * user in your system. It performs the following steps:
     * @returns The function `createUser` returns an object with two properties:
     * 1. `tokens`: Contains the access token and refresh token generated for the new user.
     * 2. `userData`: Contains the user data without the password field.
     */

    public async createUser(user: User) {
        const emailExists = await this.UserRepository.findByEmail(user.email)

        if (emailExists) {
            throw new ApiError(400, 'Email already exists')
        }

        // Hash password
        const hashPassword = await this.HashedPassword(user.password)

        if (!hashPassword) {
            throw new ApiError(500, 'Error occured while hashing password')
        }

        user.password = hashPassword

        // Create user
        const newUser = await this.UserRepository.create(user)

        if (!newUser) {
            throw new ApiError(404, 'Error while creating user')
        }

        // Generate tokens for user
        const tokens = await this.tokenService.generateToken(newUser.id)
        

        if (!tokens) {
            throw new ApiError(500, 'Error generating tokens')
        }

        // Return tokens and new user except password
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...newUserWithoutPassword } = newUser

        return { tokens, userData: newUserWithoutPassword }
    }

    async updateUserDetails(id: string, user: User) {
        const updatedUser = await this.UserRepository.update(id, user)

        if (!updatedUser) {
            throw new ApiError(404, 'Error while updating user')
        }

        return updatedUser
    }

    /**
     * The function `HashedPassword` asynchronously hashes a given password using a salt generated with
     * a specified number of rounds.
     * @param {string} password - The `password` parameter is a string that represents the user's
     * password that needs to be hashed for security purposes.
     * @returns The `HashedPassword` function returns a Promise that resolves to a hashed password
     * string after hashing the input password using a salt generated with a specified number of
     * rounds.
     */

    private async HashedPassword(password: string): Promise<string> {
        // Hash password
        const saltRounds = process.env.HASH_PASSWORD_SALT ? parseInt(process.env.HASH_PASSWORD_SALT) : 10

        const salt = await genSalt(saltRounds)
        const hashedPassword = await hash(password, salt)
        return hashedPassword
    }

    /**
     * Compares a plain text password with a hashed password.
     * @param {string} password - Plain text password.
     * @param {string} hashedPassword - Hashed password.
     * @returns Promise<boolean> - True if passwords match, else false.
     */
    // private async ComparePassword(password: string, hashedPassword: string): Promise<boolean> {
    //     // Compare password
    //     return await compare(password, hashedPassword)
    // }
}
