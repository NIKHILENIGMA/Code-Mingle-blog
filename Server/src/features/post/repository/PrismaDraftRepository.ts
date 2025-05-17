import { ENUMS } from '@/types'
import { Post } from '@prisma/client'
import { DraftPreview } from '../drafts/draft.types'
import prisma from '@/config/prisma.config'

interface CreateDraftPayload {
    status: ENUMS.DRAFT_STATUS
    userId: string
    slug: string
}

export interface IDraftRepository {
    createDraft(payload: CreateDraftPayload): Promise<Post>
    updateDraft(id: string, userId: string, payload: Partial<Post>): Promise<void>
    deleteDraft(id: string, userId: string, status: ENUMS.DRAFT_STATUS): Promise<void>
    getDraft(id: string, userId: string, status: ENUMS.DRAFT_STATUS): Promise<Partial<Post> | null>
    getDraftByDraftAndUserId(id: string, userId: string): Promise<Post | null>
    getDraftsByUserId(userId: string, status: ENUMS.DRAFT_STATUS): Promise<Post[] | null>
    draftPreviewById(id: string, userId: string, status: ENUMS.DRAFT_STATUS): Promise<DraftPreview | null>
}

class PrismaDraftRepository implements IDraftRepository {
    private readonly draftSelect = {
        id: true,
        title: true,
        content: true,
        slug: true,
        postCoverImage: true,
        thumbnailImage: true,
        readTime: true
    }

    private readonly draftPreviewSelect = {
        id: true,
        title: true,
        slug: true,
        content: true,
        postCoverImage: true,
        readTime: true,
        author: {
            select: {
                id: true,
                username: true,
                avatarImg: true
            }
        },
        createdAt: true,
        updatedAt: true
    }

    public async createDraft(payload: CreateDraftPayload): Promise<Post> {
        return await prisma.post.create({
            data: payload
        })
    }

    public async updateDraft(id: string, userId: string, payload: Partial<Post>): Promise<void> {
        await prisma.post.update({
            where: {
                id,
                userId
            },
            data: payload
        })
    }

    public async deleteDraft(id: string, userId: string, status: ENUMS.DRAFT_STATUS): Promise<void> {
        await prisma.post.delete({
            where: {
                id,
                userId,
                status
            }
        })
    }

    public async getDraft(id: string, userId: string, status: ENUMS.DRAFT_STATUS): Promise<Partial<Post> | null> {
        const draft = await prisma.post.findUnique({
            where: {
                id,
                userId,
                status
            },
            select: this.draftSelect
        })

        return draft
    }

    public async getDraftByDraftAndUserId(id: string, userId: string): Promise<Post | null> {
        const draft = await prisma.post.findUnique({
            where: {
                id,
                userId
            }
        })

        return draft
    }

    public async getDraftsByUserId(userId: string, status: ENUMS.DRAFT_STATUS): Promise<Post[] | null> {
        const drafts = await prisma.post.findMany({
            where: {
                userId,
                status
            }
        })

        return drafts
    }

    public async draftPreviewById(id: string, userId: string, status: ENUMS.DRAFT_STATUS): Promise<DraftPreview | null> {
        const draftPreview = await prisma.post.findUnique({
            where: {
                id,
                userId,
                status
            },
            select: this.draftPreviewSelect
        })

        return draftPreview
    }
}

export default PrismaDraftRepository
