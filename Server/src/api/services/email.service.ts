import { RESEND_API_KEY } from '@/config'
import { FRONTEND_URL } from '@/config/app.config'
import { logger } from '@/utils/logger'
import { Resend } from 'resend'

const resend = new Resend(RESEND_API_KEY)

export const sendVerificationEmail = async (email: string, verificationToken: string) => {
    const verificationLink = `${FRONTEND_URL}/verify-email?token=${verificationToken}`
    try {
        const response = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: [email],
            subject: 'Please verify your email address',
            html: `
        <p>Hi there,</p>
        <p>Click the link below to verify your email:</p>
        <a href="${verificationLink}">${verificationLink}</a>
        <p>This link will expire in 24 hours.</p>
      `
        })

        return response
    } catch (error) {
        logger.error('Error sending verification email:', error)
        throw new Error('Failed to send verification email.')
    }
}
