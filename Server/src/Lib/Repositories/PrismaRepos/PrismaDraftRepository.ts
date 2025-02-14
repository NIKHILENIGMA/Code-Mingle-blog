import { Post } from '@prisma/client'
import prisma from '../../../config/prisma.config'
import { IDraftRepository } from '../Interfaces/IDraftRepository'
import { Blog, PostDTO } from '../../Models/Blog'
import { DraftWhere, DraftWhereSlug, DraftOrderBy, GenerateDraft } from '../../../types/draft'
import { DRAFT_STATUS } from '../../../constant/draftStatus'

export class PrismaDraftRepository implements IDraftRepository {
    public async create(payload: GenerateDraft): Promise<Blog> {
        return await prisma.post.create({
            data: payload
        })
    }

    public async update(where: DraftWhere, payload: Partial<Post>): Promise<Post> {
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

    public async delete(where: DraftWhere): Promise<void> {
        try {
            await prisma.post.delete({
                where: where
            })
        } catch (error) {
            throw new Error(`Failed to delete draft ${(error as Error).message}`)
        }
    }

    public async findDraft(where: DraftWhere, fields: PostDTO): Promise<Partial<Post> | null> {
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

    public async findDrafts(): Promise<Post[] | null> {
        return await prisma.post.findMany({ where: { status: DRAFT_STATUS.DRAFT } })
    }

    public async findDraftById(where: DraftWhere): Promise<Post | null> {
        const draft = await prisma.post.findUnique({
            where: where
        })

        return draft
    }

    public async findDraftBySlug(where: DraftWhereSlug): Promise<Post | null> {
        try {
            const draft = await prisma.post.findUnique({
                where: where
            })

            return draft
        } catch (error) {
            throw new Error(`Failed to find draft by slug ${(error as Error).message}`)
        }
    }

    public async findDraftsByAuthorId(where: DraftWhere, orderBy: { createdAt: DraftOrderBy }): Promise<Post[] | null> {
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
