import { tranformer } from '../helpers/nodemailer'

export default class MailService {
    /**
     * Sends an email to the user with a link to reset their password.
     *
     * @param {string} email - The email address of the user.
     * @param {string} token - The token to be used for password reset.
     * @returns {Promise<void>} - A promise that resolves when the email is sent.
     */
    
    public async sendPasswordResetEmail(email: string, token: string): Promise<void> {
        await tranformer.sendMail({
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: 'Password Reset Request',
            text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n Please click on the following link, or paste this into your browser to complete the process: http://${process.env.CLIENT_URL}/reset-password/${token}\n\n If you did not request this, please ignore this email and your password will remain unchanged.\n`
        })

        
    }
}
