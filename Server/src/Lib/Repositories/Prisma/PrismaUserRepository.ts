import { IUserRepository } from '../Interfaces/IUserRepository'
import { User } from '../../Models/User'
import prisma from '../../database/PrismaConnection'
import { ApiError } from '../../../utils/ApiError'

export class PrismaUserRepository implements IUserRepository {
    

    public async create(user: User): Promise<User> {
        try {
            const newUser = await prisma.user.create({
                data: user
            })
            return newUser
        } catch (error) {
            throw new ApiError(500, `Error creating user ${(error as Error).message}`)
        }
    }


    public async update(id: string, user: User): Promise<User | null> {
        try {
            return await prisma.user.update({ where: { id }, data: user })
        } catch (error) {
            throw new ApiError(500, `Error updating user ${(error as Error).message}`)
        }
    }

    public async delete(id: string): Promise<void> {
        try {
            await prisma.user.delete({ where: { id } })
        } catch (error) {
            throw new ApiError(500, `Error deleting user ${(error as Error).message}`)
        }
    }

    public async findUserById(id: string): Promise<User | null> {
        try {
            return await prisma.user.findFirst({ where: { id } })
        } catch (error) {
            throw new ApiError(500, `Error finding user by ID ${(error as Error).message}`)
        }
    }


    public async findUserByEmail(email: string): Promise<User | null> {
        try {
            const user = await prisma.user.findUnique({ where: { email } })

            return user
        } catch (error) {
            throw new ApiError(500, `Error finding user by email ${(error as Error).message}`)
        }
    }


    public async getAllUsers(): Promise<User[] | null> {
        try {
            return await prisma.user.findMany()
        } catch (error) {
            throw new ApiError(500, `Error finding all users ${(error as Error).message}`)
        }
    }

    public async findByEmail(email: string): Promise<User | null> {
        try {
            if (!email) throw new ApiError(404, 'Email not found when searching for user')

            return prisma.user.findUnique({ where: { email } })
        } catch (error) {
            throw new ApiError(500, `Error finding user by email ${(error as Error).message}`)
        }
    }
}
