import { Request, NextFunction } from 'express'
import { ApiError } from '../utils/ApiError'
import { PostStatus } from '@prisma/client'
import responseMessage from '../constant/responseMessage'
import { BlogDraft, ISaveDraftBody, PostDTO } from '../Lib/Models/Blog'
import { IDraftRepository } from '../Lib/Repositories/Interfaces/IDraftRepository'
import { RepositoryFactory } from '../Lib/Repositories'
import { orderBy } from '../constant/PrismaOptions'

interface GenerateDraft {
    status: PostStatus
    authorId: string
}
interface SaveDraftpayload {
    status: PostStatus
    title: string
    image: string
    content: string
    slug?: string
}

const { METHOD_FAILED, BAD_REQUEST, NOT_FOUND } = responseMessage

class DraftService {
    private DraftRepository: IDraftRepository
    constructor() {
        this.DraftRepository = RepositoryFactory.DraftRepository()
    }

    public async newDraftService(req: Request, next: NextFunction, id: string): Promise<string | void> {
        try {
            const payload: GenerateDraft = {
                status: 'DRAFT',
                authorId: id
            }

            const draft = await this.DraftRepository.create(payload)

            if (!draft) {
                return ApiError(new Error(METHOD_FAILED('draft generation').message), req, next, METHOD_FAILED().code)
            }

            return draft.id
        } catch (error) {
            return ApiError(
                error instanceof Error ? error : new Error(METHOD_FAILED('create draft service').message),
                req,
                next,
                METHOD_FAILED().code
            )
        }
    }

    public async saveDraftService(req: Request, next: NextFunction, draftId: string, userId: string, body: ISaveDraftBody): Promise<string | void> {
        const makedSlug = this.generateSlug(body.title)

        const payload: SaveDraftpayload = {
            status: PostStatus.DRAFT,
            title: body.title,
            image: body.image,
            content: body.content,
            slug: makedSlug
        }
        try {
            const draft = await this.DraftRepository.findDraftById({ draftId, userId })

            if (!draft) {
                return ApiError(new Error(NOT_FOUND('draft not found or draft might be deleted already').message), req, next, NOT_FOUND().code)
            }

            const updatedDraft = await this.DraftRepository.update({ id: draft.id }, payload)

            if (!updatedDraft?.slug) {
                return ApiError(new Error(BAD_REQUEST('Try with unique title').message), req, next, BAD_REQUEST().code)
            }

            return 'Draft saved successfully'
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('save draft service').message), req, next, METHOD_FAILED().code)
        }
    }

    public async removeDraftService(req: Request, next: NextFunction, draftId: string, userId: string): Promise<string | void> {
        try {
            const draft = await this.DraftRepository.findDraftById({
                draftId,
                userId
            })

            if (!draft) {
                return ApiError(new Error(NOT_FOUND('draft or draft might be deleted already').message), req, next, NOT_FOUND().code)
            }

            const draftIdToDelete: string = draft.id // draft.id is not null here

            await this.DraftRepository.delete({ draftIdToDelete, userId })

            return 'Draft removed successfully'
        } catch (error) {
            return ApiError(
                error instanceof Error ? error : new Error(METHOD_FAILED('remove draft service').message),
                req,
                next,
                METHOD_FAILED().code
            )
        }
    }

    public async getDraftService(req: Request, next: NextFunction, draftId: string, userId: string): Promise<Partial<BlogDraft> | void> {
        const postDTO: PostDTO = {
            id: true,
            authorId: true,
            title: true,
            content: true,
            status: true,
            image: true,
            slug: true,
            createdAt: true
        }

        try {
            const currentDraft = await this.DraftRepository.findDraft({ id: draftId, authorId: userId }, postDTO)

            if (!currentDraft) {
                return ApiError(new Error(NOT_FOUND('draft').message), req, next, NOT_FOUND().code)
            }

            return currentDraft
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('get draft service').message), req, next, METHOD_FAILED().code)
        }
    }

    public async listDraftService(req: Request, next: NextFunction, id: string) {
        const where = {
            authorId: id
        }

        try {
            const drafts = await this.DraftRepository.findDraftsByAuthorId(where, orderBy('desc'))

            if (!drafts || drafts.length === 0) {
                return ApiError(new Error(NOT_FOUND('drafts').message), req, next, NOT_FOUND().code)
            }

            return drafts
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('list draft service').message), req, next, METHOD_FAILED().code)
        }
    }

    public async getUserDraftService(req: Request, next: NextFunction, userId: string) {
        const where = {
            authorId: userId
        }

        try {
            const drafts = await this.DraftRepository.findDraftsByAuthorId(where, orderBy('desc'))

            if (!drafts) {
                return ApiError(new Error(NOT_FOUND('drafts').message), req, next, NOT_FOUND().code)
            }

            return drafts
        } catch (error) {
            return ApiError(
                error instanceof Error ? error : new Error(METHOD_FAILED('get user draft service').message),
                req,
                next,
                METHOD_FAILED().code
            )
        }
    }

    private generateSlug(title: string | undefined): string {
        if (!title || title === undefined) return ''
        return title?.toLowerCase().replace(/ /g, '-') ?? ''
    }
}

export default DraftService
