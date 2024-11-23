import { ResetPassword } from '../../Models/ResetPassword'
import { IBaseRepository } from './IBaseRepository'

export interface IResetPasswordRepository extends IBaseRepository<ResetPassword> {
    findByToken(resetToken: string): Promise<ResetPassword | null>
}
