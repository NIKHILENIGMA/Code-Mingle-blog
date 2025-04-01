import { DRAFT_STATUS } from '@/constant/draftStatus'

export interface GenerateDraft {
    status: DRAFT_STATUS.DRAFT
    authorId: string
}

// Draft content for request body
export interface DraftContent {
    title: string
    content: string
    image?: string
    
}

// Payload for database updates
export type DraftUpdatePayload = Partial<DraftContent>;

// Where clause for finding or updating drafts
export type DraftWhere = {
    id: string;
    authorId: string;
}

// Where clause for finding drafts by status
export type DraftWhereStatus = {
    status: DRAFT_STATUS;
    authorId: string;
}

export type DraftWhereSlug = {
    slug: string;
    authorId: string;
}

// Order by clause for finding drafts
export type DraftOrderBy = 'asc' | 'desc';

// Select fields for finding drafts
export type DraftSelectFields = {
    id: boolean;
    title: boolean;
    content: boolean;
    thumbnailImage?: boolean;
    image?: boolean;
    createdAt?: boolean;
}