import { Post } from '@prisma/client'
import { Blog } from '../../Models/Blog'
import { GenerateDraft } from '../../../types/draft'


export interface IDraftRepository  {
    create(payload: GenerateDraft): Promise<Blog>
    update(where: {id: string}, payload: Partial<Post>): Promise<Post>
    delete(where: {id: string}): Promise<void>
    findDraft(where: {id: string, authorId: string}, fields: object): Promise<Partial<Post> | null>
    findDrafts(): Promise<Post[] | null>
    findDraftById(where: Record<string, string | number>): Promise<Post | null>
    findDraftBySlug(where: Record<string, string | number>): Promise<Post | null>
    findDraftsByAuthorId(where: Record<string, string | number>, orderBy?: Record<string, string>): Promise<Post[] | null>
}
