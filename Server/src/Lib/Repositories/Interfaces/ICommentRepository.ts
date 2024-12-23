import { Comment } from '@prisma/client'
import { IBaseRepository } from './IBaseRepository'

export interface ICommentRepository extends IBaseRepository<Comment> {
    findCommentById(id: string): Promise<Comment | null>
    findCommentByCommentIdAndPostId(postId: string, commentId: string): Promise<Comment | null>
    findParentCommentByUserAndCommentId(userId: string, commentId: string): Promise<Comment | null>
}
