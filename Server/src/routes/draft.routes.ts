import express from 'express'
import { createDraft, getDraft, listDraft, removeDraft, saveDraft } from '../controllers/draft.controller'
import { isAuthenticated } from '../middleware/authentication.middleware'
// import { validateSchema } from './../middleware/validateSchema.middleware';
// import { draftContentSchema } from '../schemas/blog.schema';

const router = express.Router()

// Middleware to check if user is authenticated
// ---------------------------------------------------------------------------------

router.use(isAuthenticated)

// ---------------------------------------------------------------------------------


router.route('/newDraft').post(createDraft)

router.route('/:id/save').patch(saveDraft)

router.route('/remove/:id').delete(removeDraft)

router.route('/:id').get(getDraft)

router.route('/').get(listDraft)

export default router
