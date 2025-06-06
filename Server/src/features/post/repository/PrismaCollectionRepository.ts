import prisma from '@/config/prisma.config'
import { SavedPost } from '@prisma/client'

interface ISavedPostRepository {
    getCollectionById(collectionId: string): Promise<SavedPost | null>
    getCollectionsByAuthor(authorId: string): Promise<SavedPost[]>
    getCollectionsByFollowings(followingIds: string[]): Promise<SavedPost[]>
}

class PrismaCollectionRepository implements ISavedPostRepository {
    public async getCollectionById(collectionId: string): Promise<SavedPost | null> {
        return prisma.savedPost.findFirst({
            where: { id: collectionId }
        })
    }

    public async getCollectionsByAuthor(authorId: string): Promise<SavedPost[]> {
        return prisma.savedPost.findMany({
            where: { userId: authorId }
        })
    }

    public async getCollectionsByFollowings(followingIds: string[]): Promise<SavedPost[]> {
        return prisma.savedPost.findMany({
            where: { userId: { in: followingIds } }
        })
    }
}

const prismaCollectionRepository = new PrismaCollectionRepository()
export { ISavedPostRepository, prismaCollectionRepository }
