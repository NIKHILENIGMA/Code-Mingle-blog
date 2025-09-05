import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client'
import { logger } from '@/utils/logger/index'
import { appConfig } from './app.config'
import dotenvFlow from 'dotenv-flow'


dotenvFlow.config()


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


export const DATABASE_URL: string = process.env.DATABASE_URL || 'postgres://user:password@localhost:5432/mydb';
export const PG_IDLE_TIMEOUT_MS: number = process.env.PG_IDLE_TIMEOUT_MS ? parseInt(process.env.PG_IDLE_TIMEOUT_MS) : 10000;

export default prisma
