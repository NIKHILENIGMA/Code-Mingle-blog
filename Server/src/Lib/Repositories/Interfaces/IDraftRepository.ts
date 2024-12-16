import { Post } from '@prisma/client'
import { IBaseRepository } from './IBaseRepository'

export interface IDraftRepository extends IBaseRepository<Post> {
    findDraft(id: string, authorId: string, fields: object): Promise<Partial<Post> | null>
    findDraftById(id: string, authorId?: string): Promise<Post | null>
    findDraftBySlug(slug: string): Promise<Post | null>
    findDraftsByAuthorId(authorId: string): Promise<Post[] | null>

}