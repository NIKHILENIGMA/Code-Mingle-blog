import { z } from 'zod'
import { ProfileChangePasswordSchema, ProfileUpdateBodySchema } from '@/api'

export interface Dashboard {
    id: string
    firstName: string | null
    lastName: string | null
    username: string
    profileImage: string | null
    coverImage: string | null
    socialLinks: {
        linkedin: string | null
        twitter: string | null
        youtube: string | null
        instagram: string | null
        github: string | null
        website: string | null
    } | null
    posts: {
        id: string
        title: string | null
        content: string | null
        postCoverImage: string | null
        createdAt: Date
    }[]
    followers: {
        follower: {
            id: string
            username: string
            profileImage: string | null
        }
    }[]
    following: {
        following: {
            id: string
            username: string
            profileImage: string | null
        }
    }[]
}

export type UpdateProfileCredentials = z.infer<typeof ProfileUpdateBodySchema>

export type ProfileChangePasswordCredentials = z.infer<typeof ProfileChangePasswordSchema>
