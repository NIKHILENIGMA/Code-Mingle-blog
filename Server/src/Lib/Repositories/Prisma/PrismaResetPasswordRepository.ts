import { ResetPassword  } from '../../Models/ResetPassword'
import prisma from '../../database/PrismaConnection'
// import { ApiError } from '../../../utils/ApiError'
import { IResetPasswordRepository } from '../Interfaces/IResetPasswordRepository';


export class PrismaResetPasswordRepository implements IResetPasswordRepository {
    

    public async create(reset: ResetPassword): Promise<ResetPassword> {
        const resetPassword = await prisma.resetPassword.create({
            data: reset
        });
        return {
            ...resetPassword,
            expiresAt: resetPassword.expiresAt.toISOString()
        };
    }

    public async update(id:number, reset: ResetPassword): Promise<ResetPassword> {
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
    }

    
    public async delete(id: number): Promise<void>{
        await prisma.resetPassword.delete({
            where: {
                id
            }
        })
    }

    public async findByToken(resetToken: string): Promise<ResetPassword | null > {
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
    }


}
