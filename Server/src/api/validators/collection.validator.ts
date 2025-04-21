import { z } from 'zod'

/**
 * Schema for validating the parameters required to get a collection.
 * 
 * @property {string} collectionId - The id of the collection.
 */
export const CollectionParamsSchema = z.object({
    collectionId: z.string().cuid()
})

/**
 * Schema for validating the parameters required to get a post.
 * 
 * @property {string} postId - The id of the post.
 */
export const PostParamsSchema = z.object({
    postId: z.string().cuid()
})

/**
 * Schema for validating the query parameters required to get a list of collections.
 * 
 * @property {number} limit - The number of collections to return.
 * @property {number} page - The page number.
 */
export const CollectionQuerySchema = z.object({
    limit: z.number().int().min(1).max(100).default(10).optional(),
    page: z.number().int().min(1).default(1).optional(),
})

/**
 * Schema for validating the data required to create a collection.
 * 
 * @property {string} name - The name of the collection.
 * @property {string} [description] - The description of the collection (optional).
 */
export const CollectionBodySchema = z.object({
    name: z.string().min(3).max(100),
    description: z.string().min(2).max(500).optional()
})


