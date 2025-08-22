import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client'
import { logger } from '@/utils/logger/index'
import { appConfig } from './app.config'

const adapter = new PrismaPg({
    connectionString: appConfig.DATABASE_URL
})

const prisma = new PrismaClient({
    adapter
})

export const connectPrisma = async () => {
    try {
        await prisma.$connect()
        logger.info('Prisma connected successfully')
    } catch (error) {
        logger.error('Error connecting Prisma: %s', error)
    }
}

export const disconnectPrisma = async () => {
    try {
        await prisma.$disconnect()
        logger.info('Prisma disconnected successfully')
    } catch (err) {
        logger.error('Error disconnecting Prisma: %s', err)
    }
}

export default prisma
