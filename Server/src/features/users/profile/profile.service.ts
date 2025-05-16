import { IUserRepository, PrismaUserRepository } from '@/features/users/repository/PrismaUserRepository'
import { StandardError } from '@/utils/Errors/StandardError'
import { BadRequestError, DatabaseError, InternalServerError } from '@/utils/Errors'
import { Dashboard, ProfileChangePasswordCredentials, UpdateProfileCredentials } from './profile.types'
import { User } from '@prisma/client'
import { comparePassword, hashedPassword } from '@/utils/HashPassword'

class ProfileService {
    constructor(private userRepository: IUserRepository) {
        this.userRepository = userRepository
    }

    public async updateUserProfileService(id: string, userDetails: UpdateProfileCredentials): Promise<void> {
        try {
            await this.userRepository.updateUserDetails(id, userDetails)
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }

            throw new InternalServerError('An error occurred while updating the user profile')
        }
    }

    public async deleteAccountService(id: string): Promise<User | void> {
        try {
            await this.userRepository.delete(id)
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }

            throw new InternalServerError('An error occurred while deleting the user profile')
        }
    }

    public async changePasswordService(id: string, passwords: ProfileChangePasswordCredentials): Promise<void> {
        // Update user password
        try {
            // Check if the old password is correct
            const user = await this.userRepository.getUserById(id)
            if (!user) throw new BadRequestError('User not found')

            // if no password found then throw error
            if (!user.password) throw new BadRequestError('User password not found')

            // Compare the old password with the hashed password
            await comparePassword(passwords.oldPassword, user.password)

            // Hash the new password
            const hashPassword = await hashedPassword(passwords.newPassword)
            if (!hashPassword) throw new BadRequestError('Error hashing password')

            // Update the password in the database
            await this.userRepository.updatePassword(id, hashPassword)
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }

            throw new InternalServerError('An error occurred while changing the user password')
        }
    }

    public async getProfileDetailsService(userId: string): Promise<Dashboard> {
        try {
            const dashboard = await this.userRepository.getDashboardDetails(userId)

            if (!dashboard) {
                throw new DatabaseError('Unable to fetch the dashboard data')
            }

            return dashboard
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }

            throw new InternalServerError('An error occurred while changing the user password')
        }
    }

    public async getFollowingStatus(viewerId: string, profileId: string): Promise<boolean> {
        try {
            const followingStatus = await this.userRepository.getFollowingStatus(viewerId, profileId)
            return followingStatus
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }

            throw new InternalServerError('An error occurred while fetching user permissions')
        }
    }
}

const profileService = new ProfileService(new PrismaUserRepository())
export default profileService
