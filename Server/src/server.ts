import app from './app'
import config from './config/config'
import logger, { winstonStream } from './utils/logger'
import prisma from './Lib/ORMs/PrismaConnection'
import morgan from 'morgan'

const morganFormat = ':method :url :status :response-time ms'

app.use(morgan(morganFormat, { stream: winstonStream })) // Logging HTTP requests

const server = app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})

// Connect to the database
void (() => {
    try {
        logger.info('Database connection successful')
    } catch (error) {
        logger.error('Error while connecting to the database: ', error)
        process.exit(1)
    }
})()

// Handle graceful shutdown
// Graceful shutdown
process.on('beforeExit', () => {
    (async () => {
        try {
            await prisma.$disconnect(); // Disconnect Prisma client
            server.close(); // Close the server
            logger.info('Server shutting down');
        } catch (error) {
            logger.error('Error shutting down server: ', error);
            process.exit(1); // Exit with failure code
        }
    })().catch(err => {
        logger.error('Error during shutdown process: ', err);
        process.exit(1); // Exit with failure code
    });;
});

export default server
