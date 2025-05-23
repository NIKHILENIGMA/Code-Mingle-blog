import express from 'express'
import { validateParams, isAuthenticated, validateBody, validateQuery } from '@/api/middlewares'
import * as draftController from '@/features/post/drafts/draft.controller'
import { DraftParamsSchema, DraftQuerySchema, UpdateDraftBodySchema } from '../../validators/draft.validator'
import { upload } from '@/api/middlewares/multer.middleware'

const router = express.Router({ mergeParams: true })

// Middleware to check if user is authenticated
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------

router.use(isAuthenticated)

// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------

router.route('/new').post(draftController.createDraft)

router
    .route('/:id')
    .patch(validateParams(DraftParamsSchema), validateBody(UpdateDraftBodySchema), draftController.saveDraft)
    .delete(validateParams(DraftParamsSchema), draftController.removeDraft)
    .get(validateParams(DraftParamsSchema), validateQuery(DraftQuerySchema), draftController.getUserDraft)

router.route('/').get(draftController.getCurrentUserDrafts)

router.route('/:id/cover-image/upload/').post(upload.single('draftCoverImg'), draftController.uploadDraftCoverImage)

router.route('/:id/cover-image/remove/').delete(validateParams(DraftParamsSchema), draftController.removeDraftCoverImage)

router.route('/:id/thumbnail/upload').post(validateParams(DraftParamsSchema), upload.single('thumnailImage'), draftController.uploadThumbnail)

router.route('/:id/thumbnail/remove').delete(validateParams(DraftParamsSchema), draftController.removeDraftThumbnail)

router.route('/:id/preview').get(validateParams(DraftParamsSchema), draftController.draftPreview)

export default router
