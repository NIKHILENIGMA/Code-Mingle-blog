import prisma from '@/config/db.config'
import { ENUMS } from '@/types'
import { DatabaseError } from '@/utils/Errors'
import { Post } from '@/generated/prisma/client'
import { CommunityPosts, OrderBy } from '../published/publish.types'

export interface PublishPostPayload {
    slug?: string
    status: ENUMS.DRAFT_STATUS.PUBLISHED
    tags?: {
        id: string
    }[]
}

type PublishedPost = {
    id: string
    title: string | null
    content: string | null
    slug: string
    status: string
    postCoverImage: string | null
    createdAt: Date
    updatedAt: Date
    tags: {
        name: string
    }[]
    user: {
        id: string
        username: string
        profileImage: string | null
    }
    _count: {
        comments: number
    }
}

export interface IPublishRepository {
    publishPost(postId: string, authorId: string, payload: PublishPostPayload): Promise<void>
    getPostByIdAndAuthor(postId: string, userId: string): Promise<Post | null>
    updatePostStatus(postId: string, status: ENUMS.DRAFT_STATUS): Promise<Post | null>
    getPublishedPostBySlug(slug: string): Promise<PublishedPost | null>
    getPublishedPostsByUserId(userId: string): Promise<Post[] | null>
    getPublishedPostsOfFollowings(userId: string): Promise<Post[] | []>
    getPublishedPostsByTag(tagId: string): Promise<Post[] | null>
    getPublishedPostsByTitle(title: string): Promise<Post[] | null>
    checkCustomSlugAvailability(slug: string): Promise<boolean | void>
    changeStatusOfPost(postId: string, status: ENUMS.DRAFT_STATUS): Promise<Post | null>
    getCommunityPosts(take?: number, skip?: number, order?: OrderBy): Promise<CommunityPosts[] | null>
    searchTagsByName(name: string): Promise<{ id: string; name: string }[] | null>
}

export class PrismaPublishRepository implements IPublishRepository {
    public async publishPost(postId: string, userId: string, payload: PublishPostPayload): Promise<void> {
        if (payload && payload.tags !== undefined && payload.tags?.length > 0) {
            await prisma.$transaction([
                prisma.post.update({
                    where: {
                        id: postId,
                        userId,
                        status: ENUMS.DRAFT_STATUS.DRAFT
                    },
                    data: {
                        slug: payload.slug,
                        status: payload.status
                    }
                }),
                prisma.postTag.createMany({
                    data: payload.tags.map((tag) => ({
                        postId,
                        tagId: tag.id
                    })),
                    skipDuplicates: true
                })
            ])
        } else {
            await prisma.post.update({
                where: {
                    id: postId,
                    userId,
                    status: ENUMS.DRAFT_STATUS.DRAFT
                },
                data: {
                    slug: payload.slug,
                    status: payload.status
                }
            })
        }
    }

    public async getPostByIdAndAuthor(postId: string, userId: string): Promise<Post | null> {
        return await prisma.post.findFirst({
            where: {
                id: postId,
                userId,
                status: ENUMS.DRAFT_STATUS.DRAFT
            }
        })
    }

    public async updatePostStatus(postId: string, status: ENUMS.DRAFT_STATUS): Promise<Post | null> {
        return await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                status
            }
        })
    }

    public async getPublishedPostBySlug(slug: string): Promise<PublishedPost | null> {
        const post = await prisma.post.findFirst({
            where: {
                slug,
                status: ENUMS.DRAFT_STATUS.PUBLISHED
            },
            select: {
                id: true,
                title: true,
                content: true,
                slug: true,
                status: true,
                postCoverImage: true,
                createdAt: true,
                updatedAt: true,
                tags: {
                    select: {
                        tag: {
                            select: {
                                name: true
                            }
                        }
                    }
                },
                user: {
                    select: {
                        id: true,
                        username: true,
                        profileImage: true
                    }
                },
                _count: {
                    select: {
                        comments: true
                    }
                }
            }
        })

        if (!post) return null

        return {
            ...post,
            tags: post.tags.map((tag) => tag.tag)
        }
    }

    public async checkCustomSlugAvailability(slug: string): Promise<boolean | void> {
        try {
            const post = await prisma.post.findFirst({
                where: {
                    slug,
                    status: ENUMS.DRAFT_STATUS.DRAFT
                }
            })
            if (!post) {
                return true
            }
            return post === null
        } catch (error) {
            if (error instanceof Error) {
                throw new DatabaseError('checkCustomSlugAvailability', error.message)
            }
        }
    }

    public async getPublishedPostsByTitle(title: string): Promise<Post[] | null> {
        return await prisma.post.findMany({
            where: {
                title: {
                    contains: title,
                    mode: 'insensitive'
                },
                status: ENUMS.DRAFT_STATUS.PUBLISHED
            }
        })
    }

    public async getPublishedPostsByUserId(userId: string, page?: number, skip?: number): Promise<Post[] | null> {
        return await prisma.post.findMany({
            where: {
                userId,
                status: ENUMS.DRAFT_STATUS.PUBLISHED
            },
            include: {
                user: true,
                tags: true
            },
            take: page,
            skip
        })
    }

    public async getCommunityPosts(take?: number, skip?: number, order?: OrderBy): Promise<CommunityPosts[] | null> {
        return await prisma.post.findMany({
            select: {
                title: true,
                content: true,
                thumbnailImage: true,
                postCoverImage: true,
                createdAt: true,
                user: {
                    select: {
                        id: true,
                        username: true,
                        profileImage: true
                    }
                }
            },
            take,
            skip,
            orderBy: {
                createdAt: order
            }
        })
    }

    public async getPublishedPostsOfFollowings(userId: string, page?: number, skip?: number): Promise<Post[] | []> {
        // Get the list of user IDs that the current user is following
        const followings = await prisma.follow.findMany({
            where: {
                followerId: userId
            },
            select: {
                followingId: true
            },
            take: page,
            skip
        })
        // Extract the user IDs from the following list
        const followingIds = followings.map((following) => following.followingId)
        // If the user is not following anyone, return an empty array
        if (followingIds.length === 0) {
            return []
        }
        // Fetch the published posts of the followed users
        return await prisma.post.findMany({
            where: {
                userId: {
                    in: followingIds
                },
                status: ENUMS.DRAFT_STATUS.PUBLISHED
            },
            include: {
                user: true,
                tags: true
            }
        })
    }

    public async getPublishedPostsByTag(tagId: string, page?: number, skip?: number): Promise<Post[] | null> {
        const posts = await prisma.post.findMany({
            where: {
                tags: {
                    some: {
                        tagId
                    }
                },
                status: ENUMS.DRAFT_STATUS.PUBLISHED
            },
            take: page,
            skip
        })
        return posts
    }

    public async getPublishedPostsByUserIdAndTag(userId: string, tagId: string): Promise<Post[] | null> {
        return await prisma.post.findMany({
            where: {
                userId,
                tags: {
                    some: {
                        tagId
                    }
                },
                status: ENUMS.DRAFT_STATUS.PUBLISHED
            }
        })
    }

    public async changeStatusOfPost(postId: string, status: ENUMS.DRAFT_STATUS): Promise<Post | null> {
        return await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                status
            }
        })
    }

    public async searchTagsByName(name: string): Promise<{ id: string; name: string }[] | null> {
        try {
            const tags = await prisma.tag.findMany({
                where: {
                    name: {
                        contains: name,
                        mode: 'insensitive'
                    }
                },
                select: {
                    id: true,
                    name: true
                },
                take: 10 // Limit the number of results
            })
            return tags
        } catch (error) {
            if (error instanceof Error) {
                throw new DatabaseError('searchTagsByName', error.message)
            }
        }
        return null
    }
}
