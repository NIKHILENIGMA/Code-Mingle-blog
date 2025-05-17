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

/**
 * !Routes for creating a new draft.
 * @method POST
 * @route /api/v1/drafts/new
 * @access Private
 */
router.route('/new').post(draftController.createDraft)

/**
 * !Routes for saving a draft.
 * @method PATCH
 * @route /api/v1/drafts/:id
 * @access Private
 */
router.route('/:id').patch(validateParams(DraftParamsSchema), validateBody(UpdateDraftBodySchema), draftController.saveDraft)

/**
 * !Routes for removing a draft.
 * @method DELETE
 * @route /api/v1/drafts/:id
 * @access Private
 */
router.route('/:id').delete(validateParams(DraftParamsSchema), draftController.removeDraft)

/**
 * !Routes for getting a draft.
 * @method GET
 * @route /api/v1/drafts/:id
 * @access Private
 */
router.route('/:id').get(validateParams(DraftParamsSchema), validateQuery(DraftQuerySchema), draftController.getUserDraft)

/**
 * !Routes for getting all drafts of a user.
 * @method GET
 * @route /api/v1/drafts/
 * @access Private
 */
router.route('/').get(draftController.getCurrentUserDrafts)

/**
 * !Routes for uploading a draft cover image.
 * @method POST
 * @route /api/v1/drafts/upload/cover-image
 * @access Private
 */
router.route('/:id/cover-image/upload/').post(upload.single('draftCoverImg'), draftController.uploadDraftCoverImage)

/**
 * !Routes for removing a draft cover image.
 * @method DELETE
 * @route /api/v1/drafts/:id/remove/cover-image
 * @access Private
 */
router.route('/:id/cover-image/remove/').delete(validateParams(DraftParamsSchema), draftController.removeDraftCoverImage)

/**
 * !Routes for uploading a draft thumbnail.
 * @method POST
 * @route /api/v1/drafts/:id/thumbnail/upload
 * @access Private
 */
router
    .route('/:id/thumbnail/upload')
    .post(
        validateParams(DraftParamsSchema),
        upload.single('thumnailImage'),
        draftController.uploadThumbnail
    )

/**
 * !Routes for removing a draft thumbnail.
 * @method DELETE
 * @route /api/v1/drafts/:id/thumbnail/remove
 * @access Private
 */
router
    .route('/:id/thumbnail/remove')
    .delete(validateParams(DraftParamsSchema), draftController.removeDraftThumbnail)

/**
 * !Routes for getting a draft preview.
 * @method GET
 * @route /api/v1/drafts/:id/preview
 * @access Private
 */
router.route('/:id/preview').get(validateParams(DraftParamsSchema), draftController.draftPreview)

export default router
