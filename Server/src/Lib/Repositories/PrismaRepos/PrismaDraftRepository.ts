import { Post, PostStatus } from '@prisma/client'
import prisma from '../../database/PrismaConnection'
import { IDraftRepository } from '../Interfaces/IDraftRepository'
import { PostDTO } from '../../Models/Blog'

type SortOrder = 'asc' | 'desc'

export class PrismaDraftRepository implements IDraftRepository {
    public async create(payload: Partial<Post>): Promise<Post> {
        const { authorId, status } = payload

        const draft = await prisma.post.create({
            data: {
                authorId: authorId as string,
                status: status as PostStatus
            }
        })

        return draft
    }

    public async update(where: { id: string }, payload: Partial<Post>): Promise<Post> {
        try {
            const draft = await prisma.post.update({
                where,
                data: payload
            })

            return draft
        } catch (error) {
            throw new Error(`Failed to update draft ${(error as Error).message}`)
        }
    }

    public async delete(where: { id: string }): Promise<void> {
        try {
            await prisma.post.delete({
                where: where
            })
        } catch (error) {
            throw new Error(`Failed to delete draft ${(error as Error).message}`)
        }
    }

    public async findDraft(where: {id: string, authorId: string}, fields: PostDTO): Promise<Partial<Post> | null> {
        try {
            const draft = await prisma.post.findUnique({
                where: where,
                select: fields
            })

            return draft
        } catch (error) {
            throw new Error(`Failed to find draft ${(error as Error).message}`)
        }
    }

    public async findDraftById(where: { id: string; authorId: string }): Promise<Post | null> {
        const draft = await prisma.post.findUnique({
            where: where
        })

        return draft
    }

    public async findDraftBySlug(where: { slug: string }): Promise<Post | null> {
        try {
            const draft = await prisma.post.findUnique({
                where: where
            })

            return draft
        } catch (error) {
            throw new Error(`Failed to find draft by slug ${(error as Error).message}`)
        }
    }

    public async findDraftsByAuthorId(where: { authorId: string }, orderBy: { createdAt: SortOrder }): Promise<Post[] | null> {
        try {
            const drafts = await prisma.post.findMany({
                where: where,
                orderBy: orderBy
            })

            return drafts
        } catch (error) {
            throw new Error(`Failed to find drafts ${(error as Error).message}`)
        }
    }
}
