import { ResetPassword  } from '../../Models/ResetPassword'
import prisma from '../../database/PrismaConnection'
import { ApiError } from '../../../utils/ApiError'
import { IResetPasswordRepository } from '../Interfaces/IResetPasswordRepository';


export class PrismaResetPasswordRepository implements IResetPasswordRepository {
    

    public async create(reset: ResetPassword): Promise<ResetPassword> {
        try {
            const resetPassword = await prisma.resetPassword.create({
                data: reset
            });
            return {
                ...resetPassword,
                expiresAt: resetPassword.expiresAt.toISOString()
            };
        } catch (error) {
            throw new ApiError(500, `Error creating reset password: ${(error as Error).message}`);
        }
    }

    public async update(id:number, reset: ResetPassword): Promise<ResetPassword> {
        try {
            const resetPassword = await prisma.resetPassword.update({
                where: {
                    id
                },
                data: reset
            });
            return {
                ...resetPassword,
                expiresAt: resetPassword.expiresAt.toISOString()
            };
        } catch (error) {
            throw new ApiError(500, `Error updating reset password: ${(error as Error).message}`);
        }
    }

    
    public async delete(id: number): Promise<void>{
        try {
            await prisma.resetPassword.delete({
                where: {
                    id
                }
            })
        } catch (error) {
            throw new ApiError(500, `Error removing reset password: ${(error as Error).message}`);
        }
    }

    public async findByToken(resetToken: string): Promise<ResetPassword | null > {
        try {
            const resetStore = await prisma.resetPassword.findUnique({
                where: {
                    resetToken
                }
            })

            if (!resetStore) {
                return null;
            }
            return {
                ...resetStore,
                expiresAt: resetStore.expiresAt.toISOString()
            };
        } catch (error) {
            throw new ApiError(500, `Error finding reset password: ${(error as Error).message}`);
        }
    }


}
