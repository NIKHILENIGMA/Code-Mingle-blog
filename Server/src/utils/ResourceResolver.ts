import prisma from '@/config/prisma.config'

/**
 * Object containing resolver functions for different resource types
 * @type {Object.<string, Function>}
 */
export const resourceResolvers = {
    /** 
     * Resolver for Post resources
     * @param {string} id - The unique identifier of the post
     * @returns {Promise<Post|null>} The found post or null if not found
     */
    POST: async (id: string) => await prisma.post.findUnique({ where: { id } }),

    /**
     * Resolver for Comment resources  
     * @param {string} id - The unique identifier of the comment
     * @returns {Promise<Comment|null>} The found comment or null if not found
     */
    COMMENT: async (id: string) => await prisma.comment.findUnique({ where: { id } }),

    /**
     * Resolver for User resources
     * @param {string} id - The unique identifier of the user
     * @returns {Promise<User|null>} The found user or null if not found
     */
    USER: async (id: string) => await prisma.user.findUnique({ where: { id } }),

    /**
     * Resolver for AdminPanel resource
     * @returns {null} Always returns null as this is an abstract resource
     */
    ADMIN_PANEL: () => null // abstract resource, not tied to ID
}
