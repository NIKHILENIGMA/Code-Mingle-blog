import { Request, Response } from 'express'
import { AsyncHandler } from '../utils/AsyncHandler'

interface IBlog {
    title: string
    content: string
    tags: string[]
}

interface ISearchQuery {
    query: string | string[]
}

export const createBlogPost = AsyncHandler(async (req: Request, res: Response) => {
    // Create a new blog
    const blogData = req.body as IBlog
    await Promise.resolve()
    res.status(201).json(blogData)
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
