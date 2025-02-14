import { IUserRepository } from '../Interfaces/IUserRepository'
import { User, CreateUserDTO, UpdateUserDTO, UserWhere, UserEmailWhere } from '../../Models/User'
import prisma from '../../../config/prisma.config'

export class PrismaUserRepository implements IUserRepository {
    public async create(user: CreateUserDTO): Promise<User> {
        const newUser = await prisma.user.create({
            data: user
        })
        return newUser
    }

    public async update(where: UserWhere, userData: UpdateUserDTO): Promise<User | null> {
        return await prisma.user.update({ where, data: userData })
    }

    public async delete(where: UserWhere): Promise<void> {
        await prisma.user.delete({ where })
    }

    public async updatePassword(where: UserWhere, password: string): Promise<User | null> {
        return await prisma.user.update({
            where,
            data: {
                password
            }
        })
    }

    public async findUserById(where: UserWhere): Promise<User | null> {
        return await prisma.user.findFirst({ where })
    }

    public async findUserByEmail(where: UserEmailWhere): Promise<User | null> {
        const user = await prisma.user.findUnique({ where })

        return user
    }

    public async getAllUsers(): Promise<User[] | null> {
        return await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc'
            },
        })
    }

    public async findByEmail(where: UserWhere): Promise<User | null> {
        return prisma.user.findUnique({ where })
    }
}
