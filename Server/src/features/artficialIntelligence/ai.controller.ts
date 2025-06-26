import { Request, Response } from 'express'
import { AsyncHandler } from '../../utils/AsyncHandler'
import { ApiResponse } from '../../utils/ApiResponse'
import AIService from './ai.service'
import { Prompt } from './ai.types'
import { promptSchema } from './ai.schema'
import { validateBody } from '../../utils/Validations'
import { PromptType, ToneType } from '@/types/common/base.types'
import { InternalServerError, NotFoundError } from '@/utils/Errors'

const aiService = new AIService()
export const simplifiedTheText = AsyncHandler(async (req: Request, res: Response) => {
    // Request body validation
    validateBody(promptSchema, req.body)

    const { text } = req.body as Prompt

    const chatGPTResponse = await aiService.simplifyTextService(text)

    return ApiResponse(req, res, 200, 'Text Simlified successfully', chatGPTResponse)
})

export const changeTone = AsyncHandler(async (req: Request, res: Response) => {
    // Request body validation
    validateBody(promptSchema, req.body)

    const { text, type } = req.body as Prompt

    if (!type) {
        throw new NotFoundError('Tone type is required', 'changeTone')
    }

    const chatGPTResponse = await aiService.toneChangeService(text, type)

    return ApiResponse(req, res, 200, 'Tone Changed successfully', chatGPTResponse)
})

export const translateText = AsyncHandler(async (req: Request, res: Response) => {
    // Request body validation
    validateBody(promptSchema, req.body)

    const { text, type } = req.body as Prompt

    if (!type) {
        throw new NotFoundError('Translation type is required', 'translateText')
    }

    const chatGPTResponse = await aiService.languageTranslateService(text, type)

    return ApiResponse(req, res, 200, 'Text translated successfully', chatGPTResponse)
})

export const makeTextLong = AsyncHandler(async (req: Request, res: Response) => {
    // Request body validation
    validateBody(promptSchema, req.body)

    const { text } = req.body as Prompt

    const chatGPTResponse = await aiService.makeTextLongService(text)

    ApiResponse(req, res, 200, 'Text expanded successfully', chatGPTResponse)
})

export const makeTextShort = AsyncHandler(async (req: Request, res: Response) => {
    // Request body validation
    validateBody(promptSchema, req.body)
    const { text } = req.body as Prompt
    const chatGPTResponse = await aiService.makeTextShortService(text)
    return ApiResponse(req, res, 200, 'Text condensed successfully', chatGPTResponse)
})

export const generateAiContent = AsyncHandler(async (req: Request, res: Response) => {
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

    const chatGPTResponse = await aiService.generateContent(options)

    if (!chatGPTResponse) {
        throw new InternalServerError('No response received from AI service', 'generateAiContent')
    }
    // chatGPTResponse?.data?.choices[0]?.message?.content || ''
    ApiResponse(req, res, 200, 'AI Content generated successfully', {
        chatGPTResponse
    })
})
