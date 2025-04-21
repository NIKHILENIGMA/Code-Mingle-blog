import { z } from 'zod'
import { ENUMS } from '@/types'

export const PublishParamsSchema = z.object({
    id: z.string().uuid()
})

export const PublishBodySchema = z.object({
    title: z.string().min(1).max(100),
    content: z.string().min(1).max(1000),
    slug: z.string().min(1).max(100).optional(),
    publishedAt: z.date().optional()
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
