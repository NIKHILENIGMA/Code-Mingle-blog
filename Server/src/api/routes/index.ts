import { Router } from 'express'
import V1Routes from './V1'

const router = Router()

// V1 Routes
router.use('/v1', V1Routes)

export default router
