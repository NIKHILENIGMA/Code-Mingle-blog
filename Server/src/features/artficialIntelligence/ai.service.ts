import OpenAI from 'openai'
import { openAIConfig } from '../../config/config'
import { ApiError } from '../../utils/ApiError'
import { NextFunction, Request, } from 'express'
import { responseMessage } from '../../constant'
import { AxiosResponse } from 'axios';
import { apiInstance } from './aiRequest' 

const { METHOD_FAILED, BAD_REQUEST } = responseMessage

const openai = new OpenAI({
    apiKey: openAIConfig.OPENAI_API_KEY
})

export default class AIService {
    constructor() {}

    public async generateAIResponse(req: Request, next: NextFunction, prompt: string) {
        const completion = await openai.chat.completions.create({
            model: openAIConfig.OPENAI_MODEL,
            store: true,
            messages: [{ role: 'user', content: prompt }]
        })

        if (!openAIConfig.OPENAI_API_URL) {
            return ApiError(new Error(BAD_REQUEST('OpenAI API URL not provided').message), req, next, BAD_REQUEST().code)
        }

        try {
            return await this.requestOpenAI(completion, openAIConfig.OPENAI_API_URL)
        } catch (error) {
            return ApiError(error instanceof Error ? error : new Error(METHOD_FAILED('Generate Ai response failed').message), req, next, METHOD_FAILED().code)
        }
    }

    private async requestOpenAI(completion: unknown, url: string): Promise<AxiosResponse> {
        return await apiInstance.post(url, completion)
    }
}
