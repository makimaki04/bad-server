import { errors } from 'celebrate'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import express, { json, urlencoded } from 'express'
import mongoose from 'mongoose'
import path from 'path'
import { DB_ADDRESS, JSON_BODY_LIMIT, ORIGIN_ALLOW } from './config'
import errorHandler from './middlewares/error-handler'
import serveStatic from './middlewares/serverStatic'
import routes from './routes'
import { limiter } from './middlewares/limiter'
import mongoSanitize from 'express-mongo-sanitize'
import { queryLimit, validateQueryParams } from './middlewares/query-limit'

const { PORT = 3000 } = process.env
const app = express()

app.use(limiter)
app.use(cookieParser())
app.use(
    cors({ 
        origin: ORIGIN_ALLOW || 'http://localhost:5173', 
        credentials: true
    })
)
app.use(serveStatic(path.join(__dirname, 'public')))
app.use(urlencoded({ extended: true }))
app.use(json({ limit: JSON_BODY_LIMIT }))
app.use(mongoSanitize())
app.use(queryLimit)
app.use(validateQueryParams)
app.use(routes)
app.use(errors())
app.use(errorHandler)

// eslint-disable-next-line no-console

const bootstrap = async () => {
    try {
        await mongoose.connect(DB_ADDRESS)
        await app.listen(PORT, () => console.log('ok'))
    } catch (error) {
        console.error(error)
    }
}

bootstrap()
