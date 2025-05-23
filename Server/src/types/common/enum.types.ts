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

export enum ROLE {
    ADMIN = 'ADMIN',
    USER = 'USER',
    MODERATOR = 'MODERATOR'
}

export enum ACTION {
    READ = 'READ',
    WRITE = 'WRITE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE'
}

export enum RESOURCE {
    POST = 'POST',
    COMMENT = 'COMMENT',
    USER = 'USER',
    ADMIN_PANEL = 'ADMIN_PANEL',
    ALL = '*',
    REPORT = 'REPORT'
}

export enum EApplicationEnvironment {
    DEVELOPMENT = 'development',
    PRODUCTION = 'production'
}
