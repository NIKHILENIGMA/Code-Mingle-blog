import { Resend } from 'resend'
import { configMailService } from '../config/config'

const apiKey = configMailService.resendApiKey?.toString()

export const resend = new Resend(apiKey)




