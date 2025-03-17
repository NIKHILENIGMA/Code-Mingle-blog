import { Request, NextFunction } from 'express'
import { ApiError } from '../../../../utils/ApiError'
import responseMessage from '../../../../constant/responseMessage'
import { IDraftRepository } from '../../../../Lib/Repositories/Interfaces/IDraftRepository'
import { RepositoryFactory } from '../../../../Lib/Repositories'
import { DraftContent, DraftSelectFields, DraftUpdatePayload, DraftWhere, DraftWhereStatus, GenerateDraft } from '../../../../types/draft'
import { Post } from '@prisma/client'

const { METHOD_FAILED, NOT_FOUND } = responseMessage

class DraftService {
    private DraftRepository: IDraftRepository
    constructor() {
        this.DraftRepository = RepositoryFactory.DraftRepository()
    }

    public async newDraftService(req: Request, next: NextFunction, payload: GenerateDraft): Promise<string | void> {
        try {
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

    public async saveDraftService(
        req: Request,
        next: NextFunction,
        options: {
            where: DraftWhere
            draftContent: DraftContent
        }
    ): Promise<string | void> {
        /// Generate payload for update
        const payload: DraftUpdatePayload = {
            title: options.draftContent.title,
            content: options.draftContent.content
            // image: options.draftContent.image
        }

        try {
            /// Find draft by ID and author ID
            const existedDraft = await this.DraftRepository.findDraftById(options.where)

            if (!existedDraft) {
                return ApiError(new Error(NOT_FOUND('draft not found or draft might be deleted already').message), req, next, NOT_FOUND().code)
            }

            /// If draft is found, update the draft
            await this.DraftRepository.update(options.where, payload)

            /// Return success message
            const successMessage = 'Draft saved successfully'
            return successMessage
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('save draft service').message), req, next, METHOD_FAILED().code)
        }
    }

    public async removeDraftService(
        req: Request,
        next: NextFunction,
        options: {
            where: DraftWhere
        }
    ): Promise<string | void> {
        try {
            const existedDraft = await this.DraftRepository.findDraftById(options.where)

            if (!existedDraft) {
                return ApiError(new Error(NOT_FOUND('draft or draft might be deleted already').message), req, next, NOT_FOUND().code)
            }

            await this.DraftRepository.delete({ id: existedDraft.id })

            const successMessage = 'Draft removed successfully'
            return successMessage
        } catch (error) {
            return ApiError(
                error instanceof Error ? error : new Error(METHOD_FAILED('remove draft service').message),
                req,
                next,
                METHOD_FAILED().code
            )
        }
    }

    public async getDraftService(
        req: Request,
        next: NextFunction,
        options: {
            where: DraftWhere
            selectedFields: DraftSelectFields
        }
    ): Promise<Partial<Post> | void> {
        try {
            /// Find draft
            const currentDraft = await this.DraftRepository.findDraft(options.where, options.selectedFields)
            if (!currentDraft) {
                return ApiError(new Error(NOT_FOUND('draft').message), req, next, NOT_FOUND().code)
            }

            /// Return draft
            return currentDraft
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('get draft service').message), req, next, METHOD_FAILED().code)
        }
    }

    public async listDraftService(req: Request, next: NextFunction) {
        try {
            const drafts = await this.DraftRepository.findDrafts()

            if (!drafts || drafts.length === 0) {
                return ApiError(new Error(NOT_FOUND('drafts').message), req, next, NOT_FOUND().code)
            }

            return drafts
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('list draft service').message), req, next, METHOD_FAILED().code)
        }
    }

    public async getUserDraftsService(req: Request, next: NextFunction, options: { where: DraftWhereStatus }): Promise<Post[] | void> {
        try {
            const drafts: Post[] | null = await this.DraftRepository.findDraftsByAuthorId(options.where)

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

    public async updateDraftCoverImage(req: Request, next: NextFunction, where: { image: string }, draftId: string): Promise<string | void> {
        try {
            const draft = await this.DraftRepository.findDraftById({ id: draftId })

            if (!draft) {
                return ApiError(new Error(NOT_FOUND('draft').message), req, next, NOT_FOUND().code)
            }

            await this.DraftRepository.update({ id: draftId }, where)

            return 'Draft cover image updated successfully'
        } catch (error) {
            return ApiError(
                error instanceof Error ? error : new Error(METHOD_FAILED('update draft cover image').message),
                req,
                next,
                METHOD_FAILED().code
            )
        }
    }


    public async removeDraftCoverImage(req: Request, next: NextFunction, draftId: string): Promise<string | void> {
        try {
            const draft = await this.DraftRepository.findDraftById({ id: draftId })

            if (!draft) {
                return ApiError(new Error(NOT_FOUND('draft').message), req, next, NOT_FOUND().code)
            }

            await this.DraftRepository.update({ id: draftId }, { image: '' })

            return 'Draft cover image removed successfully'
        } catch (error) {
            return ApiError(
                error instanceof Error ? error : new Error(METHOD_FAILED('remove draft cover image').message),
                req,
                next,
                METHOD_FAILED().code
            )
        }
    }
}
export default DraftService
