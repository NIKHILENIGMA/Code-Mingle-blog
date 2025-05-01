import app from './app'
import { appConfig } from './config'
import { logger } from './utils/logger/index'
import { disconnectPrisma } from './config/prisma.config'
import 'module-alias/register'

const server = app.listen(appConfig.PORT, () => {
    logger.info(`Server running on port ${appConfig.PORT}`)
})

// Graceful shutdown
const shutdown = async (): Promise<void> => {
    try {
        await disconnectPrisma()
        server.close(() => {
            logger.info('Server shutting down gracefully. All connections closed.')

            process.exit(0)
        })
    } catch (error) {
        logger.error('❌ Error during shutdown: %s', error)
        process.exit(1)
    }
}

process.on('SIGINT', () => {
    void shutdown()
})
process.on('SIGTERM', () => {
    void shutdown()
})

// Handle uncaught errors globally
process.on('unhandledRejection', (reason) => {
    logger.error('Unhandled Rejection:', reason)
})

process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', error)
    process.exit(1)
})

export default server
