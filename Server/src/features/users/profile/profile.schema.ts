import { z } from 'zod'
import { fileUploadConfig } from '../../../config/config'

export const ProfileChangePasswordSchema = z.object({
    oldPassword: z.string(),
    newPassword: z.string()
})

export const ProfileUpdateBodySchema = z.object({
    firstName: z.string().min(2).max(50).optional(),
    lastName: z.string().min(2).max(50).optional(),
    username: z.string().optional(),
    email: z.string().email().optional(),
    dob: z.date().optional().optional(),
    bio: z.string().min(1).max(160).optional()
})

export const ProfileAvatarSchema = z.object({
    avatarImg: z
        .instanceof(File)
        .refine(
            (file: File) => [
                'image/jpeg', 
                'image/png', 
                'image/jpg'
            ].includes(file.type), 
            {
                message: 'Invalid image file type'
            }
        )
        .refine(
            (file: File) => file.size <= fileUploadConfig.FILE_SIZE_LIMIT, 
            {
                message: 'Image file size is too large'
            }
        )
})

export const ProfileCoverImageSchema = z.object({
    coverImg: z
        .instanceof(File)
        .refine(
            (file: File) => [
                'image/jpeg', 
                'image/png', 
                'image/jpg'
            ].includes(file.type), 
            {
                message: 'Invalid image file type'
            }
        )
        .refine(
            (file: File) => file.size <= fileUploadConfig.FILE_SIZE_LIMIT, 
            {
                message: 'Image file size is too large'
            }
        )
})
