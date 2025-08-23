import { IPublishRepository, PrismaPublishRepository } from '../repository/PrismaPublishRepository'
import { InternalServerError, NotFoundError } from '@/utils/Errors'
import { ENUMS } from '@/types'
import { StandardError } from '@/utils/Errors/StandardError'
import { OrderBy, CommunityPosts, PublishPayload } from './publish.types'

export interface IPublishService {
    publishAPostService(userId: string, postId: string, payload: PublishPayload): Promise<void>
}

class PublishService {
    constructor(private readonly publishRepository: IPublishRepository) {
        this.publishRepository = new PrismaPublishRepository()
    }
    public async publishPost(userId: string, postId: string, payload: PublishPayload): Promise<void> {
        try {
            // check if slug is provided
            if (payload.slug) {
                payload.slug = this.changeTitleToSlug(payload.slug)
            }

            // check if post exists
            const existingPost = await this.publishRepository.getPostByIdAndAuthor(postId, userId)
            if (!existingPost) {
                throw new NotFoundError('Post not found')
            }

            // check if post is already published
            if (existingPost.status === ENUMS.DRAFT_STATUS.PUBLISHED) {
                throw new InternalServerError('Post is already published')
            }

            // Update the post status to published
            await this.publishRepository.publishPost(postId, userId, {
                ...payload,
                status: ENUMS.DRAFT_STATUS.PUBLISHED
            })
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }

            if (error instanceof Error) {
                throw new InternalServerError(`An unexpected error occured while publishing the post. Reason might be: ${error.message}`)
            }
        }
    }

    public async isSlugAvailable(slug: string): Promise<boolean> {
        try {
            const isSlug: boolean | void = await this.publishRepository.checkCustomSlugAvailability(slug)
            if (typeof isSlug !== 'boolean') {
                throw new InternalServerError('Failed to check slug availability')
            }

            return isSlug
        } catch (error) {
            if (error instanceof Error) {
                throw error
            }

            if (error instanceof StandardError) {
                throw error
            }
            throw new InternalServerError('An unknown error occurred while checking slug availability')
        }
    }

    public async deletePublishedPost(userId: string, postId: string): Promise<void> {
        try {
            await this.publishRepository.changeStatusOfPost
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }
            if (error instanceof Error) {
                throw new InternalServerError(`Failed to deleted post potential Reason might be:  ${error.message}`)
            }
        }
    }

    public async changePublishedPostStatus(postId: string, status: ENUMS.DRAFT_STATUS): Promise<void> {
        try {
            await this.publishRepository.changeStatusOfPost(postId, status)
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }
            if (error instanceof Error) {
                throw new InternalServerError(`Failed to change post status potential Reason might be:  ${error.message}`)
            }
        }
    }

    public async getCommunityPublishedPost(take: number, skip: number, order: OrderBy): Promise<CommunityPosts[]> {
        try {
            const posts: CommunityPosts[] | null = await this.publishRepository.getCommunityPosts(take, skip, order)

            if (!Array.isArray(posts)) {
                throw new InternalServerError('Posts does not fetch')
            }

            const trimPosts = posts?.map((post) => ({
                ...post,
                content: post.content ? post.content.split(' ').slice(0, 150).join(' ') : ''
            }))

            return trimPosts
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }

            if (error instanceof Error) {
                throw new InternalServerError(`Failed to get post potential Reason might be:  ${error.message}`)
            }

            throw new InternalServerError(`An unexpected error occured while getting community posts: ${JSON.stringify(error)}`)
        }
    }

    public async getSearchTags(name: string): Promise<{ id: string; name: string }[] | null> {
        try {
            const tags = await this.publishRepository.searchTagsByName(name)
            return tags
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }

            if (error instanceof Error) {
                throw new InternalServerError(`Failed to get tags potential Reason might be:  ${error.message}`)
            }

            throw new InternalServerError('An unknown error occurred while getting tags')
        }
    }

    private changeTitleToSlug(title: string): string {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
    }
}

const publishService = new PublishService(new PrismaPublishRepository())
export { publishService, IPublishRepository }
