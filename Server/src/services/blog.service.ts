import { ApiError } from '../utils/ApiError'
import responseMessage from '../constant/responseMessage'
import { IBlogRepository } from '../Lib/Repositories/Interfaces/IBlogRepository'
import { Blog } from '../Lib/Models/Blog'
import { NextFunction, Request } from 'express'
import { RepositoryFactory } from '../Lib/Repositories'

export default class BlogService {
    private blogRepository: IBlogRepository
    constructor() {
        this.blogRepository = RepositoryFactory.BlogRepository()
    }

    public async createBlogPostService(req: Request, next: NextFunction, userId: string, data: Partial<Blog>): Promise<Blog | void> {
        try {
            const payload = {
                title: data.title,
                content: data.content,
                image: data.image,
                authorId: userId
            }

            return await this.blogRepository.create(payload)
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(responseMessage.METHOD_FAILED('Error creating blog post')), req, next, 500)
        }
    }
}
