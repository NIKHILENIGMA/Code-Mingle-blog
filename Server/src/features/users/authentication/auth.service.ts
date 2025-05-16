import { User } from '@prisma/client'
import { tokenManagement } from '@/utils'
import { StandardError } from '@/utils/Errors/StandardError'
import { logger } from '@/utils/logger/index'
import { BadRequestError, ConflictError, DatabaseError, InternalServerError, NotFoundError, UnauthorizedError } from '@/utils/Errors'
import { USER_ROLE_ID } from '@/config/app.config'
import { SignupCredientials, LoginCredientials, Permission } from './auth.types'
import { PrismaUserRepository } from '../repository/PrismaUserRepository'
import { PrismaSessionRepository } from '../repository/PrismaSessionRepository'
import { PrismaResetPasswordRepository } from '../repository/PrismaResetPasswordRepository'
import sendResetEmail from '@/utils/resend'
import { comparePassword, hashedPassword } from '@/utils/HashPassword'

class AuthService {
    private userRepository: PrismaUserRepository
    private sessionRepository: PrismaSessionRepository
    private resetPasswordRepository: PrismaResetPasswordRepository

    constructor() {
        this.userRepository = new PrismaUserRepository()
        this.sessionRepository = new PrismaSessionRepository()
        this.resetPasswordRepository = new PrismaResetPasswordRepository()
    }

    public async registerUser(credentials: SignupCredientials): Promise<void> {
        try {
            // Check if email exists
            const existedUser = await this.userRepository.getUserByEmail(credentials?.email)
            if (existedUser) throw new ConflictError('User with this email already exists')

            // Check if username exists
            const existedUsername = await this.userRepository.getUserByUsername(credentials?.username)
            if (existedUsername) throw new ConflictError('User with this username already exists')

            // Hash password
            const hashPassword = await hashedPassword(credentials?.password)
            if (!hashPassword) throw new BadRequestError('Error hashing password')

            // Set password to hashed password
            credentials.password = hashPassword

            // Create user
            const newUser = await this.userRepository.create({
                firstName: credentials?.firstName,
                lastName: credentials?.lastName,
                username: credentials?.username,
                email: credentials?.email,
                hashPassword: credentials?.password,
                roleId: USER_ROLE_ID,
                lastLoginAt: new Date()
            })
            if (!newUser) {
                throw new DatabaseError('Database error occurred while creating user')
            }
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }
            throw new InternalServerError('An unexpected error occurred during registration')
        }
    }

    public async loginUser(
        credientials: LoginCredientials,
        options: { userAgent: string; ipAddress: string }
    ): Promise<{ accessToken: string; refreshToken: string }> {
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
            const userPermissions = await this.userRepository.getUserPermissions(user.roleId)

            if (!userPermissions) {
                throw new DatabaseError('Database error occurred while fetching user permissions')
            }
            logger.info(`User permissions: ${JSON.stringify(userPermissions)}`)
            // Generate access and refresh tokens
            //todo Remember to add user permissions to the token payload
            const tokens = await this.getTokens(user, userPermissions)
            if (!tokens) {
                throw new InternalServerError('Error generating tokens')
            }

            // Create session
            const sessionPayload = {
                userId: user.id,
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
                userAgent: options.userAgent,
                ipAddress: options.ipAddress
            }

            // Create session in the database
            await this.sessionRepository.createSession(sessionPayload)

            // Update user lastLoginAt
            return tokens
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }
            throw new Error('An unexpected error occurred during login')
        }
    }

    public async logoutUser(sessionId: string): Promise<void> {
        try {
            // Invalidate the session
            await this.sessionRepository.deleteSession(sessionId)
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }
            throw new InternalServerError('An unexpected error occurred during logout')
        }
    }

    public async forgotPasswordService(email: string): Promise<{ link: string; userId: string }> {
        try {
            const user = await this.verifyUserByEmail(email)

            if (user === null) {
                throw new NotFoundError('User not found')
            }
            const rawResetToken = tokenManagement.generateResetToken()

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
            const hashedToken: string | null = await this.resetPasswordRepository.verifyResetPasswordToken(payload.userId)
            if (!hashedToken) {
                throw new NotFoundError('Reset password token not found or expired')
            }

            // Compare the hashed token with the raw token
            const isTokenValid: boolean = await comparePassword(payload.token, hashedToken)
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
            // Check if the refresh token is valid
            const session = await this.sessionRepository.getSessionByRefreshToken(refreshToken)
            if (!session) {
                throw new UnauthorizedError('User is not logged in')
            }

            if (session.refreshToken !== refreshToken) {
                throw new BadRequestError('Invalid refresh token')
            }

            // Create a new access token and refresh token
            const user = await this.userRepository.getUserById(session.userId)
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

            // Update the session with the new tokens
            await this.sessionRepository.updateSession(session.id, {
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken
            })

            return tokens
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }
            throw new InternalServerError('An unexpected error occurred while verifying refresh token')
        }
    }

    // ------------------------------ PRIVATE METHODS ------------------------------------------------- //
    // This method is private and is used to generate access and refresh tokens
    private async getTokens(user: User, rolePermissions: Permission[]): Promise<{ accessToken: string; refreshToken: string }> {
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
                subject: payload
            })

            return {
                accessToken,
                refreshToken
            }
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }
            throw new InternalServerError('An unexpected error occurred while generating tokens')
        }
    }

    private async verifyUserByEmail(email: string): Promise<User | null> {
        return await this.userRepository.getUserByEmail(email)
    }
}

export const authServices = new AuthService()
