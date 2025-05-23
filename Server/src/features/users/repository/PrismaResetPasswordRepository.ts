import prisma from '@/config/prisma.config'

interface ResetTokenPayload {
    userId: string
    email: string
    tokenHash: string
    expiresAt: Date
}

interface IResetPasswordRepository {
    createResetPasswordToken(payload: ResetTokenPayload): Promise<void>
    verifyResetPasswordToken(token: string): Promise<string | null>
    deleteResetPasswordToken(userId: string, token: string): Promise<void>
}

export class PrismaResetPasswordRepository implements IResetPasswordRepository {
    public async createResetPasswordToken(payload: ResetTokenPayload): Promise<void> {
        await prisma.passwordResetToken.create({
            data: payload
        })
    }

    public async verifyResetPasswordToken(email: string): Promise<string | null> {
        const resetPasswordToken = await prisma.passwordResetToken.findFirst({
            where: {
                email,
                expiresAt: {
                    gte: new Date()
                },
                used: false
            }
        })

        return resetPasswordToken ? resetPasswordToken.tokenHash : null
    }

    public async deleteResetPasswordToken(userId: string, token: string): Promise<void> {
        await prisma.passwordResetToken.updateMany({
            where: {
                userId,
                tokenHash: token
            },
            data: {
                used: true
            }
        })
    }
}
