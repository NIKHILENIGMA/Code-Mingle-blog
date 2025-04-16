import OpenAI from 'openai'
import { openAIConfig } from '../../config/config'
import { ApiError } from '../../utils/ApiError'
import { NextFunction, Request } from 'express'
import { responseMessage } from '../../constant'
import { ChatCompletion } from 'openai/resources'
import { promptSelection } from '../../utils/PromptSelection'
import { PromptType, ToneType } from '../../types/types'
// import { AxiosResponse } from 'axios'
// import { apiInstance } from './aiRequest'

const { METHOD_FAILED, BAD_REQUEST } = responseMessage

export default class AIService {
    private openai: OpenAI
    private readonly model: string = openAIConfig.OPENAI_MODEL

    constructor() {
        this.openai = new OpenAI({
            apiKey: openAIConfig.OPENAI_API_KEY
        })
    }

    /**
     * Simplifies the given text to make it more accessible and easier to understand.
     * @param {Request} req - The Express request object
     * @param {NextFunction} next - Express next middleware function
     * @param {string} text - The text to be simplified
     * @returns {Promise<ChatCompletion>} The AI-generated simplified text response
     * @throws {ApiError} When the AI request fails or returns no response
     */
    public async simplifyTextService(req: Request, next: NextFunction, text: string): Promise<ChatCompletion | void> {
        const promptMessage = `Rewrite the following text to make it clear, concise, and accessible for a general audience. Use simple language, short sentences, and avoid technical jargon to ensure easy understanding. Format the response in valid HTML markup that can be rendered in an editor (use appropriate HTML tags like <p>, <ul>, <li>, <h1>, <h2>, etc. where needed): ${text}`
        
        try {
            const response: ChatCompletion = await this.requestOpenAI(promptMessage)

            if (!response) {
                return ApiError(new Error(METHOD_FAILED('No response got from gpt').message), req, next, METHOD_FAILED().code)
            }

            return response
        } catch (error) {
            return ApiError(
                error instanceof Error ? error : new Error(METHOD_FAILED('Generate Ai response failed').message),
                req,
                next,
                METHOD_FAILED().code
            )
        }
    }

    /**
     * Changes the tone of the given text to match the specified type.
     * @param {Request} req - The Express request object
     * @param {NextFunction} next - Express next middleware function
     * @param text - The text to be transformed
     * @param type - The desired tone type
     * @returns {Promise<ChatCompletion>} The AI-generated text with the specified tone
     * @throws {ApiError} When the AI request fails or returns no response
     */
    public async toneChangeService(req: Request, next: NextFunction, text: string, type: string) {
        const promptMessage = `Please transform the following text to embody a ${type} tone, ensuring it gracefully adopts the desired style. Correct any grammatical or spelling errors, and enhance the text to sound natural and human-like. Focus on clarity, confidence, and maintaining an engaging narrative. Format the response in valid HTML markup that can be rendered in an editor (use appropriate HTML tags like <p>, <ul>, <li>, <h1>, <h2>, etc. where needed): ${text}`

        try {
            const response: ChatCompletion = await this.requestOpenAI(promptMessage)

            if (!response) {
                return ApiError(new Error(METHOD_FAILED('No response got from gpt').message), req, next, METHOD_FAILED().code)
            }

            return response.choices[0]?.message?.content
        } catch (error) {
            return ApiError(
                error instanceof Error ? error : new Error(METHOD_FAILED('Generate Ai response failed').message),
                req,
                next,
                METHOD_FAILED().code
            )
        }
    }

    /**
     *  Translate the given text into the specified language.
     * @param {Request} req - The Express request object
     * @param {NextFunction} next - Express next middleware function
     * @param {String} text - The text to be translated
     * @param type - The desired language to translate the text into
     * @returns  {Promise<ChatCompletion>} The AI-generated translated text
     * @throws {ApiError} When the AI request fails or returns no response
     */
    public async languageTranslateService(req: Request, next: NextFunction, text: string, type: string) {
        const promptMessage = `Translate the following text into ${type}. Maintain the original tone, meaning, and clarity. Consider cultural context and idiomatic expressions. Ensure natural flow in the target language while preserving key details and nuances, Text should feel like human not a robot generated text: ${text}`

        try {
            const response: ChatCompletion = await this.requestOpenAI(promptMessage)

            if (!response) {
                return ApiError(new Error(METHOD_FAILED('No response got from gpt').message), req, next, METHOD_FAILED().code)
            }

            return response
        } catch (error) {
            return ApiError(
                error instanceof Error ? error : new Error(METHOD_FAILED('Generate Ai response failed').message),
                req,
                next,
                METHOD_FAILED().code
            )
        }
    }

    /**
     *  Generate a long-form text based on the given text.
     * @param {Request} req - The Express request object
     * @param {NextFunction} next - Express next middleware function
     * @param {String} text - The text to be expanded
     * @returns  {Promise<ChatCompletion>} The AI-generated expanded text
     * @throws {ApiError} When the AI request fails or returns no response
     */
    public async makeTextLongService(req: Request, next: NextFunction, text: string) {
        const promptMessage = `Please enhance the following text by incorporating additional details, illustrative examples, or insightful commentary. Aim to craft a comprehensive and captivating narrative that maintains the original message and logic, Text should feel like human not a robot generated text: ${text}`

        try {
            const response: ChatCompletion = await this.requestOpenAI(promptMessage)

            if (!response) {
                return ApiError(new Error(METHOD_FAILED('No response got from gpt').message), req, next, METHOD_FAILED().code)
            }

            return response
        } catch (error) {
            return ApiError(
                error instanceof Error ? error : new Error(METHOD_FAILED('Generate Ai response failed').message),
                req,
                next,
                METHOD_FAILED().code
            )
        }
    }

    /**
     *  Generate a short-form text based on the given text.
     * @param {Request} req - The Express request object
     * @param {NextFunction} next - Express next middleware function
     * @param {String} text - The text to be condensed
     * @returns  {Promise<ChatCompletion>} The AI-generated condensed text
     * @throws {ApiError} When the AI request fails or returns no response
     */
    public async makeTextShortService(req: Request, next: NextFunction, text: string) {
        const promptMessage = `Condense the following text to its core message while retaining clarity and impact. Remove any unnecessary words or repetitive information, Text should feel like human not a robot generated text: ${text}`

        try {
            const response: ChatCompletion = await this.requestOpenAI(promptMessage)

            if (!response) {
                return ApiError(new Error(METHOD_FAILED('No response got from gpt').message), req, next, METHOD_FAILED().code)
            }

            return response
        } catch (error) {
            return ApiError(
                error instanceof Error ? error : new Error(METHOD_FAILED('Generate Ai response failed').message),
                req,
                next,
                METHOD_FAILED().code
            )
        }
    }

    public async generateContent(req: Request, next: NextFunction, options: { text: string; tone: ToneType; type: PromptType }) {
        const { text, tone, type } = options

        const promptMessage = promptSelection({ type, tone, text })

        if (typeof promptMessage === 'object') {
            return ApiError(new Error(BAD_REQUEST(promptMessage.message).message), req, next, BAD_REQUEST().code)
        }

        try {
            const response: ChatCompletion = await this.requestOpenAI(promptMessage)

            if (!response) {
                return ApiError(new Error(METHOD_FAILED('No response got from gpt').message), req, next, METHOD_FAILED().code)
            }

            return response
        } catch (error) {
            return ApiError(
                error instanceof Error ? error : new Error(METHOD_FAILED('Generate Ai response failed').message),
                req,
                next,
                METHOD_FAILED().code
            )
        }
    }

    private async requestOpenAI(prompt: string) {
        return await this.openai.chat.completions.create({
            model: this.model,
            messages: [{ role: 'user', content: prompt }]
        })
    }
}
