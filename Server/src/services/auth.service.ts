import bcrypt from 'bcrypt'
import { RepositoryFactory } from '../Lib/Repositories'
import { IUserRepository } from '../Lib/Repositories/Interfaces/IUserRepository'
import { ApiError } from '../utils/ApiError'
import { ILoginUser, ISignupUser, IUser, User } from '../Lib/Models/User'

export default class AuthService {
    private UserRepository: IUserRepository

    constructor() {
        this.UserRepository = RepositoryFactory.UserRepository()
    }

    /**
     * Creates a new user.
     *
     * @param {ISignupUser} user - The user data for signup.
     * @returns {Promise<User>} - A promise that resolves to the created user.
     * @throws {ApiError} - Throws an error if the email already exists, if there is an error hashing the password, or if there is an error creating the user.
     */
    public async createUser(user: ISignupUser): Promise<IUser> {
        // Check if email exists
        const emailExists = await this.UserRepository.findUserByEmail(user.email)

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

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userDetails } = newUser

        return userDetails
    }

    public async loginUser(credientials: ILoginUser): Promise<IUser> {
        try {

            const user = await this.verifyUser(credientials.email)

            if (!user) {
                throw new ApiError(404, 'User not found')
            }
            // Compare passwords
            const passwordMatch = await this.comparePassword(credientials.password, user.password)

            if (!passwordMatch) {
                throw new ApiError(401, 'Please check your credentials')
            }

            return user
        } catch (error) {
            throw new ApiError(500, (error as Error).message)
        }
    }

    public async forgotPassword(email: string) {
        const user = await this.verifyUser(email)

        if (!user) {
            throw new ApiError(404, 'User not found')
        }

        return user
    }

    /**
     * Checks if a user exists by email or ID.
     *
     * @param {string} [email] - The email of the user to check.
     * @param {string} [id] - The ID of the user to check.
     * @returns {Promise<IUser>} A promise that resolves to the user if found.
     * @throws {ApiError} Throws an error if the user does not exist with the provided email or ID.
     */

    public async verifyUser(email?: string, id?: string): Promise<User> {
        let userExist: User | null = null

        if (email) {
            userExist = await this.UserRepository.findUserByEmail(email)
        } else if (id) {
            userExist = await this.UserRepository.findUserById(id)
        }

        if (!userExist) {
            throw new ApiError(404, 'User does not exist with the provided  ID or email')
        }
        
        return userExist
    }

    public async changePassword(userId: string, newPassword: string): Promise<void> {
        try {

            const hashedPassword = await this.HashedPassword(newPassword)

            const changePassword = await this.UserRepository.update(userId, { password: hashedPassword })

            if (!changePassword) {
                throw new ApiError(404, 'Error changing password')
            }


        } catch (error) {
            throw new ApiError(500, `Error changing password: ${(error as Error).message}`)
        }
    }

    public async resetPassword(password: string, token: string) {
        await Promise.resolve({ password, token })
    }

    /**
     * Hashes a plain text password using bcrypt.
     *
     * @param password - The plain text password to be hashed.
     * @returns A promise that resolves to the hashed password string.
     * @throws {ApiError} If an error occurs during the hashing process.
     */
    private async HashedPassword(password: string): Promise<string> {
        // Hash password
        try {
            const saltRounds = process.env.HASH_PASSWORD_SALT ? parseInt(process.env.HASH_PASSWORD_SALT) : 10
            const salt = await bcrypt.genSalt(saltRounds)
            const hashedPassword = await bcrypt.hash(password, salt)
            return hashedPassword
        } catch (error) {
            throw new ApiError(500, (error as Error).message)
        }
    }

    /**
     * Compares a plain text password with a hashed password.
     * @param {string} password - Plain text password.
     * @param {string} hashedPassword - Hashed password.
     * @returns Promise<boolean> - True if passwords match, else false.
     */
    private async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        // Compare password
        return await bcrypt.compare(password, hashedPassword)
    }
}
