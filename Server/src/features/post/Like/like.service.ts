import prisma from '@/config/prisma.config'
import { StandardError } from '@/utils/Errors/StandardError'

type LikeWhere = {
    userId: string
    postId?: string
    commentId?: string
    replyId?: string
}

export default class LikeServices {
    constructor() {}

    public async checkLikeStatusService(where: LikeWhere): Promise<boolean | void> {
        try {
            const status = await prisma.like.findFirst({
                where
            })

            return status ? true : false
        } catch (error) {
            if (error instanceof StandardError) {
                throw error
            }
        }
    }
}
