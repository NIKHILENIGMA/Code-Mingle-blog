import express from 'express'
import { embedMedia, uploadMedia } from '../controllers/upload.controller'

const router = express.Router()

router.route('/upload').post(uploadMedia)

router.route('/embed').post(embedMedia)

router.route('/delete').delete(embedMedia)

export default router
