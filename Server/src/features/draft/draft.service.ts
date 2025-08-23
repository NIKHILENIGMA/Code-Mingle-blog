import { Post } from '@prisma/client'
import PrismaDraftRepository, { IDraftRepository } from '@/features/publish/post/repository/PrismaDraftRepository'
import { ENUMS } from '@/types'
import { DraftPreview, DraftUpdateFields } from './draft.types'
import { DatabaseError, InternalServerError } from '@/utils/Errors'
import { StandardError } from '@/utils/Errors/StandardError'

class DraftService {
    constructor(private repo: IDraftRepository) {
        this.repo = repo
    }

    public async createDraftService(payload: { status: ENUMS.DRAFT_STATUS; userId: string; slug: string }): Promise<string> {
        try {
            const draft = await this.repo.createDraft(payload)

            if (!draft) {
                throw new DatabaseError('Draft not created', 'createDraftService')
            }

            return draft.id
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }

            throw new InternalServerError('An unexpected error occurred while creating the draft', 'createDraftService')
        }
    }

    public async saveDraftService(id: string, userId: string, payload: DraftUpdateFields): Promise<string> {
        try {
            await this.repo.updateDraft(id, userId, payload)

            return 'Draft saved successfully'
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }
            throw new InternalServerError('An unexpected error occurred while saving the draft', 'saveDraftService')
        }
    }

    public async removeDraftService(id: string, userId: string): Promise<string | void> {
        try {
            await this.repo.deleteDraft(id, userId, ENUMS.DRAFT_STATUS.DRAFT)

            return 'Draft removed successfully'
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }
            throw new InternalServerError('An unexpected error occurred while removing the draft', 'removeDraftService')
        }
    }

    public async getDraftService(id: string, authorId: string, status: ENUMS.DRAFT_STATUS): Promise<Partial<Post> | null> {
        try {
            const draft = await this.repo.getDraft(id, authorId, status)

            return draft
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }
            throw new InternalServerError('An unexpected error occurred while fetching the draft', 'getDraftService')
        }
    }

    public async getUserDraftsService(authorId: string, status: ENUMS.DRAFT_STATUS.DRAFT): Promise<Post[] | null> {
        try {
            const drafts = await this.repo.getDraftsByUserId(authorId, status)

            if (!drafts) {
                throw new DatabaseError('Drafts not found', 'getUserDraftsService')
            }

            return drafts
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }
            throw new InternalServerError('An unexpected error occurred while fetching the drafts', 'getUserDraftsService')
        }
    }

    public async updateDraftCoverImageService(draftId: string, userId: string, postCoverImage: string): Promise<string> {
        try {
            await this.repo.updateDraft(draftId, userId, { postCoverImage })

            return 'Draft cover image updated successfully'
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }

            throw new InternalServerError('An unexpected error occurred while updating the draft cover image', 'updateDraftCoverImageService')
        }
    }

    public async removeDraftCoverImageService(draftId: string, authorId: string): Promise<string | void> {
        try {
            await this.repo.updateDraft(draftId, authorId, { postCoverImage: '' })

            return 'Draft cover image removed successfully'
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }

            throw new InternalServerError('An unexpected error occurred while removing the draft cover image', 'removeDraftCoverImageService')
        }
    }

    public async updateDraftThumbnailService(draftId: string, authorId: string, thumbnailImage: string): Promise<string | void> {
        try {
            await this.repo.updateDraft(draftId, authorId, { thumbnailImage })

            return 'Draft thumbnail updated successfully'
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }
            throw new InternalServerError('An unexpected error occurred while updating the draft thumbnail', 'updateDraftThumbnailService')
        }
    }

    public async removeDraftThumbnailService(draftId: string, authorId: string): Promise<string | void> {
        try {
            await this.repo.updateDraft(draftId, authorId, { thumbnailImage: '' })

            return 'Draft thumbnail removed successfully'
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }
            throw new InternalServerError('An unexpected error occurred while removing the draft thumbnail', 'removeDraftThumbnailService')
        }
    }

    public async previewDraftService(id: string, authorId: string, status: ENUMS.DRAFT_STATUS): Promise<DraftPreview> {
        try {
            const preview = await this.repo.draftPreviewById(id, authorId, status)

            if (!preview) {
                throw new DatabaseError('Draft preview not found', 'previewDraftService')
            }

            return preview
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }

            throw new InternalServerError('An unexpected error occurred while previewing the draft', 'previewDraftService')
        }
    }
}

const draftService = new DraftService(new PrismaDraftRepository())
export default draftService
