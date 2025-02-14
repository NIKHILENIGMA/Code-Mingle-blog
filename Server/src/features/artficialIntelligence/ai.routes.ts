import { Router } from 'express'
import { getPrompt } from './ai.controller'
// import { isAuthenticated } from '../../middleware'


const router = Router()

// Middleware to check if user is authenticated
// -------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------

// router.use(isAuthenticated)

// -------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------



/**
 * ! Route to get prompt
 * 
 * @param prompt - The prompt to be used to generate AI response
 * @path /api/v1/ai-assistance/ 
 */
router
    .route('/')
    .post(getPrompt)


export default router