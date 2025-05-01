/*  
@desciption: This file is responsible for creating a new instance of the PrismaClient class and exporting it for use in other parts of the codebase.

* This code snippet is importing the `PrismaClient` class from the `@prisma/client` package. 
* It then creates a new instance of `PrismaClient` called `prisma`. 
* Finally, it exports this `prisma` instance, making it available for use in other parts of the codebase. 
* This setup allows you to interact with a Prisma client for database operations in your TypeScript project. 
*/


import { logger } from '@/utils/logger/index'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const disconnectPrisma = async () => {
    try {
        await prisma.$disconnect()
        logger.info('Prisma disconnected successfully')
    } catch (err) {
        logger.error('Error disconnecting Prisma: %s', err)
    }
}

export default prisma
