import prisma from '@/config/prisma.config'
import { DatabaseError } from '@/utils/Errors'
import { PasswordResetToken } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

interface ResetTokenPayload {
    userId: string
    email: string
    tokenHash: string
    expiresAt: Date
}

interface IResetPasswordRepository {
    createResetPasswordToken(payload: ResetTokenPayload): Promise<void>
    verifyResetPasswordToken(token: string): Promise<PasswordResetToken | null>
    deleteResetPasswordToken(userId: string, token: string): Promise<void>
}

export class PrismaResetPasswordRepository implements IResetPasswordRepository {
    constructor() {}
    public async createResetPasswordToken(payload: ResetTokenPayload): Promise<void> {
        try {
            await prisma.passwordResetToken.create({
                data: payload
            })
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new DatabaseError(
                    `Error creating reset password token: ${error.message}`,
                    'PrismaResetPasswordRepository.createResetPasswordToken'
                )
            }

            throw new DatabaseError(
                `An unexpected error while creating reset password token: ${(error as Error).message}`,
                'PrismaResetPasswordRepository.createResetPasswordToken'
            )
        }
    }

    public async verifyResetPasswordToken(token: string): Promise<PasswordResetToken | null> {
        try {
            const resetPasswordToken = await prisma.passwordResetToken.findFirst({
                where: {
                    tokenHash: token,
                    expiresAt: {
                        gte: new Date()
                    },
                    used: false
                }
            })

            return resetPasswordToken || null
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new DatabaseError(
                    `Error verifying reset password token: ${error.message}`,
                    'PrismaResetPasswordRepository.verifyResetPasswordToken'
                )
            }

            throw new DatabaseError(
                `An unexpected error while verifying reset password token: ${(error as Error).message}`,
                'PrismaResetPasswordRepository.verifyResetPasswordToken'
            )
        }
    }

    public async deleteResetPasswordToken(userId: string, token: string): Promise<void> {
        try {
            await prisma.passwordResetToken.updateMany({
                where: {
                    userId,
                    tokenHash: token
                },
                data: {
                    used: true
                }
            })
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new DatabaseError(
                    `Error deleting reset password token: ${error.message}`,
                    'PrismaResetPasswordRepository.deleteResetPasswordToken'
                )
            }

            throw new DatabaseError(
                `An unexpected error while deleting reset password token: ${(error as Error).message}`,
                'PrismaResetPasswordRepository.deleteResetPasswordToken'
            )
            
        }
    }
}
