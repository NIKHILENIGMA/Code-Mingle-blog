import { Request, NextFunction } from 'express'
import { ApiError } from '../utils/ApiError'
import { PostStatus } from '@prisma/client'
import responseMessage from '../constant/responseMessage'
import { BlogDraft, ISaveDraftBody, PostDTO } from '../Lib/Models/Blog'
import { IDraftRepository } from '../Lib/Repositories/Interfaces/IDraftRepository'
import { RepositoryFactory } from '../Lib/Repositories'

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

class DraftService {
    private DraftRepository: IDraftRepository
    constructor() {
        this.DraftRepository = RepositoryFactory.DraftRepository()
    }

    /**
     * Creates a new draft entry in the DraftRepository.
     *
     * @param req - The request object.
     * @param next - The next middleware function.
     * @param id - The ID of the author creating the draft.
     * @returns A promise that resolves to the ID of the created draft or void if an error occurs.
     *
     * @throws Will throw an error if the draft creation fails.
     */

    public async newDraftService(req: Request, next: NextFunction, id: string): Promise<string | void> {
        try {
            const payload: GenerateDraft = {
                status: 'DRAFT',
                authorId: id
            }

            const draft = await this.DraftRepository.create(payload)

            if (!draft) {
                return ApiError(new Error(responseMessage.METHOD_FAILED('draft generation')), req, next, 500)
            }

            return draft.id
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(responseMessage.METHOD_FAILED('create  draft service')), req, next, 500)
        }
    }

    /**
     * Saves a draft with the provided details.
     *
     * @param req - The request object.
     * @param next - The next middleware function.
     * @param draftId - The ID of the draft to be saved.
     * @param userId - The ID of the user saving the draft.
     * @param body - The body of the request containing draft details.
     * @returns A promise that resolves to a success message or void.
     *
     * @throws Will throw an error if the draft is not found or if there is an issue saving the draft.
     */

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
            const draft = await this.DraftRepository.findDraftById(draftId, userId)

            if (!draft) {
                return ApiError(new Error(responseMessage.NOT_FOUND('draft or draft might be deleted already')), req, next, 404)
            }

            const updatedDraft = await this.DraftRepository.update(draft.id, payload)

            if (!updatedDraft?.slug) {
                return ApiError(new Error(responseMessage.BAD_REQUEST('Try with unique title')), req, next, 400)
            }

            return 'Draft saved successfully'
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(responseMessage.METHOD_FAILED('save draft service')), req, next, 500)
        }
    }

    /**
     * Removes a draft from the DraftRepository.
     *
     * @param req - The request object.
     * @param next - The next middleware function.
     * @param draftId - The ID of the draft to be removed.
     * @param userId - The ID of the user who owns the draft.
     * @returns A promise that resolves to a success message or void.
     *
     * @throws Will throw an error if the draft is not found or if there is an issue removing the draft.
     */

    public async removeDraftService(req: Request, next: NextFunction, draftId: string, userId: string): Promise<string | void> {
        try {
            // Check if draft exists
            const draft = await this.DraftRepository.findDraftById(draftId, userId)

            if (!draft) {
                return ApiError(new Error(responseMessage.NOT_FOUND('draft or draft might be deleted already')), req, next, 404)
            }

            // Remove draft
            await this.DraftRepository.delete(draft.id)

            return 'Draft removed successfully'
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(responseMessage.METHOD_FAILED('remove draft service')), req, next, 500)
        }
    }

    /**
     * Retrieves a draft blog post for a specific user.
     *
     * @param req - The HTTP request object.
     * @param next - The next middleware function.
     * @param draftId - The ID of the draft to retrieve.
     * @param userId - The ID of the user who owns the draft.
     * @param page - The page number for pagination.
     * @returns A promise that resolves to the draft blog post or void if not found.
     *
     * @throws Will throw an error if the draft retrieval fails.
     */

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
            const currentDraft = await this.DraftRepository.findDraft(draftId, userId, postDTO)

            if (!currentDraft) {
                return ApiError(new Error(responseMessage.NOT_FOUND('draft')), req, next, 404)
            }

            return currentDraft
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(responseMessage.METHOD_FAILED('get draft service')), req, next, 500)
        }
    }

    /**
     * Lists all draft blog posts for a specific user.
     *
     * @param req - The HTTP request object.
     * @param next - The next middleware function.
     * @param id - The ID of the user who owns the drafts.
     * @param page - The page number for pagination.
     * @returns A promise that resolves to a list of draft blog posts or void if not found.
     *
     * @throws Will throw an error if the draft list retrieval fails.
     */

    public async listDraftService(req: Request, next: NextFunction, id: string) {
        try {
            const drafts = await this.DraftRepository.findDraftsByAuthorId(id)

            if (!drafts) {
                return ApiError(new Error(responseMessage.NOT_FOUND('drafts')), req, next, 404)
            }

            return drafts
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(responseMessage.METHOD_FAILED('list draft service')), req, next, 500)
        }
    }

    /**
     * Generates a slug for a blog post.
     *
     * @param title - The title of the blog post.
     * @returns The generated slug.
     */

    private generateSlug(title: string | undefined): string {
        if (!title || title === undefined) return ''
        return title?.toLowerCase().replace(/ /g, '-') ?? ''
    }
}

export default DraftService
