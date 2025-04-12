import { ApiError } from '../../utils/ApiError'
import { AsyncHandler } from '../../utils/AsyncHandler'
import { NextFunction, Response } from 'express'
import { responseMessage } from '../../constant'
import { ApiResponse } from '../../utils/ApiResponse'
import { ProtectedRequest } from '../../types/app-request'
// import { User } from '../../Lib/Models/User'
import AIService from './ai.service'
import { Prompt } from './ai.types'
import { promptSchema } from './ai.schema'
import { validateBody } from '../../utils/Validations'
import { PromptType, ToneType } from '../../types/types'

const aiService = new AIService()
const {
    INTERNAL_SERVICE,
    SUCCESS,
    // UNAUTHORIZED,
    // METHOD_FAILED
    BAD_REQUEST
} = responseMessage

export const simplifiedTheText = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    // Request body validation
    validateBody(promptSchema, req.body)

    const { text } = req.body as Prompt

    try {
        const chatGPTResponse = await aiService.simplifyTextService(req, next, text)

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Text Simlified successfully').message, chatGPTResponse)
    } catch (error) {
        return ApiError(
            error instanceof Error ? error : new Error(INTERNAL_SERVICE('Failed to get GPT response').message),
            req,
            next,
            INTERNAL_SERVICE().code
        )
    }
})

export const changeTone = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    // Request body validation
    validateBody(promptSchema, req.body)

    const { text, type } = req.body as Prompt

    if (!type) {
        return ApiError(new Error(BAD_REQUEST('Tone type is required').message), req, next, BAD_REQUEST().code)
    }

    try {
        const chatGPTResponse = await aiService.toneChangeService(req, next, text, type)

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Tone Changed successfully').message, chatGPTResponse)
    } catch (error) {
        return ApiError(
            error instanceof Error ? error : new Error(INTERNAL_SERVICE('Failed to get GPT response').message),
            req,
            next,
            INTERNAL_SERVICE().code
        )
    }
})

export const translateText = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    // Request body validation
    validateBody(promptSchema, req.body)

    const { text, type } = req.body as Prompt

    if (!type) {
        return ApiError(new Error(BAD_REQUEST('Translate type is required').message), req, next, BAD_REQUEST().code)
    }

    try {
        const chatGPTResponse = await aiService.languageTranslateService(req, next, text, type)

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Text translated successfully').message, chatGPTResponse)
    } catch (error) {
        return ApiError(
            error instanceof Error ? error : new Error(INTERNAL_SERVICE('Failed to get GPT response').message),
            req,
            next,
            INTERNAL_SERVICE().code
        )
    }
})

export const makeTextLong = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    // Request body validation
    validateBody(promptSchema, req.body)

    const { text } = req.body as Prompt

    try {
        const chatGPTResponse = await aiService.makeTextLongService(req, next, text)

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Text expanded successfully').message, chatGPTResponse)
    } catch (error) {
        return ApiError(
            error instanceof Error ? error : new Error(INTERNAL_SERVICE('Failed to get GPT response').message),
            req,
            next,
            INTERNAL_SERVICE().code
        )
    }
})

export const makeTextShort = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    // Request body validation
    validateBody(promptSchema, req.body)

    const { text } = req.body as Prompt

    try {
        const chatGPTResponse = await aiService.makeTextShortService(req, next, text)

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Text condensed successfully').message, chatGPTResponse)
    } catch (error) {
        return ApiError(
            error instanceof Error ? error : new Error(INTERNAL_SERVICE('Failed to get GPT response').message),
            req,
            next,
            INTERNAL_SERVICE().code
        )
    }
})

export const generateAiContent = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    // Request body validation
    // validateBody(promptSchema, req.body)
    const { text, tone, type } = req.body as {
        text: string
        tone: ToneType
        type: PromptType
    }

    const options = {
        text,
        tone,
        type
    }

    try {
        const chatGPTResponse = await aiService.generateContent(req, next, options)

        if (!chatGPTResponse) {
            return ApiError(new Error(INTERNAL_SERVICE('No response got from gpt').message), req, next, INTERNAL_SERVICE().code)
        }

        return ApiResponse(req, res, SUCCESS().code, SUCCESS('AI Content generated successfully').message, chatGPTResponse)
    } catch (error) {
        return ApiError(
            error instanceof Error ? error : new Error(INTERNAL_SERVICE('Failed to get GPT response').message),
            req,
            next,
            INTERNAL_SERVICE().code
        )
    }
})
