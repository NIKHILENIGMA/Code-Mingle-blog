import { NextFunction, Request } from 'express'
import { resend } from '../helpers/resend'
import { ApiError } from '../utils/ApiError'
import responseMessage from '../constant/responseMessage'

export default class MailService {
    /**
     * Sends an email to the user with a link to reset their password.
     *
     * @param {string} email - The email address of the user.
     * @param {string} token - The token to be used for password reset.
     * @returns {Promise<void>} - A promise that resolves when the email is sent.
     */

    public async sendPasswordResetEmail(req: Request, next: NextFunction, email: string, token: string): Promise<void> {
        try {
            await resend.emails.send({
                from: 'Acme <onboarding@resend.dev>',
                to: [`${email}`],
                subject: 'Password Reset Request',
                text: `Hello, \n\n We received a request to reset your password for your CodeMingle account. Please click the link below to reset your password:\n\n ${process.env.SERVER_URL}/reset-password/${token} \n\n If you did not request a password reset, please ignore this email or contact support if you have questions.
            \n\n
            Thank you, \n The CodeMingle Team`
            })
        } catch (error) {
            ApiError(error instanceof Error ? error : new Error(responseMessage.METHOD_FAILED('Error sending password reset email')), req, next, 500)
        }
    }
}
