import { IUserRepository } from '../Interfaces/IUserRepository'
import { User } from '../../Models/User'
import prisma from '../../Databases/PrismaConfig'
import ApiError from '../../../utils/ApiError'

export class PrismaUserRepository implements IUserRepository {
    /**
     * @description The `create` function asynchronously creates a new user record in the database using Prisma.
     * @param {User} user - The `user` parameter in the `create` function represents an object of type
     * `User`. This object likely contains data related to a user, such as their name, email, and any
     * other relevant information needed to create a new user record in a database.
     * @returns The `create` function is returning a Promise that resolves to a `User` object.
     */

    async create(user: User): Promise<User> {
        return await prisma.user.create({ data: user })
    }

    /**
     * @description The `getById` function asynchronously retrieves a user by their ID using Prisma and returns either the user object or null.
     * @param {string} id - The `id` parameter is a string that represents the unique identifier of a
     * user.
     * @returns The `getById` function is returning a Promise that resolves to either a `User` object
     * if a user with the specified `id` is found in the database, or `null` if no user is found.
     */
    async getById(id: string): Promise<User | null> {
        return await prisma.user.findUnique({ where: { id } })
    }

    /**
     * @description The `getAll` function asynchronously retrieves all user records from the database using Prisma.
     * @returns The `getAll` function is returning a Promise that resolves to an array of User objects.
     * The User objects are fetched from the database using Prisma's `findMany` method.
     */
    async getAll(): Promise<User[]> {
        return await prisma.user.findMany()
    }

    /**
     * @description The function `update` asynchronously updates a user record in the database using Prisma based on the provided ID and user data.
     * @param {string} id - The `id` parameter is a string that represents the unique identifier of the
     * user you want to update in the database.
     * @param {User} user - The `user` parameter in the `update` function represents the data that you
     * want to update for a user in the database. It typically includes fields such as `name`, `email`,
     * `age`, etc., depending on the schema of your `User` model. This data will be used to
     * @returns The `update` method in the code snippet is returning a Promise that resolves to either
     * a `User` object or `null`.
     */
    async update(id: string, user: User): Promise<User | null> {
        return await prisma.user.update({ where: { id }, data: user })
    }



    /**
     * @description This TypeScript function deletes a user from the database using Prisma.
     * @param {string} id - The `id` parameter is a string that represents the unique identifier of the user that you want to delete from the database.
     */
    async delete(id: string): Promise<void> {
        await prisma.user.delete({ where: { id } })
    }

    /**
     * @description This TypeScript function asynchronously finds a user by their email using Prisma.
     * @param {string} email - The `email` parameter in the `findByEmail` function is a string that
     * represents the email address of the user you want to find in the database.
     * @returns The `findByEmail` function is returning a Promise that resolves to either a `User`
     * object if a user with the specified email is found in the database, or `null` if no user is
     * found.
     */
    async findByEmail(email: string): Promise<User | null> {
        if (!email) throw new ApiError(404, 'Email not found when searching for user')
            
        return prisma.user.findUnique({ where: { email } })
    }
}
