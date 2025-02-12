/**
 * Enum representing the status of a draft.
 * 
 * @enum {string} DRAFT_STATUS
 * @readonly
 * @property {string} DRAFT - The draft is in draft status.
 * @property {string} PUBLISHED - The draft is in published status.
 * @property {string} ARCHIVED - The draft is in archived status.
 */

export enum DRAFT_STATUS {
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLISHED',
    ARCHIVED = 'ARCHIVED'
}
