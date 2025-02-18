import { NextFunction, Request } from 'express'
import { ApiError } from '../../../utils/ApiError'
import responseMessage from '../../../constant/responseMessage'
import prisma from '../../../config/prisma.config'
import { UpdateUserDTO, User } from '../../../Lib/Models/User'
import bcrypt from 'bcrypt'

interface ChangePassword {
    oldPassword: string
    newPassword: string
}
const { METHOD_FAILED, NOT_FOUND, BAD_REQUEST } = responseMessage

export default class ProfileService {
    constructor() {}

    /**
     * Update user profile service
     *
     * @param req
     * @param next
     * @param where
     * @param userDetails
     * @returns
     */
    public async updateUserProfileService(req: Request, next: NextFunction, where: { id: string }, userDetails: UpdateUserDTO): Promise<User | void> {
        try {
            const profile = await prisma.user.update({
                where,
                data: userDetails
            })

            return profile
        } catch (error) {
            return ApiError(
                error instanceof Error ? error : new Error(METHOD_FAILED('update user details service').message),
                req,
                next,
                METHOD_FAILED().code
            )
        }
    }

    /**
     * Delete user account service
     *
     * @param req Request
     * @param next NextFunction
     * @param where { id: string }
     * @returns Promise<User | void>
     */
    public async deleteUserAccountService(req: Request, next: NextFunction, where: { id: string }): Promise<User | void> {
        try {
            return await prisma.user.delete({
                where
            })
        } catch (error) {
            return ApiError(
                error instanceof Error ? error : new Error(METHOD_FAILED('delete user account service').message),
                req,
                next,
                METHOD_FAILED().code
            )
        }
    }

    /**
     * Get user dashboard details service
     *
     * @param req
     * @param next
     * @param where
     */
    public async getUserDashboardService(req: Request, next: NextFunction, where: { id: string }): Promise<User | void> {
        try {
            const userDetails = await prisma.user.findUnique({
                where,
                select: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                    avatarImg: true,
                    coverImg: true,
                    createdAt: true,
                    updatedAt: true,
                    password: true,
                    role: true
                }
            })

            if (!userDetails) {
                return ApiError(new Error(NOT_FOUND('user not found').message), req, next, NOT_FOUND().code)
            }
            return userDetails
        } catch (error) {
            return ApiError(
                error instanceof Error ? error : new Error(METHOD_FAILED('get user dashboard service').message),
                req,
                next,
                METHOD_FAILED().code
            )
        }
    }

    /**
     * Change user password service
     *
     * @param req Request
     * @param next NextFunction
     * @param where { id: string }
     * @param changePassword ChangePassword
     * @returns Promise<User | void>
     */
    public async changePasswordService(
        req: Request,
        next: NextFunction,
        where: { id: string },
        changePassword: ChangePassword
    ): Promise<User | void> {
        // Fetch current user details
        const currentUser = await prisma.user.findUnique({
            where,
            select: {
                password: true
            }
        })

        // Check if user exists in the database
        if (!currentUser) {
            return ApiError(new Error(NOT_FOUND('user not found').message), req, next, NOT_FOUND().code)
        }

        // Compare database password with the user provided password
        const match = await this.comparePassword(changePassword.oldPassword, currentUser?.password)

        // If password does not match, return an error
        if (!match) {
            return ApiError(new Error(BAD_REQUEST('password does not match').message), req, next, BAD_REQUEST().code)
        }

        // Hash the new password
        const hashedPassword = await this.hashPassword(changePassword.newPassword)

        if (!hashedPassword) {
            return ApiError(new Error(METHOD_FAILED('hashing password').message), req, next, METHOD_FAILED().code)
        }

        // Update user password
        try {
            const changePassword = await prisma.user.update({
                where,
                data: {
                    password: hashedPassword
                }
            })

            return changePassword
        } catch (error) {
            return ApiError(
                error instanceof Error ? error : new Error(METHOD_FAILED('change password service').message),
                req,
                next,
                METHOD_FAILED().code
            )
        }
    }

    

    public trimUserDetailsService(user: User): Promise<Omit<User, 'password' | 'role'>> {
        return Promise.resolve({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            avatarImg: user.avatarImg,
            coverImg: user.coverImg,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        })
    }


    /**
     * Hashes a plain text password using bcrypt.
     *
     * @param password - The plain text password to be hashed.
     * @returns A promise that resolves to the hashed password string.
     *
     */
    private async hashPassword(password: string): Promise<string | void> {
        // Hash password
        const saltRounds = process.env.HASH_PASSWORD_SALT ? parseInt(process.env.HASH_PASSWORD_SALT) : 10

        // Generate salt
        const salt = await bcrypt.genSalt(saltRounds)

        // Hash password
        return await bcrypt.hash(password, salt)
    }

    /**
     * Compares a plain text password with a hashed password.
     *
     * @param password
     * @param hashedPassword
     * @returns A promise that resolves to a boolean indicating whether the password matches the hashed password.
     */

    private async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        // Compare password
        return await bcrypt.compare(password, hashedPassword)
    }
}
