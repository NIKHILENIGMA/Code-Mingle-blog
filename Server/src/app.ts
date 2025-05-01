import express, { Application } from 'express'
import V1Routes from './api/routes'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import { corsOptions } from './constant/corsOptions'
import { globalErrorHandler, notFound } from '@/api/middlewares'
import { morganMiddleware } from '@/utils/logger/morgan'


const app: Application = express()

/**
 * Middlewares
 * @name helmet
 * @description Secure Express apps by setting various HTTP headers
 *
 * @name express.json
 * @description Parse incoming request with JSON payloads
 *
 * @name cookieParser
 * @description Parse Cookie header and populate req.cookies with an object keyed by the cookie names
 *
 * @name express.urlencoded
 * @description Parse incoming request with URL-encoded payloads
 *
 * @name express.static
 * @description Serve static files
 *
 * @name cors
 * @description Enable CORS with various options
 *
 * @name routes
 * @description API routes
 *
 * @name notFound
 * @description 404 Handler
 *
 *
 * @name globalErrorHandler
 * @description Global error handler
 */


// Middlewares
app.use(helmet()) // Security middleware to set various HTTP headers
app.use(morganMiddleware) // Logging HTTP requests
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))
app.use(express.static('public'))
app.use(cookieParser())
app.use(cors(corsOptions))

// Routes
app.use('/api', V1Routes)

// 404 Handler
app.use(notFound)

// Global Error Handler
app.use(globalErrorHandler)

export default app
