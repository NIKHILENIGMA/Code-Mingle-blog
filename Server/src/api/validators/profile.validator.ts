import { z } from 'zod'
import { fileUploadConfig } from '@/config'

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export const ProfileChangePasswordSchema = z.object({
    oldPassword: z.string(),
    newPassword: z.string()
})

export const ProfileUpdateBodySchema = z.object({
    firstName: z.string().max(50).optional(),
    lastName: z.string().max(50).optional(),
    username: z.string().optional(),
    email: z.string().email().optional(),
    dob: z.date().optional().optional(),
    bio: z.string().min(1).max(160).optional()
})

export const ProfileImageSchema = z.object({
    mimetype: z.string().refine((type) => ACCEPTED_IMAGE_TYPES.includes(type), { message: 'Invalid image file type' }),
    size: z.number().refine((size) => size <= fileUploadConfig.FILE_SIZE_LIMIT, { message: 'Image file size is too large' })
})


