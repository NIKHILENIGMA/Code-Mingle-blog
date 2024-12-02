import { Blog } from '../../Models/Blog'
import { IBaseRepository } from './IBaseRepository'

export interface IBlogRepository extends IBaseRepository<Blog> {
    findPostById(id: string): Promise<Blog | null>
}
