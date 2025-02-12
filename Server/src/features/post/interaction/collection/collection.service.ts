import { Request, NextFunction } from 'express'
import { CollectionData, CollectionDTO, SavedPosts } from './collection.types'
import { responseMessage } from '../../../../constant'
import { ApiError } from '../../../../utils/ApiError'
import prisma from '../../../../Lib/database/PrismaConnection'

const { METHOD_FAILED, NOT_FOUND } = responseMessage

export default class CollectionService {
    constructor() {}

    public async createCollectionService(
        req: Request,
        next: NextFunction,
        collectionData: CollectionData,
        userId: string
    ): Promise<CollectionDTO | void> {
        // Get the collection details from the request
        const { name, description } = collectionData

        if (!name) {
            return ApiError(new Error(NOT_FOUND('Collection name is required').message), req, next, NOT_FOUND().code)
        }

        try {
            return await prisma.collection.create({
                data: {
                    name,
                    description,
                    userId
                }
            })
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('register  user').message), req, next, METHOD_FAILED().code)
        }
    }

    public async removeCollectionService(req: Request, next: NextFunction, userId: string, collectionId: string): Promise<void> {
        try {
            await prisma.collection.delete({
                where: {
                    id: collectionId,
                    userId
                }
            })
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('register  user').message), req, next, METHOD_FAILED().code)
        }
    }

    public async addPostToCollectionService(
        req: Request,
        next: NextFunction,
        userId: string,
        collectionId: string,
        postId: string
    ): Promise<SavedPosts | void> {
        try {
            // Check if the collection exists
            const collection = await prisma.collection.findFirst({
                where: {
                    id: collectionId,
                    userId
                }
            })

            if (!collection) {
                return ApiError(new Error(NOT_FOUND('Collection not found').message), req, next, NOT_FOUND().code)
            }

            // Add the post to the collection
            const post = await prisma.savedPost.create({
                data: {
                    userId,
                    postId,
                    collectionId
                }
            })

            return post
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('register  user').message), req, next, METHOD_FAILED().code)
        }
    }

    public async removePostFromCollectionService(
        req: Request,
        next: NextFunction,
        userId: string,
        collectionId: string,
        postId: string
    ): Promise<void> {
        try {
            // Check if the collection exists
            const collection = await prisma.collection.findFirst({
                where: {
                    id: collectionId,
                    userId
                }
            })

            if (!collection) {
                return ApiError(new Error(NOT_FOUND('Collection not found').message), req, next, NOT_FOUND().code)
            }

            // Remove the post from the collection
            await prisma.savedPost.deleteMany({
                where: {
                    userId,
                    postId,
                    collectionId
                }
            })
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('register  user').message), req, next, METHOD_FAILED().code)
        }
    }

    public async getUserCollectionService(req: Request, next: NextFunction, userId: string, collectionId: string): Promise<CollectionDTO | void> {
        try {
            const collection = await prisma.collection.findFirst({
                where: {
                    id: collectionId,
                    userId
                },
                include: {
                    savedPosts: true
                }
            })

            if (!collection) {
                return ApiError(new Error(NOT_FOUND('Collection not found').message), req, next, NOT_FOUND().code)
            }

            return collection
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('register  user').message), req, next, METHOD_FAILED().code)
        }
    }

    public async getPostFromCollectionService(req: Request, next: NextFunction, userId: string, collectionId: string, postId: string): Promise<SavedPosts | void> {
        try {
            const post = await prisma.savedPost.findFirst({
                where: {
                    userId,
                    postId,
                    collectionId
                }
            })

            if (!post) {
                return ApiError(new Error(NOT_FOUND('Post not found').message), req, next, NOT_FOUND().code)
            }

            return post
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('register  user').message), req, next, METHOD_FAILED().code)
        }
    }

    public async listPostsInCollectionService(req: Request, next: NextFunction, userId: string, collectionId: string): Promise<SavedPosts[] | void> {
        try {
            const posts = await prisma.savedPost.findMany({
                where: {
                    userId,
                    collectionId
                }
            })

            return posts
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('register  user').message), req, next, METHOD_FAILED().code)
        }
    }

    public async listCollectionService(req: Request, next: NextFunction, userId: string): Promise<CollectionDTO[] | void> {
        try {
            const collections = await prisma.collection.findMany({
                where: {
                    userId
                },
                include: {
                    savedPosts: true
                }
            })

            return collections
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('register  user').message), req, next, METHOD_FAILED().code)
        }
    }
}
