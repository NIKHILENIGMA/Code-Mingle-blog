
import { NextFunction, Request, Response } from 'express'
import { AsyncHandler } from '../utils/AsyncHandler'
import { ApiError } from '../utils/ApiError'
import responseMessage from '../constant/responseMessage'
import BlogService from '../services/blog.service'
import { ApiResponse } from '../utils/ApiResponse'
import { ProtectedRequest } from '../types/app-request'

const blogService = new BlogService()

interface ICreateBlogRequest {
    body: IBlog
}

interface IBlog {
    title: string
    content: string
    image: string
    tags: string[]
}

interface ISearchQuery {
    query: string | string[]
}

export const createBlogPost = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body, user } = { ...req as ICreateBlogRequest, ...((req as ProtectedRequest)?.user as { user: { id: string } }) }
        // Create a blog
        const post = await blogService.createBlogPostService(req, next, user.id, body)
    
        if (!post) {
            return ApiError(new Error(responseMessage.METHOD_FAILED('creating blog post')), req, next, 500)
        }
    
        ApiResponse(req, res, 201, responseMessage.SUCCESS('Post created successfully'), post)
    } catch (error) {
        return ApiError(error instanceof Error ? error : new Error(responseMessage.METHOD_FAILED('creating blog post')), req, next, 500)
    }
})

export const updateBlogPost = AsyncHandler(async (req: Request, res: Response) => {
    // Update a blog
    const blogData = req.body as IBlog
    await Promise.resolve()
    res.status(200).json(blogData)
})

export const deleteBlogPost = AsyncHandler(async (_: Request, res: Response) => {
    // Delete a blog
    await Promise.resolve()
    res.status(204).send()
})

export const readBlogPost = AsyncHandler(async (req: Request, res: Response) => {
    // Read a blog
    const blogId = req.params.id
    await Promise.resolve()
    res.status(200).json({ id: blogId })
})

export const listAllPosts = AsyncHandler(async (_: Request, res: Response) => {
    await Promise.resolve()
    res.status(200).json({ message: 'List of all blog posts' })
})

export const searchBlogPosts = AsyncHandler(async (req: Request<object, object, ISearchQuery>, res: Response) => {
    const query = req.body.query
    await Promise.resolve()
    res.status(200).json({ query })
})
