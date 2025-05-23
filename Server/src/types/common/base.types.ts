export interface UserDTO {
    id: string
    email: string
    firstName?: string | null
    lastName?: string | null
    username?: string | null
    dob?: Date | null
    bio?: string | null
    createdAt: Date
    updatedAt: Date
}

export interface Context {
    alt: string
    user: string
}

export interface UploadOptions {
    folder: string
    resource_type: 'auto' | 'image' | 'raw' | 'video'
    overwrite: boolean
    invalidate: boolean
    public_id: string
    allowed_formats: string[]
    format: 'webp'
    quality: number
    max_bytes: number
    context: Context
}

export interface CloundinaryOption {
    folder: string
    public_name: string
    quality: number
    resource: 'image' | 'auto' | 'raw' | 'video'
    altName: string
}

/**
 * @typedef {Object} PromptType
 * @property {string} simple - Simple prompt type.
 * @property {string} advanced - Advanced prompt type.
 * @property {string} condense - Condense prompt type.
 */
export type PromptType = 'simple' | 'advanced' | 'condense'
/**
 * @typedef {Object} ToneType
 * @property {string} Professional - Professional tone.
 * @property {string} Casual - Casual tone.
 * @property {string} Friendly - Friendly tone.
 * @property {string} Formal - Formal tone.
 * @property {string} Confident - Confident tone.
 * @property {string} Optimistic - Optimistic tone.
 * @property {string} Empathetic - Empathetic tone.
 * @property {string} Assertive - Assertive tone.
 */
export type ToneType = 'Professional' | 'Casual' | 'Friendly' | 'Formal' | 'Confident' | 'Optimistic' | 'Empathetic' | 'Assertive'

/**
 * @typedef {Object} errorResponse
 * @property {string} error - The error message.
 * @property {string} message - The error description.
 */
export interface errorResponse {
    error: string
    message: string
}

/**
 * @typedef {Object} PromptSelectionProps
 * @property {PromptType} type - The type of request (e.g., 'simple', 'advanced', 'condense').
 * @property {ToneType} tone - The tone of the text (e.g., 'formal', 'informal', 'neutral').
 * @property {string} text - The text to be processed.
 * @property {number} [maxLength] - Optional maximum length for the text.
 */

export interface PromptSelectionProps {
    type: PromptType
    tone: ToneType
    text: string
    maxLength?: number
}
