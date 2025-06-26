import { User } from '@prisma/client'
import { tokenManagement } from '@/utils'
import { StandardError } from '@/utils/Errors/StandardError'
import { logger } from '@/utils/logger/index'
import { BadRequestError, DatabaseError, InternalServerError, NotFoundError } from '@/utils/Errors'
import { SignupCredientials, LoginCredientials, Permission } from './auth.types'
import { PrismaUserRepository } from '../repository/PrismaUserRepository'
import { PrismaResetPasswordRepository } from '../repository/PrismaResetPasswordRepository'
import sendResetEmail from '@/utils/resend'
import { comparePassword, hashedPassword } from '@/utils/HashPassword'
import { PrismaRoleRepository } from '../repository/PrismaRoleRepository'
import { ROLE } from '@/types/common/enum.types'

interface UserLogin {
    user: User
    permissions: Permission[]
}

export class AuthService {
    private userRepository: PrismaUserRepository
    private resetPasswordRepository: PrismaResetPasswordRepository
    private roleRepository: PrismaRoleRepository

    constructor() {
        this.userRepository = new PrismaUserRepository()
        this.resetPasswordRepository = new PrismaResetPasswordRepository()
        this.roleRepository = new PrismaRoleRepository()
    }

    public async registerUser(credentials: SignupCredientials): Promise<void> {
        try {
            // Check if email exists
            await this.userRepository.getUserByEmail(credentials?.email)
            
            // Hash password
            const hashPassword = await hashedPassword(credentials?.password)
            if (!hashPassword) throw new BadRequestError('Error hashing password')

            // Set password to hashed password
            credentials.password = hashPassword

            const role = await this.roleRepository.getRoleByName(ROLE.USER)
            if (!role) {
                throw new NotFoundError('User role not found')
            }

            // Create user role_id
            const newUser = await this.userRepository.create({
                firstName: credentials?.firstName,
                lastName: credentials?.lastName,
                username: credentials?.username,
                email: credentials?.email,
                password: credentials?.password,
                roleId: role.id,
                lastLoginAt: new Date()
            })
            if (!newUser) {
                throw new DatabaseError('Database error occurred while creating user')
            }
            // Send a verification email
            // await sendVerificationEmail(newUser.email, newUser.id)
            
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }
            if (error instanceof Error) {
                logger.error(`Error during user registration: ${error.message}`)
                throw error
            }
            throw new InternalServerError('An unexpected error occurred during registration')
        }
    }

    public async loginUser(credientials: LoginCredientials): Promise<UserLogin> {
        try {
            // Check if user exists
            const user = await this.verifyUserByEmail(credientials.email)
            if (!user) throw new NotFoundError('User name or password is invalid')

            // Compare passwords
            const passwordMatch = await comparePassword(credientials.password, user.password!)
            if (!passwordMatch) throw new BadRequestError('User name or password is invalid')

            // Check if user has a valid roleId
            if (!user.roleId) {
                throw new DatabaseError('User does not have a valid roleId')
            }

            // Take User Permissions
            const userRolePermissions = await this.userRepository.getUserPermissions(user.roleId)
            if (!userRolePermissions) {
                throw new DatabaseError('Database error occurred while fetching user permissions')
            }

            // Update user lastLoginAt
            return {
                user,
                permissions: userRolePermissions
            }
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }
            throw new Error('An unexpected error occurred during login')
        }
    }

    public async forgotPasswordService(email: string): Promise<{ link: string; userId: string }> {
        try {
            const user = await this.verifyUserByEmail(email)

            if (user === null) {
                throw new NotFoundError('User not found')
            }
            const rawResetToken = tokenManagement.generateVerificationToken()

            if (!rawResetToken) {
                throw new InternalServerError('Error generating reset token')
            }

            // Hash the reset token
            const hashedResetToken = await hashedPassword(rawResetToken)
            if (!hashedResetToken) {
                throw new InternalServerError('Error hashing reset token')
            }

            // Update user with reset token
            await this.resetPasswordRepository.createResetPasswordToken({
                userId: user.id,
                email: user.email,
                tokenHash: hashedResetToken,
                expiresAt: new Date(Date.now() + 3600000) // 1 hour expiration
            })

            const resetLink = `http://localhost:3000/reset-password?token=${rawResetToken}`

            // Send the reset link to the user's email
            await sendResetEmail(user.email, resetLink)

            return { link: resetLink, userId: user.id }
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }
            throw new InternalServerError('An unexpected error occurred during password reset')
        }
    }

    public async resetPasswordService(payload: { userId: string; token: string; newPassword: string }): Promise<void> {
        try {
            const hashToken = await this.resetPasswordRepository.verifyResetPasswordToken(payload.userId)
            if (!hashToken) {
                throw new NotFoundError('Reset password token not found or expired')
            }

            // Compare the hashed token with the raw token
            const isTokenValid: boolean = await comparePassword(payload.token, hashToken.tokenHash)
            if (!isTokenValid) {
                throw new BadRequestError('Token which is already expired or invalid')
            }

            if (isTokenValid) {
                const hashPassword = await hashedPassword(payload.newPassword)
                await this.userRepository.updatePassword(payload.userId, hashPassword)
            }
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }
            throw new InternalServerError('An unexpected error occurred during password reset')
        }
    }

    public async changePasswordService(userId: string, newPassword: string): Promise<void> {
        try {
            const hashPassword: string = await hashedPassword(newPassword)
            if (!hashPassword) {
                throw new InternalServerError('Error hashing password')
            }

            const changePassword: boolean = await this.userRepository.updatePassword(userId, hashPassword)

            if (!changePassword) {
                throw new DatabaseError('Database error occurred while updating password')
            }
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }
            throw new InternalServerError('An unexpected error occurred during password change')
        }
    }

    public async verifyRefreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
        try {

            // Create a new access token and refresh token
            const user = await this.userRepository.getUserById(`userId ${refreshToken}`) // Replace 'userId' with the actual user ID from the session
            if (!user) {
                throw new NotFoundError('User not found')
            }

            // Take User Permissions
            const userPermissions = await this.userRepository.getUserPermissions(user.roleId!)
            if (!userPermissions) {
                throw new DatabaseError('Database error occurred while fetching user permissions')
            }

            // Generate new tokens
            const tokens = await this.getTokens(user, userPermissions)
            if (!tokens) {
                throw new InternalServerError('Error generating tokens')
            }

            return tokens
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }
            throw new InternalServerError('An unexpected error occurred while verifying refresh token')
        }
    }

    public async getTokens(user: User, rolePermissions: Permission[]): Promise<{ accessToken: string; refreshToken: string }> {
        // Generate tokens
        const payload = {
            id: user.id,
            email: user.email,
            username: user.username,
            roleId: user.roleId!,
            lastLoginAt: user.lastLoginAt!,
            emailVerified: user.verifiedEmail,
            permissions: rolePermissions.map((permission) => ({
                id: permission.id,
                name: permission.name,
                resource: permission.resource,
                actions: Array.isArray(permission.actions) ? permission.actions : [permission.actions]
            }))
        }
        // Generate access and refresh tokens
        // permission
        try {
            const accessToken = await tokenManagement.generateToken({
                type: 'ACCESS',
                subject: payload
            })

            const refreshToken = await tokenManagement.generateToken({
                type: 'REFRESH',
                subject: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    roleId: user.roleId!,
                    lastLoginAt: user.lastLoginAt!,
                    emailVerified: user.verifiedEmail
                }
            })

            return {
                accessToken,
                refreshToken
            }
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }
            if (error instanceof Error) {
                logger.error(`Error generating tokens: ${error.message}`)
                throw new InternalServerError('Error generating tokens')
            }

            throw new InternalServerError('An unexpected error occurred while generating tokens')
        }
    }

    public async verifyUserByEmail(email: string): Promise<User | null> {
        return await this.userRepository.getUserByEmail(email)
    }
}

export const authServices = new AuthService()
