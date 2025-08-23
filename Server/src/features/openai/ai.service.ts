import OpenAI from 'openai'
import { openAIConfig } from '@/config'
import { ChatCompletion } from 'openai/resources'
import { promptSelection } from '../../utils/PromptSelection'
import { PromptType, ToneType } from '@/types/common/base.types'
import { InternalServerError } from '@/utils/Errors'
import { StandardError } from '@/utils/Errors/StandardError'


export default class AIService {
    private openai: OpenAI
    private readonly model: string = openAIConfig.OPENAI_MODEL

    constructor() {
        this.openai = new OpenAI({
            apiKey: openAIConfig.OPENAI_API_KEY
        })
    }

    public async simplifyTextService(text: string): Promise<ChatCompletion | void> {
        const promptMessage = `Rewrite the following text to make it clear, concise, and accessible for a general audience. Use simple language, short sentences, and avoid technical jargon to ensure easy understanding. Format the response in valid HTML markup that can be rendered in an editor (use appropriate HTML tags like <p>, <ul>, <li>, <h1>, <h2>, etc. where needed): ${text}`

        try {
            const response: ChatCompletion = await this.requestOpenAI(promptMessage)

            if (!response) {
                throw new InternalServerError('No response got from OpenAI', 'AIService.simplifyTextService')
            }

            return response
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }

            if (error instanceof Error) {
                throw new InternalServerError(`Generate AI response failed: ${error.message}`, 'AIService.simplifyTextService')
            }

            throw new InternalServerError(
                `An unexpected error occurred while simplifying text: ${(error as Error).message}`,
                'AIService.simplifyTextService'
            )
        }
    }

    public async toneChangeService(text: string, type: string) {
        const promptMessage = `Please transform the following text to embody a ${type} tone, ensuring it gracefully adopts the desired style. Correct any grammatical or spelling errors, and enhance the text to sound natural and human-like. Focus on clarity, confidence, and maintaining an engaging narrative. Format the response in valid HTML markup that can be rendered in an editor (use appropriate HTML tags like <p>, <ul>, <li>, <h1>, <h2>, etc. where needed): ${text}`

        try {
            const response: ChatCompletion = await this.requestOpenAI(promptMessage)

            if (!response) {
                throw new InternalServerError('No response got from OpenAI', 'AIService.toneChangeService')
            }

            return response.choices[0]?.message?.content
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }

            if (error instanceof Error) {
                throw new InternalServerError(`Generate AI response failed: ${error.message}`, 'AIService.toneChangeService')
            }

            throw new InternalServerError(
                `An unexpected error occurred while changing tone: ${(error as Error).message}`,
                'AIService.toneChangeService'
            )
        }
    }

    public async languageTranslateService(text: string, type: string) {
        const promptMessage = `Translate the following text into ${type}. Maintain the original tone, meaning, and clarity. Consider cultural context and idiomatic expressions. Ensure natural flow in the target language while preserving key details and nuances, Text should feel like human not a robot generated text: ${text}`

        try {
            const response: ChatCompletion = await this.requestOpenAI(promptMessage)

            if (!response) {
                throw new InternalServerError('No response got from OpenAI', 'AIService.languageTranslateService')
            }

            return response
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }
            if (error instanceof Error) {
                throw new InternalServerError(`Generate AI response failed: ${error.message}`, 'AIService.languageTranslateService')
            }

            throw new InternalServerError(
                `An unexpected error occurred while translating text: ${(error as Error).message}`,
                'AIService.languageTranslateService'
            )
        }
    }

    public async makeTextLongService(text: string) {
        const promptMessage = `Please enhance the following text by incorporating additional details, illustrative examples, or insightful commentary. Aim to craft a comprehensive and captivating narrative that maintains the original message and logic, Text should feel like human not a robot generated text: ${text}`

        try {
            const response: ChatCompletion = await this.requestOpenAI(promptMessage)

            if (!response) {
                throw new InternalServerError('No response got from OpenAI', 'AIService.makeTextLongService')
            }

            return response
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }

            if (error instanceof Error) {
                throw new InternalServerError(`Generate AI response failed: ${error.message}`, 'AIService.makeTextLongService')
            }

            throw new InternalServerError(
                `An unexpected error occurred while expanding text: ${(error as Error).message}`,
                'AIService.makeTextLongService'
            )
        }
    }


    public async makeTextShortService(text: string) {
        const promptMessage = `Condense the following text to its core message while retaining clarity and impact. Remove any unnecessary words or repetitive information, Text should feel like human not a robot generated text: ${text}`

        try {
            const response: ChatCompletion = await this.requestOpenAI(promptMessage)

            if (!response) {
                throw new InternalServerError('No response got from OpenAI', 'AIService.makeTextShortService')
            }

            return response
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }

            if (error instanceof Error) {
                throw new InternalServerError(`Generate AI response failed: ${error.message}`, 'AIService.makeTextShortService')
            }

            throw new InternalServerError(
                `An unexpected error occurred while condensing text: ${(error as Error).message}`,
                'AIService.makeTextShortService'
            )
        }
    }

    public async generateContent(options: { text: string; tone: ToneType; type: PromptType }) {
        const { text, tone, type } = options

        const promptMessage = promptSelection({ type, tone, text })

        if (typeof promptMessage === 'object') {
            throw new InternalServerError(
                `An unexpected error occurred while generating content: ${promptMessage.message}`,
                'AIService.generateContent'
            )
        }

        try {
            const response: ChatCompletion = await this.requestOpenAI(promptMessage)

            if (!response) {
                throw new InternalServerError('No response got from OpenAI', 'AIService.generateContent')
            }

            return response
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }

            if (error instanceof Error) {
                throw new InternalServerError(`Generate AI response failed: ${error.message}`, 'AIService.generateContent')
            }

            throw new InternalServerError(
                `An unexpected error occurred while generating content: ${(error as Error).message}`,
                'AIService.generateContent'
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
