import { Reply } from '@prisma/client'

export interface IReplyRepository {
    create(payload: Partial<Reply>): Promise<Reply>
    delete(replyId: string): Promise<void>
    getRepliesByCommentId(commentId: string, page: number, limit: number): Promise<Reply[]>
    getReplyById(replyId: string, commentId: string): Promise<Reply | null>
}
