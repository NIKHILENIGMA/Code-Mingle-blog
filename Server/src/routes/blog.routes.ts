import express from 'express'
import { createBlogPost, deleteBlogPost, listAllPosts, readBlogPost, searchBlogPosts, updateBlogPost } from '../controllers/blog.controller'

const router = express.Router()

router.route('/write').post(createBlogPost)

router.route('/:postId').patch(updateBlogPost)

router.route('/:postId').delete(deleteBlogPost)

router.route('/:postId').get(readBlogPost)

router.route('/').get(listAllPosts)

router.route('/search').post(searchBlogPosts)

export default router
