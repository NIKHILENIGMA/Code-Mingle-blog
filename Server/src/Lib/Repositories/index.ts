import { ICommentRepository } from './Interfaces/ICommentRepository'
import { PrismaCommentRepository } from './PrismaRepos/PrismaCommentRepository'

export class RepositoryFactory {
    static CommentRepository(): ICommentRepository {
        return new PrismaCommentRepository()
    }
}
