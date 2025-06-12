import { Resend } from 'resend'
import { logger } from './logger/index'
import { RESEND_API_KEY } from '@/config'

const resend = new Resend(RESEND_API_KEY)

const sendResetEmail = async (email: string, resetLink: string) => {
    await resend.emails.send({
        from: 'YourApp Support nodedrafts@gmail.com',
        to: email,
        subject: 'Password Reset Request',
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
    })

    logger.info('Reset email sent successfully!')
}

export default sendResetEmail
