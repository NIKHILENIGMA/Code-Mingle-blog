import express from 'express'
import { embedMedia, uploadMedia } from '../controllers/upload.controller'
import { upload } from '../middleware/multer.middleware'

const router = express.Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.use(upload.single('media'))

router.route('/upload').post(uploadMedia)

router.route('/embed').post(embedMedia)

router.route('/delete').delete(embedMedia)

export default router
