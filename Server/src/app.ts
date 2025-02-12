import express, { Application, Request, Response } from 'express'
import routes from './routes'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import { corsOptions } from './constant/corsOptions'
import { globalErrorHandler, notFound } from './middleware'

const app: Application = express()


// Middlewares
app.use(helmet()) // for securing the app by setting various HTTP headers
// app.disable('x-powered-by') // for disabling the X-Powered-By header
app.use(express.json({limit: '16kb'})) // for parsing application/json

app.use(cookieParser()) // for parsing cookies
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public')) // for serving static files

app.use(cors(corsOptions)) // for enabling cors

// Routes
app.use('/api/v1', routes)

// Testing Route
/* 
*/
app.get('/api', (_req: Request, res: Response) => {
    res.send('Hello World')
})

// 404 Handler
app.use(notFound)

app.use(globalErrorHandler)

export default app
