import { Resend } from 'resend'
import { resendConfig } from '@/config'

const apiKey = resendConfig.resendApiKey?.toString()

export const resend = new Resend(apiKey)
