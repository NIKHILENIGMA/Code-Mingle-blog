import { ApiError } from '../../utils/ApiError'
import { AsyncHandler } from '../../utils/AsyncHandler'
import { NextFunction, Response } from 'express'
import { responseMessage } from '../../constant'
import { ApiResponse } from '../../utils/ApiResponse'
import { ProtectedRequest } from '../../types/app-request'
// import { User } from '../../Lib/Models/User'
import AIService from './ai.service'
import { Prompt } from './ai.types'

const aiService = new AIService()
const {
    INTERNAL_SERVICE,
    SUCCESS,
    // UNAUTHORIZED,
    METHOD_FAILED,
    BAD_REQUEST
} = responseMessage

export const getPrompt = AsyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    // const userId: string = (req.user as User)?.id
    // if (!userId) {
    //     return ApiError(new Error(UNAUTHORIZED.message), req, next, UNAUTHORIZED.code)
    // }
    const { prompt } = req.body as Prompt
    if (!prompt) {
        return ApiError(new Error(BAD_REQUEST('Prompt not provided').message), req, next, BAD_REQUEST().code)
    }
    try {
        const chatGPTResponse = await aiService.generateAIResponse(req, next, prompt)
        if (!chatGPTResponse) {
            return ApiError(new Error(METHOD_FAILED('No response got from gpt').message), req, next, METHOD_FAILED().code)
            
        }
        return ApiResponse(req, res, SUCCESS().code, SUCCESS('Prompt fetched successfully').message, { aiResponse: chatGPTResponse })
    } catch (error) {
        return ApiError(
            error instanceof Error ? error : new Error(INTERNAL_SERVICE('Failed to get GPT response').message), 
            req, 
            next, 
            INTERNAL_SERVICE().code
        )
    }
})
