import { NextFunction, Request } from 'express'
import { ApiError } from '../../../utils/ApiError'
import responseMessage from '../../../constant/responseMessage'
import prisma from '../../../config/prisma.config'
import { PostCardDTO, UpdateUserDTO, User, UserProfileDTO, UserUsernameWhere } from '../../../Lib/Models/User'
import bcrypt from 'bcrypt'
import { UserDTO } from '../../../types/types'

interface ChangePassword {
    oldPassword: string
    newPassword: string
}
const { METHOD_FAILED, NOT_FOUND, BAD_REQUEST } = responseMessage

export default class ProfileService {
    
    /**
     * Updates user profile information in the database
     *
     * @param req - Express Request object
     * @param next - Express NextFunction for error handling
     * @param where - Object containing user id to identify which user to update
     * @param userDetails - DTO containing updated user profile information
     * @returns Promise resolving to updated User object or void if error occurs
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
     * Deletes user account from the database
     *
     * @param req - Express Request object
     * @param next - Express NextFunction for error handling
     * @param where - Object containing user id to identify which user to delete
     * @returns Promise resolving to deleted User object or void if error occurs
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
     * Retrieves user dashboard information from the database
     *
     * @param req - Express Request object
     * @param next - Express NextFunction for error handling
     * @param where - Object containing user id to identify which user to retrieve
     * @returns Promise resolving to UserDTO object or void if error occurs
     */
    public async getUserDashboardService(req: Request, next: NextFunction, where: { id: string }): Promise<UserDTO | void> {
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
                    role: true,
                    posts: {
                        select: {
                            id: true,
                            title: true,
                            content: true,
                            thumbnailImage: true,
                            category: true,
                            image: true,
                            createdAt: true,
                            updatedAt: true
                        }
                    },
                    followers: {
                        select: {
                            followerId: true
                        }
                    },
                    following: {
                        select: {
                            followingId: true
                        }
                    }
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

    public async getPublicProfileService(req: Request, next: NextFunction, where: UserUsernameWhere, userId: string): Promise<UserProfileDTO | void> {
        try {
            const userProfile = await prisma.user.findUnique({
                where,
                include: {
                    posts: {
                        select: {
                            id: true,
                            title: true,
                            content: true,
                            thumbnailImage: true,
                            category: true,
                            image: true,
                            createdAt: true,
                            updatedAt: true
                        }
                    },
                    followers: true,
                    following: true
                }
            })

            if (!userProfile) {
                return ApiError(new Error(NOT_FOUND('user not found').message), req, next, NOT_FOUND().code)
            }

            // Get follower count
            const followerCount = await this.countTheNumberOfFollowers(userProfile.id)

            // Get following count
            const followingCount = await this.countTheNumberOfFollowing(userProfile.id)

            // Get posts count
            const postsCount = await this.countTheNumberOfPosts(userProfile.id)

            // Check if the user is followed by the logged in user
            const isFollowedByLoggedInUser = await prisma.follow.findUnique({
                where: {
                    followerId_followingId: {
                        followerId: userId,
                        followingId: userProfile.id
                    }
                }
            })  

            // Fetch all posts
            const allPosts: PostCardDTO[] = userProfile.posts.map((post) => ({
                id: post.id,
                title: post.title || '',
                content: post.content || '',
                thumbnailImage: post.thumbnailImage || '',
                image: post.image || '',
                category: post.category ? (typeof post.category === 'string' ? post.category : post.category.name) : '',
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
              }));

            const userProfileDTP: UserProfileDTO = {
                id: userProfile.id,
                username: userProfile.username,
                firstName: userProfile.firstName,
                lastName: userProfile.lastName,
                bio: userProfile.bio,
                avatarImg: userProfile.avatarImg,
                coverImg: userProfile.coverImg,
                followerCount,
                followingCount,
                postCount: postsCount,
                isFollowedByLoggedInUser: !!isFollowedByLoggedInUser,
                allPosts
            } 

            return userProfileDTP

        } catch (error) {
            return ApiError(
                error instanceof Error ? error : new Error(METHOD_FAILED('get user dashboard service').message),
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

    private async countTheNumberOfPosts(authorId: string): Promise<number> {
        return await prisma.post.count({ where: { authorId } })
    }

    private async countTheNumberOfFollowers(authorId: string): Promise<number> {
        return await prisma.follow.count({ where: { followingId: authorId } })
    }

    private async countTheNumberOfFollowing(authorId: string): Promise<number> {
        return await prisma.follow.count({ where: { followerId: authorId } })
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
