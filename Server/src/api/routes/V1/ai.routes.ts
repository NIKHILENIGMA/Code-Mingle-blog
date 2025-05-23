import { Router } from 'express'
import {
    changeTone,
    generateAiContent,
    makeTextLong,
    makeTextShort,
    simplifiedTheText,
    translateText
} from '@/features/artficialIntelligence/ai.controller'

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

/**
 * @typedef {object} SimplifyText
 * @property {string} text.required - The text to be simplified
 * @property {string} type - The type of simplification
 * @property {string} tone - The tone to be changed
 * @property {string} language - The language to be translated
 * @property {string} length - The length of the text to be made
 * @property {string} short - The text to be made short
 *
 */

router.route('/simplify-text').post(simplifiedTheText)

router.route('/tone-change').post(changeTone)

router.route('/translate-text').post(translateText)

router.route('/make-text-long').post(makeTextLong)

router.route('/make-text-short').post(makeTextShort)

router.route('/generate-ai-content').post(generateAiContent)

export default router
