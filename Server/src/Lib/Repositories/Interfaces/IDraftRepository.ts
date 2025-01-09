import { Post } from '@prisma/client'
import { IBaseRepository } from './IBaseRepository'
// import { PostDTO } from '../../Models/Blog'

export interface IDraftRepository extends IBaseRepository<Post> {
    findDraft(where: {id: string, authorId: string}, fields: object): Promise<Partial<Post> | null>
    findDraftById(where: Record<string, string | number>): Promise<Post | null>
    findDraftBySlug(where: Record<string, string | number>): Promise<Post | null>
    findDraftsByAuthorId(where: Record<string, string | number>, orderBy: Record<string, string>): Promise<Post[] | null>
}
