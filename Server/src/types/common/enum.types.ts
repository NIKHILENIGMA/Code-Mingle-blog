/**
 * Enum representing the different status states of a draft.
 * @enum {string}
 * @readonly
 * @property {string} DRAFT - Indicates the content is in draft state and not yet published
 * @property {string} PUBLISHED - Indicates the content has been published and is live
 * @property {string} ARCHIVED - Indicates the content has been archived and is no longer active
 */

export enum DRAFT_STATUS {
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLISHED',
    ARCHIVED = 'ARCHIVED'
}
