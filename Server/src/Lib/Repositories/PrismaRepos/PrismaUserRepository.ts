import { IUserRepository } from '../Interfaces/IUserRepository'
import { User } from '../../Models/User'
import prisma from '../../database/PrismaConnection'

export class PrismaUserRepository implements IUserRepository {
    public async create(user: User): Promise<User> {
        const newUser = await prisma.user.create({
            data: user
        })
        return newUser
    }

    public async update(where: { id: string }, user: User): Promise<User | null> {
        return await prisma.user.update({ where: where, data: user })
    }

    public async delete(where: { id: string }): Promise<void> {
        await prisma.user.delete({ where: where })
    }

    public async findUserById(id: string): Promise<User | null> {
        return await prisma.user.findFirst({ where: { id } })
    }

    public async findUserByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({ where: { email } })

        return user
    }

    public async getAllUsers(): Promise<User[] | null> {
        return await prisma.user.findMany()
    }

    public async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({ where: { email } })
    }
}
