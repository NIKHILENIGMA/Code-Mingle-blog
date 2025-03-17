import express from 'express'
import { validateParams, isAuthenticated, validateBody } from '../../../../middleware'
import { createDraft, getDraft, getUserDrafts, removeDraft, removeDraftCoverImage, saveDraft, uploadDraftCoverImage } from './draft.controller'
import { DraftParamsSchema, UpdateDraftBodySchema } from './draft.schema'
import { upload } from '../../../../middleware/multer.middleware'

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
router.route('/new').post(createDraft)

/**
 * !Routes for saving a draft.
 * @method PATCH
 * @route /api/v1/drafts/:id
 * @access Private
 */
router.route('/:id').patch(validateParams(DraftParamsSchema), validateBody(UpdateDraftBodySchema), saveDraft)

/**
 * !Routes for removing a draft.
 * @method DELETE
 * @route /api/v1/drafts/:id
 * @access Private
 */
router.route('/:id').delete(validateParams(DraftParamsSchema), removeDraft)

/**
 * !Routes for getting a draft.
 * @method GET
 * @route /api/v1/drafts/:id
 * @access Private
 */
router.route('/:id').get(validateParams(DraftParamsSchema), getDraft)

/**
 * !Routes for getting all drafts of a user.
 * @method GET
 * @route /api/v1/drafts/
 * @access Private
 */
router.route('/').get(getUserDrafts)

/**
 * !Routes for uploading a draft cover image.
 * @method POST
 * @route /api/v1/drafts/upload/cover-image
 * @access Private
 */
router.route('/:id/cover-image/upload/').post(upload.single('draftCoverImg'), uploadDraftCoverImage)

/**
 * !Routes for removing a draft cover image.
 * @method DELETE
 * @route /api/v1/drafts/:id/remove/cover-image
 * @access Private
 */
router.route('/:id/cover-image/remove/').delete(removeDraftCoverImage)

export default router
