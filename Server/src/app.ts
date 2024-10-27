import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import apiRoutes from './routes/apiRoutes'
import httpResponseMessage from './constant/httpResponseMessage'
import globalErrorHandler from './middleware/globalErrorHandler'
import ApiError from './utils/ApiError'
import helmet from 'helmet'
const app: Application = express()

// cors options
const corsOptions = {
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
    origin: process.env.CORS_ORIGIN,
    credentials: true
}

// Middlewares
app.use(helmet()) // for securing the app by setting various HTTP headers
app.disable('x-powered-by') // for disabling the X-Powered-By header
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public')) // for serving static files
app.use(cors(corsOptions)) // for enabling cors

// Routes
app.use('/api/v1', apiRoutes)

// 404 Handler
app.use((_: Request, res: Response, next: NextFunction): void => {
    res
      .status(404)
      .json(
        new ApiError(
            httpResponseMessage.error.notFound.code,
            httpResponseMessage.error.notFound.message,
        )
      )
    next()
})

app.use(globalErrorHandler)

export default app
