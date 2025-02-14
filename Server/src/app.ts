import express, { Application } from 'express'
import routes from './routes'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import { corsOptions } from './constant/corsOptions'
import { globalErrorHandler, notFound } from './middleware'

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
app.use(helmet()) 
app.use(express.json({limit: '16kb'}))
app.use(express.urlencoded({ extended: true })) 
app.use(express.static('public')) 
app.use(cookieParser()) 
app.use(cors(corsOptions)) 

// Routes
app.use('/api/v1', routes)



// 404 Handler
app.use(notFound)

app.use(globalErrorHandler)

export default app
