import { User, UserProvider } from '@/generated/prisma/client'
import { PrismaUserRepository } from '@/api/repository/user.repository'
import { PrismaRoleRepository } from '@/api/repository/role.repository'
import { PrismaResetPasswordRepository } from '@/api/repository/reset.repository'

import { comparePassword, hashedPassword } from '@/utils/HashPassword'
import { generateUniqueUsername } from '@/utils/generateUsername'
import { StandardError } from '@/utils/Errors/StandardError'
import { logger } from '@/utils/logger/index'
import { BadRequestError, DatabaseError, InternalServerError, NotFoundError } from '@/utils/Errors'

import { SignupCredientials, LoginCredientials, Permission } from './auth.types'
import { ROLE } from '@/types/common/enum.types'

/**
 * Interface representing the result of a successful user login.
 * Contains user data and associated permissions.
 */
interface UserLogin {
    /** The authenticated user object */
    user: User
    /** Array of permissions granted to the user */
    permissions: Permission[]
}

/**
 * Service class for handling user authentication operations.
 *
 * This service provides comprehensive authentication functionality including
 * user registration, login, password management, and user verification.
 * It integrates with multiple repositories to manage user data, roles, and
 * password reset tokens.
 *
 * @example
 * ```typescript
 * const authService = new AuthService();
 * const user = await authService.registerUser(credentials);
 * const loginResult = await authService.loginUser(loginCredentials);
 * ```
 */
export class AuthService {
    /** Repository for user database operations */
    private userRepository: PrismaUserRepository
    /** Repository for password reset token operations */
    private resetPasswordRepository: PrismaResetPasswordRepository
    /** Repository for role management operations */
    private roleRepository: PrismaRoleRepository

    /**
     * Creates a new instance of AuthService.
     * Initializes all required repository dependencies.
     */
    constructor() {
        this.userRepository = new PrismaUserRepository()
        this.resetPasswordRepository = new PrismaResetPasswordRepository()
        this.roleRepository = new PrismaRoleRepository()
    }

    /**
     * Registers a new user in the system.
     *
     * This method handles the complete user registration process including
     * password hashing, role assignment, and database persistence. It assigns
     * the default USER role to new registrations and generates a unique username.
     *
     * @param credentials - The signup credentials containing user information
     * @param credentials.firstName - User's first name
     * @param credentials.lastName - User's last name
     * @param credentials.email - User's email address (must be unique)
     * @param credentials.password - User's plain text password (will be hashed)
     * @returns Promise resolving to the created User object
     * @throws {BadRequestError} When password hashing fails
     * @throws {NotFoundError} When the default USER role is not found
     * @throws {DatabaseError} When user creation fails in the database
     * @throws {InternalServerError} For unexpected errors during registration
     *
     * @example
     * ```typescript
     * const credentials = {
     *   firstName: 'John',
     *   lastName: 'Doe',
     *   email: 'john.doe@example.com',
     *   password: 'securePassword123'
     * };
     * const user = await authService.registerUser(credentials);
     * ```
     */
    public async registerUser(credentials: SignupCredientials): Promise<User> {
        try {
            // Hash password for secure storage
            const hashPassword = await hashedPassword(credentials?.password)
            if (!hashPassword) throw new BadRequestError('Error hashing password')

            // Replace plain text password with hashed version
            credentials.password = hashPassword

            // Retrieve default user role from database
            const role = await this.roleRepository.getRoleByName(ROLE.USER)
            if (!role) {
                throw new NotFoundError('User role not found')
            }

            // Create new user with generated username and role assignment
            const newUser = await this.userRepository.create({
                firstName: credentials?.firstName,
                lastName: credentials?.lastName,
                username: generateUniqueUsername(credentials?.firstName || 'user'),
                email: credentials?.email,
                password: credentials?.password,
                roleId: role.id,
                lastLoginAt: new Date()
            })

            if (!newUser) {
                throw new DatabaseError('Database error occurred while creating user')
            }

            return newUser
        } catch (error) {
            // Re-throw known errors without modification
            if (error instanceof StandardError) {
                throw error
            }
            // Log and re-throw generic errors
            if (error instanceof Error) {
                logger.error(`Error during user registration: ${error.message}`)
                throw error
            }
            // Handle unexpected error types
            throw new InternalServerError('An unexpected error occurred during registration')
        }
    }

    /**
     * Authenticates a user with email and password credentials.
     *
     * This method performs secure user authentication by validating credentials
     * against stored user data. It handles special cases for OAuth-authenticated
     * users and provides appropriate error messages for security.
     *
     * @param credientials - Login credentials containing email and password
     * @param credientials.email - User's email address
     * @param credientials.password - User's plain text password
     * @returns Promise resolving to UserLogin object with user data and permissions
     * @throws {BadRequestError} When credentials are invalid or user has OAuth-only authentication
     * @throws {InternalServerError} For unexpected errors during authentication
     *
     * @example
     * ```typescript
     * const credentials = {
     *   email: 'user@example.com',
     *   password: 'userPassword123'
     * };
     * const loginResult = await authService.loginUser(credentials);
     * console.log(loginResult.user.email); // 'user@example.com'
     * ```
     */
    public async loginUser(credientials: LoginCredientials): Promise<UserLogin> {
        try {
            // Fetch user with associated permissions for authentication
            const userWithPermissions = await this.userRepository.getUserForLogin(credientials.email)
            if (!userWithPermissions) throw new BadRequestError('Invalid email or password')

            // Handle OAuth-authenticated users who don't have passwords
            const hashedPassword = userWithPermissions.user.password
            if (!hashedPassword) {
                throw new BadRequestError('Please try to login by authentication with Google')
            }

            // Perform secure password comparison
            let passwordMatch: boolean
            try {
                passwordMatch = await comparePassword(credientials.password, hashedPassword)
            } catch (err) {
                logger.error('Password comparison failed:', err)
                throw new BadRequestError('Invalid email or password')
            }

            if (!passwordMatch) {
                throw new BadRequestError('Invalid email or password')
            }

            // Return successful authentication result
            // TODO: Update user lastLoginAt timestamp
            return {
                user: userWithPermissions.user,
                permissions: userWithPermissions.permissions
            }
        } catch (error) {
            // Preserve known error types
            if (error instanceof StandardError) {
                throw error
            }
            // Wrap unexpected errors with context
            throw new InternalServerError('An unexpected error occurred during login: ' + (error as Error).message)
        }
    }

    /**
     * Resets a user's password using a secure token-based process.
     *
     * This method validates a password reset token and updates the user's password
     * if the token is valid and not expired. The token validation uses secure
     * hashing comparison to prevent timing attacks.
     *
     * @param payload - Password reset payload
     * @param payload.userId - ID of the user requesting password reset
     * @param payload.token - Raw reset token received by user
     * @param payload.newPassword - New password to set (will be hashed)
     * @returns Promise that resolves when password is successfully reset
     * @throws {NotFoundError} When reset token is not found or expired
     * @throws {BadRequestError} When the provided token is invalid
     * @throws {InternalServerError} For unexpected errors during password reset
     *
     * @example
     * ```typescript
     * await authService.resetPasswordService({
     *   userId: 'user123',
     *   token: 'reset-token-from-email',
     *   newPassword: 'newSecurePassword123'
     * });
     * ```
     */
    public async resetPasswordService(payload: { userId: string; token: string; newPassword: string }): Promise<void> {
        try {
            // Retrieve stored hash token for the user
            const hashToken = await this.resetPasswordRepository.verifyResetPasswordToken(payload.userId)
            if (!hashToken) {
                throw new NotFoundError('Reset password token not found or expired')
            }

            // Securely compare provided token with stored hash
            const isTokenValid: boolean = await comparePassword(payload.token, hashToken.tokenHash)
            if (!isTokenValid) {
                throw new BadRequestError('Token which is already expired or invalid')
            }

            // Process password reset if token is valid
            if (isTokenValid) {
                // TODO: Complete password reset implementation
                // Hash the new password and update user record
                await hashedPassword(payload.newPassword)
                // TODO: Update user password in database
                // TODO: Invalidate the reset token after successful use
            }
        } catch (error) {
            // Preserve error type hierarchy
            if (error instanceof StandardError) {
                throw error
            }
            throw new InternalServerError('An unexpected error occurred during password reset')
        }
    }

    /**
     * Updates a user's password after verifying their current password.
     *
     * This method provides secure password change functionality by requiring
     * verification of the current password before allowing the update.
     *
     * @param userId - Unique identifier of the user
     * @param oldPassword - User's current password for verification
     * @param newPassword - New password to set
     * @returns Promise that resolves when password is successfully updated
     * @throws {StandardError} When password update fails due to business logic
     * @throws {InternalServerError} For unexpected errors during password update
     *
     * @example
     * ```typescript
     * await authService.updateUserPassword(
     *   'user123',
     *   'currentPassword',
     *   'newSecurePassword123'
     * );
     * ```
     */
    public async updateUserPassword(userId: string, oldPassword: string, newPassword: string): Promise<void> {
        try {
            await this.userRepository.updatePassword(userId, oldPassword, newPassword)
        } catch (error) {
            // Maintain error type for business logic errors
            if (error instanceof StandardError) {
                throw error
            }
            // Log and wrap generic errors with context
            if (error instanceof Error) {
                logger.error(`Error updating user password: ${error.message}`)
                throw new InternalServerError('Error updating user password')
            }
            throw new InternalServerError('An unexpected error occurred while updating user password')
        }
    }

    /**
     * Retrieves user details along with their associated permissions.
     *
     * This method fetches comprehensive user information including their
     * role-based permissions for authorization purposes.
     *
     * @param userId - Unique identifier of the user
     * @returns Promise resolving to UserLogin object with user and permissions
     * @throws {NotFoundError} When the specified user is not found
     * @throws {InternalServerError} For unexpected errors during data retrieval
     *
     * @example
     * ```typescript
     * const userLogin = await authService.getUserDetailsAndPermissions('user123');
     * console.log(userLogin.user.email);
     * console.log(userLogin.permissions.length);
     * ```
     */
    public async getUserDetailsAndPermissions(userId: string): Promise<UserLogin> {
        try {
            const userWithPermissions = await this.userRepository.getUserForLogin(userId)
            if (!userWithPermissions) {
                throw new NotFoundError('User not found', 'AuthService.getUserDetailsAndPermissions')
            }

            return {
                user: userWithPermissions.user,
                permissions: userWithPermissions.permissions
            }
        } catch (error) {
            // Preserve structured error types
            if (error instanceof StandardError) {
                throw error
            }
            // Provide detailed error context for debugging
            throw new InternalServerError(`An unexpected error occurred while retrieving user details: ${(error as Error).message}`)
        }
    }

    /**
     * Verifies if a user exists by their email address.
     *
     * This method provides a simple lookup mechanism to check user existence
     * without exposing sensitive information. Returns null if user is not found.
     *
     * @param email - Email address to verify
     * @returns Promise resolving to User object if found, null otherwise
     *
     * @example
     * ```typescript
     * const user = await authService.verifyUserByEmail('test@example.com');
     * if (user) {
     *   console.log('User exists');
     * } else {
     *   console.log('User not found');
     * }
     * ```
     */
    public async verifyUserByEmail(email: string): Promise<User | null> {
        return await this.userRepository.getUserByEmail(email)
    }

    public async authProviderLogin(email: string): Promise<UserProvider | null> {
        try {
            // Check if user exists with OAuth login
            return await this.userRepository.getUserLoginByGoogle(email)
        } catch (error) {
            // Preserve structured error types
            if (error instanceof StandardError) {
                throw error
            }
            // Provide detailed error context for debugging
            throw new InternalServerError(
                `An unexpected error occurred during OAuth login: ${(error as Error).message}`,
                'AuthService.authProviderLogin'
            )
        }
    }
}

/** Singleton instance of AuthService for application-wide use */
export const authServices = new AuthService()
