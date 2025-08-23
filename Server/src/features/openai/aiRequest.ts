import axios from 'axios'
import { openAIConfig } from '@/config'

export const apiInstance = axios.create({
    baseURL: openAIConfig.OPENAI_API_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openAIConfig.OPENAI_API_KEY}`
    }
})
