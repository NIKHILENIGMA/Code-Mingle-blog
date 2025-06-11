

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
