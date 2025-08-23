import { z } from 'zod'

/**
 * Schema for validating the data required to follow a user.
 *
 * @property {string} followingId - The ID of the user to be followed.
 */
export const followSchema = z.object({
    id: z.string().cuid()
})

/**
 * Schema for validating the data required to unfollow a user.
 *
 * @property {string} followingId - The ID of the user to be unfollowed.
 */
export const unfollowSchema = z.object({
    id: z.string().cuid()
})

/**
 * Schema for getting a list of followers with optional pagination.
 *
 * @property {string} [userId] - The ID of the user whose followers are to be fetched (optional).
 * @property {number} [limit] - The maximum number of followers to fetch (optional).
 * @property {number} [page] - The page number for pagination (optional).
 */
export const getFollowersSchema = z.object({
    userId: z.string().cuid().optional(),
    limit: z.number().int().positive().optional(),
    page: z.number().int().positive().optional()
})

/**
 * Schema for getting a list of users that a specific user is following with optional pagination.
 *
 * @property {string} userId - The ID of the user whose following list is to be fetched.
 * @property {number} [limit] - The maximum number of users to fetch (optional).
 * @property {number} [page] - The page number for pagination (optional).
 */
export const getFollowingSchema = z.object({
    userId: z.string().cuid().optional(),
    limit: z.number().int().positive().optional(),
    page: z.number().int().positive().optional()
})

/**
 * Schema for getting the follow status between two users.
 *
 * @property {string} userId - The ID of the user whose follow status is to be fetched.
 */
export const getFollowStatusSchema = z.object({
    userId: z.string().cuid()
})
