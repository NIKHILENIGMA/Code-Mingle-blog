import { z } from 'zod'
import { ENUMS } from '@/types'

export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'] as const
export type AcceptedImageType = (typeof ACCEPTED_IMAGE_TYPES)[number] // 'image/jpeg' | 'image/jpg' | 'image/png' | 'image/webp'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const MIN_FILE_SIZE = 100 // 100 bytes


export const PublishParamsSchema = z.object({
    id: z.string().uuid()
})

export const PublishBodySchema = z.object({
    slug: z
        .string()
        .min(1, { message: 'Slug must be at least 1 character long.' })
        .max(100, { message: 'Slug must not exceed 100 characters.' })
        .optional(),
    status: z.enum(Object.values(ENUMS.DRAFT_STATUS) as [string, ...string[]]),
    tags: z
        .array(
            z.object({
                id: z.string().cuid()
            })
        )
        .optional()
})

export const ThumbnailFileSchema = z.object({
    fieldname: z.string().min(1, { message: '' }),
    originalname: z
        .string()
        .min(1, { message: 'Filename is required' })
        .max(100, { message: 'Filename must not exceed 100 characters' })
        .refine(
            (name) => {
                const validExtensions = ['.jpg', '.jpeg', '.png', '.webp']
                return validExtensions.some((ext) => name.toLowerCase().endsWith(ext))
            },
            { message: 'File must have a valid image extension (.jpg, .jpeg, .png, .webp)' }
        )
        .refine(
            (name) => {
                const dangerousPatterns = [
                    /\.\./, // Directory traversal
                    /[<>:"|?*]/, // Invalid filename characters
                    /^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])$/i // Reserved Windows names
                ]
                return !dangerousPatterns.some((pattern) => pattern.test(name))
            },
            { message: 'Invalid filename' }
        ),
    mimetype: z.enum(ACCEPTED_IMAGE_TYPES, { errorMap: () => ({ message: `File must be one of: ${ACCEPTED_IMAGE_TYPES.join(', ')}` }) }),
    size: z
        .number()
        .int()
        .min(MIN_FILE_SIZE, { message: `File size must be at least ${MIN_FILE_SIZE} bytes` })
        .max(MAX_FILE_SIZE, { message: `File size must not exceed ${MAX_FILE_SIZE / (1024 * 1024)}MB` }),
    buffer: z.instanceof(Buffer).refine((buffer) => buffer.length > 0, { message: 'File buffer cannot be empty' })
})

export const ListPublishedPostsBodySchema = z.object({
    status: z.enum(Object.values(ENUMS.DRAFT_STATUS) as [string, ...string[]]).optional()
})

export const PublishedQueryParameterSchema = z.object({
    limit: z.number().int().positive(),
    skip: z.number().int().positive()
})

export const UpdatePublishedPostSchema = z.object({
    title: z.string().min(1).max(100),
    content: z.string().min(1).max(1000),
    image: z.string().min(1).max(100).optional(),
    thumbnailImage: z.string().min(1).max(100).optional(),
    slug: z.string().min(1).max(100).optional()
})
