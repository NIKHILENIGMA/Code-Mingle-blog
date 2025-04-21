import { errorResponse, PromptSelectionProps, PromptType, ToneType } from '@/types/common/base.types'

/**
 *  Prompt Selection
 * @description This function generates a prompt based on the type of request and the tone specified.
 * @param type - The type of request (e.g., 'simple', 'advanced', 'condense').
 * @param tone - The tone of the text (e.g., 'formal', 'informal', 'neutral').
 * @param text - The text to be processed.
 * @returns  {string} - The generated prompt.
 */

const validTones: ToneType[] = ['Professional', 'Casual', 'Friendly', 'Formal', 'Confident', 'Optimistic', 'Empathetic', 'Assertive']

const validTypes: PromptType[] = ['simple', 'advanced', 'condense']

export function promptSelection({ type, tone, text, maxLength = 1000 }: PromptSelectionProps): string | errorResponse {
    if (!validTypes.includes(type)) {
        return {
            error: 'Invalid type',
            message: 'Type must be one of the following: simple, advanced, condense'
        }
    }

    if (!validTones.includes(tone)) {
        return {
            error: 'Invalid tone',
            message: 'Tone must be one of the following: Professional, Casual, Friendly, Formal, Confident, Optimistic, Empathetic, Assertive'
        }
    }

    if (maxLength && text.length > maxLength) {
        return {
            error: 'Invalid text length',
            message: `Text length must be less than ${maxLength} characters`
        }
    }

    const prompts = {
        simple: `Generate creative, engaging, and well-structured content that is:
            - Detailed and factually accurate
            - Written in a ${tone} tone
            - Enhanced with relevant examples
            - Organized with logical flow
            
            Content to process: ${text}`,

        advanced: `Enhance the following content while maintaining:
            - Original message integrity
            - Logical flow and structure
            - Supporting evidence and examples
            - Technical accuracy and clarity
            - ${tone} communication style
            
            Content to enhance: ${text}`,

        condense: `Create a concise version that:
            - Maintains core message and key points
            - Removes redundancy and unnecessary details
            - Preserves clarity and impact
            - Keeps a ${tone} tone
            
            Content to condense: ${text}`
    }

    return (
        prompts[type] ||
        (() => {
            return { error: 'Invalid type', message: 'Type must be one of the following: simple, advanced, condense' } as errorResponse
        })()
    )
}
