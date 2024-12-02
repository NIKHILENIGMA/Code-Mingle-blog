import prisma from '../../database/PrismaConnection'
import { Blog } from '../../Models/Blog'
import { IBlogRepository } from '../Interfaces/IBlogRepository'

export class PrismaBlogRepository implements IBlogRepository {
    public async create(data: Partial<Blog>): Promise<Blog> {
        return await prisma.post.create({
            data: {
                title: data.title as string,
                content: data.content as string,
                tags: data.tags as string[],
                authorId: data.authorId as string
                
            }
        })
    }

    public async update(id: string, data: Partial<Blog>): Promise<Blog> {
        return await prisma.post.update({
            where: {
                id
            },
            data: {
                title: data.title as string,
                content: data.content as string,
                tags: data.tags as string[]
            }
        })
    }

    public async delete(id: string): Promise<void> {
        await prisma.post.delete({
            where: {
                id: id
            }
        })
    }

    public async findPostById(id: string): Promise<Blog | null> {
        return await prisma.post.findUnique({
            where: {
                id: id
            }
        })
    }
}
