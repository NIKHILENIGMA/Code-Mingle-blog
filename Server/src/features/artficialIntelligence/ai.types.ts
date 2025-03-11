export interface Prompt {
    type?: string
    text: string
}

export interface Message {
    role: string
    content: string
}

export interface OpenAICompletion {
    id: string
    object: string
    created: number
    model: string
    choices: { message: { role: string; content: string } }[]
    usage: { prompt_tokens: number; completion_tokens: number; total_tokens: number }
    messages: Message[]
}
