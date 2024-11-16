import express from 'express'
import { getDraft, listDraft, saveDraft } from '../controllers/draft.controller'

const router = express.Router()

router.route('/drafts/save').post(saveDraft)

router.route('/drafts/:draftId').get(getDraft)

router.route('/drafts').patch(listDraft)

export default router
