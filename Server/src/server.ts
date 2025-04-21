import app from './app'
import { appConfig } from './config'
import logger from './utils/logger'
import { disconnectPrisma } from './config/prisma.config'
import 'module-alias/register';


const server = app.listen(appConfig.PORT, () => {
    logger.info(`Server running on port ${appConfig.PORT}`)
})

// Graceful shutdown
const shutdown = async (): Promise<void> => {
    try {
        await disconnectPrisma()
        server.close(() => {
            logger.info('🛑 Server shut down gracefully')
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
// Handle graceful shutdown
// Graceful shutdown
// process.on('beforeExit', () => {
//     ;(async () => {
//         try {
//             await prisma.$disconnect() // Disconnect Prisma client
//             server.close() // Close the server
//             logger.info('Server shutting down')
//         } catch (error) {
//             logger.error('Error shutting down server: %s', error)
//             process.exit(1) // Exit with failure code
//         }
//     })().catch((err) => {
//         logger.error('Error during shutdown process: %s', err)
//         process.exit(1) // Exit with failure code
//     })
// })

export default server
