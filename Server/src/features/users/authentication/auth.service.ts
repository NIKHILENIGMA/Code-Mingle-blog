import { NextFunction, Request } from 'express'
import { LoginCredentials, SignupCredentials } from './auth.types'
import { User } from '../../../Lib/Models/User'
import responseMessage from '../../../constant/responseMessage'
import { ApiError } from '../../../utils/ApiError'
import { RepositoryFactory } from '../../../Lib/Repositories'
import { IUserRepository } from '../../../Lib/Repositories/Interfaces/IUserRepository'
import { UserDTO } from '@/types/common/base.types'
import argon2 from 'argon2'
import bcrypt from 'bcrypt'
import prisma from '../../../config/prisma.config'

const { METHOD_FAILED, ALREADY_EXIST, NOT_FOUND, INVALID_PASSWORD } = responseMessage
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
    public async userRegisterService(req: Request, next: NextFunction, user: SignupCredentials): Promise<UserDTO | void> {
        try {
            // Check if email exists
            const existedUser = await this.checkEmailExists(user.email)
            if (existedUser) {
                return ApiError(new Error(ALREADY_EXIST('email').message), req, next, ALREADY_EXIST().code)
            }

            // Hash password
            const hashPassword = await this.hashedPassword(user?.password)

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

    /**
     * Logs in a user.
     *
     * This function verifies the user by email, then compares the password.
     * If the user is found and the password is correct, the user ID is returned.
     *
     * @param {Request} req - The request object.
     * @param {NextFunction} next - The next function.
     * @param {LoginCredentials} credientials - The login credentials.
     * @returns {Promise<string | void>} - A promise that resolves to the user ID if successful.
     * @throws {ApiError} - Throws an error if the user does not exist, if the password is invalid, or if there is an error during the login process.
     */
    public async userLoginService(req: Request, next: NextFunction, credientials: LoginCredentials): Promise<string | void> {
        try {
            const user = await this.verifyUserByEmail(credientials.email)

            if (!user) {
                return ApiError(new Error(NOT_FOUND('user with email').message), req, next, 404)
            }
            // Compare passwords
            const passwordMatch = await this.comparePassword(credientials.password, user.password, user?.id)

            if (!passwordMatch) {
                return ApiError(new Error(INVALID_PASSWORD.message), req, next, INVALID_PASSWORD.code)
            }

            return user.id
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('login service').message), req, next, METHOD_FAILED().code)
        }
    }

    /**
     * Sends a password reset email to the user.
     *
     * This function verifies the user by email, then sends a password reset email.
     *
     * @param {Request} req - The request object.
     * @param {NextFunction} next - The next function.
     * @param {string} email - The email of the user.
     * @returns {Promise<UserDTO | void>} - A promise that resolves to the user if successful.
     * @throws {ApiError} - Throws an error if the user does not exist with the provided email.
     */
    public async userForgotPasswordService(req: Request, next: NextFunction, email: string): Promise<UserDTO | void> {
        const user = await this.verifyUserByEmail(email)

        if (user === null) {
            return ApiError(new Error(NOT_FOUND('user with email').message), req, next, NOT_FOUND().code)
        }

        return user
    }

    /**
     * Changes the password of a user.
     *
     * This function hashes the new password, then updates the user's password.
     *
     * @param {Request} req - The request object.
     * @param {NextFunction} next - The next function.
     * @param {string} userId - The ID of the user.
     * @param {string} newPassword - The new password.
     * @returns {Promise<void>} - A promise that resolves if successful.
     * @throws {ApiError} - Throws an error if there is an error hashing the password or updating the user's password.
     */
    public async changePasswordService(req: Request, next: NextFunction, userId: string, newPassword: string): Promise<void> {
        try {
            const hashedPassword = await this.hashedPassword(newPassword)

            if (!hashedPassword) {
                return ApiError(new Error(METHOD_FAILED('hashing password').message), req, next, METHOD_FAILED().code)
            }

            const changePassword = await this.UserRepository.updatePassword({ id: userId }, hashedPassword)

            if (!changePassword) {
                return ApiError(new Error(METHOD_FAILED('changing password').message), req, next, METHOD_FAILED().code)
            }
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('login service').message), req, next, METHOD_FAILED().code)
        }
    }
    /**
     * Checks if a user exists by email or ID.
     *
     * @param {string} [email] - The email of the user to check.
     * @param {string} [id] - The ID of the user to check.
     * @returns {Promise<IUser>} A promise that resolves to the user if found.
     * @throws {ApiError} Throws an error if the user does not exist with the provided email or ID.
     */

    private async checkEmailExists(email: string): Promise<User | null> {
        return await this.UserRepository.findUserByEmail({ email })
    }

    /**
     * Hashes a plain text password using bcrypt.
     *
     * @param {Request} req - The request object.
     * @param {NextFunction} next - The next function.
     * @param {string} password - The plain text password to hash.
     * @returns {Promise<string | void>} - A promise that resolves to the hashed password if successful.
     *
     * @throws {ApiError} - Throws an error if there is an error hashing the password.
     */
    private async hashedPassword(password: string): Promise<string | void> {
        // Hash password
        const hashOptions = {
            type: argon2.argon2id, // Use Argon2id (recommended)
            memoryCost: 2 ** 16, // 64MB RAM usage
            timeCost: 3, // 3 iterations
            parallelism: 2 // Parallelism factor
        }

        return await argon2.hash(password, hashOptions)
    }

    /**
     * Removes the password from a user object.
     *
     * @param user  - User object
     * @returns  UserDTO - User object without password
     */
    private removePassword(user: User): UserDTO {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userDetails } = user

        return userDetails
    }

    /**
     * Compares a plain text password with a hashed password.
     *
     * @param {string} password - Plain text password.
     * @param {string} hashedPassword - Hashed password.
     * @returns Promise<boolean> - True if passwords match, else false.
     */
    private async comparePassword(password: string, hashedPassword: string, userId: string): Promise<boolean> {
        // Compare password
        const match = await bcrypt.compare(password, hashedPassword)

        if (match) {
            const argonHashed = (await this.hashedPassword(password)) as string

            await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    password: argonHashed
                }
            })

            return match
        }

        return await argon2.verify(hashedPassword, password)
    }

    /**
     * Verifies if a user exists by email.
     *
     * @param email  - Email of the user
     * @returns  User | null - User object if found, else null
     */

    private async verifyUserByEmail(email: string): Promise<User | null> {
        return await this.UserRepository.findUserByEmail({ email })
    }
}
