import dotenvFlow from 'dotenv-flow'

dotenvFlow.config()

export const openAIConfig = {
    OPENAI_MODEL: (process.env.OPENAI_MODEL as string) || 'gpt-4o-mini',
    OPENAI_API_KEY: process.env.OPENAI_API_KEY as string,
    OPENAI_API_URL: process.env.OPENAI_API_URL as string
}
