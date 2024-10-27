import app from './app'
import config from './config/config'
import logger from './utils/logger'
import morgan from 'morgan'

const morganFormat = ':method :url :status :response-time ms'

app.use(
    morgan(morganFormat, {
        stream: {
            write: (message: string) => {
                const logObj = {
                    method: message.split(' ')[0],
                    url: message.split(' ')[1],
                    status: message.split(' ')[2],
                    responseTime: message.split(' ')[3]
                }
                logger.info(JSON.stringify(logObj))
            }
        }
    })
)
const server = app.listen(config.PORT)

;(() => {
    try {
        logger.info(`APPLICATION STARTED`, {
            meta: {
                PORT: config.PORT,
                SERVER_URL: config.SERVER_URL
            }
        })
    } catch (error) {
        logger.error(error)
        server.close((err) => {
            if (err) {
                logger.error(err)
            }

            process.exit(1)
        })
    }
})()
