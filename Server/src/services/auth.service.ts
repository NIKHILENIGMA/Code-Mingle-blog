import bcrypt from 'bcrypt'
import { RepositoryFactory } from '../Lib/Repositories'
import { IUserRepository } from '../Lib/Repositories/Interfaces/IUserRepository'
import { ApiError } from '../utils/ApiError'
import { ILoginUser, ISignupUserBody, IUser, User } from '../Lib/Models/User'
import { NextFunction, Request } from 'express'
import responseMessage from '../constant/responseMessage'

const { METHOD_FAILED, NOT_FOUND, INVALID_PASSWORD, ALREADY_EXIST } = responseMessage

export default class AuthService {
    private UserRepository: IUserRepository

    constructor() {
        this.UserRepository = RepositoryFactory.UserRepository()
    }

    /**
     * Creates a new user.
     *
     * @param {ISignupUserBody} user - The user data for signup.
     * @returns {Promise<User>} - A promise that resolves to the created user.
     * @throws {ApiError} - Throws an error if the email already exists, if there is an error hashing the password, or if there is an error creating the user.
     */
    public async userRegisterService(req: Request, next: NextFunction, user: ISignupUserBody): Promise<IUser | void> {
        try {
            // Check if email exists
            await this.checkEmailExists(user.email, req, next)

            // Hash password
            const hashPassword = await this.hashedPassword(req, next, user.password)

            if (!hashPassword) {
                return ApiError(new Error(METHOD_FAILED('hashing password').message), req, next, METHOD_FAILED().code)
            }

            user.password = hashPassword

            // Create user
            const newUser = await this.UserRepository.create(user)

            if (!newUser) {
                return ApiError(new Error(METHOD_FAILED('new user').message), req, next, METHOD_FAILED().code)
            }

            return this.removePassword(newUser)
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('register service').message), req, next, METHOD_FAILED().code)
        }
    }

    public async userLoginService(req: Request, next: NextFunction, credientials: ILoginUser): Promise<string | void> {
        try {
            const user = await this.verifyUserByEmail(credientials.email)

            if (!user) {
                return ApiError(new Error(NOT_FOUND('user with email').message), req, next, 404)
            }
            // Compare passwords
            const passwordMatch = await this.comparePassword(credientials.password, user.password)

            if (!passwordMatch) {
                return ApiError(new Error(INVALID_PASSWORD.message), req, next, 401)
            }

            return user.id
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('login service').message), req, next, METHOD_FAILED().code)
        }
    }

    public async userForgotPasswordService(req: Request, next: NextFunction, email: string): Promise<IUser | void> {
        const user = await this.verifyUserByEmail(email)

        if (user === null) {
            return ApiError(new Error(NOT_FOUND('user with email').message), req, next, NOT_FOUND().code)
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

    private async checkEmailExists(email: string, req: Request, next: NextFunction): Promise<void> {
        const userExist = await this.UserRepository.findUserByEmail(email)

        if (userExist) {
            ApiError(new Error(ALREADY_EXIST(email).message), req, next, 409)
        }
    }

    private async verifyUserByEmail(email: string): Promise<User | null> {
        return await this.UserRepository.findUserByEmail(email)
    }

    // private async verifyUserById(id: string): Promise<User | null> {
    //     return await this.UserRepository.findUserById(id)
    // }

    public async changePasswordService(req: Request, next: NextFunction, userId: string, newPassword: string): Promise<void> {
        try {
            const hashedPassword = await this.hashedPassword(req, next, newPassword)

            if (!hashedPassword) {
                return ApiError(new Error(METHOD_FAILED('hashing password').message), req, next, METHOD_FAILED().code)
            }

            const changePassword = await this.UserRepository.update(
                {
                    id: userId
                },
                { password: hashedPassword }
            )

            if (!changePassword) {
                return ApiError(new Error(METHOD_FAILED('changing password').message), req, next, METHOD_FAILED().code)
            }
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('login service').message), req, next, METHOD_FAILED().code)
        }
    }

    private removePassword(user: User): IUser {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userDetails } = user

        return userDetails
    }

    /**
     * Hashes a plain text password using bcrypt.
     *
     * @param password - The plain text password to be hashed.
     * @returns A promise that resolves to the hashed password string.
     * @throws {ApiError} If an error occurs during the hashing process.
     */
    private async hashedPassword(req: Request, next: NextFunction, password: string): Promise<string | void> {
        // Hash password
        try {
            const saltRounds = process.env.HASH_PASSWORD_SALT ? parseInt(process.env.HASH_PASSWORD_SALT) : 10

            const salt = await bcrypt.genSalt(saltRounds)

            return await bcrypt.hash(password, salt)
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('hashing').message), req, next, METHOD_FAILED().code)
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
