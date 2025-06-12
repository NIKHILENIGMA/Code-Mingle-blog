import { Comment } from '@prisma/client'


export interface ICommentRepository  {
    findCommentById(id: string): Promise<Comment | null>
    findCommentByCommentIdAndPostId(postId: string, commentId: string): Promise<Comment | null>
    findParentCommentByUserAndCommentId(userId: string, commentId: string): Promise<Comment | null>
}
