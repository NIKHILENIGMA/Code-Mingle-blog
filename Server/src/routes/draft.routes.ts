import { validateParams } from './../middleware/validateSchema.middleware'
import express from 'express'
import { createDraft, getDraft, listDraft, removeDraft, saveDraft } from '../controllers/draft.controller'
import { isAuthenticated } from '../middleware/authentication.middleware'
import { postId } from '../schemas/blog.schema'

const router = express.Router()

// Middleware to check if user is authenticated
// ---------------------------------------------------------------------------------

router.use(isAuthenticated)

// ---------------------------------------------------------------------------------

router.route('/newDraft').post(createDraft)

router.route('/:id/save').patch(validateParams(postId), saveDraft)

router.route('/remove/:id').delete(validateParams(postId), removeDraft)

router.route('/:id').get(validateParams(postId), getDraft)

router.route('/').get(listDraft)

export default router
