import { Router } from 'express'
import { apiController } from '../controllers/apiController'

const router = Router()

router.get('/', apiController().get)
router.post('/', apiController().post)

export default router
