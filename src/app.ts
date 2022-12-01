import express from 'express'
import compression from 'compression'
import cors from 'cors'
import router from './routes'
import morgan from 'morgan'
// import logging from './controllers/logging'

const app = express()
const { ROUTE_VERSION = '/v1' } = process.env

// Set process name
if (process.env.APP_NAME) {
   process.title = process.env.APP_NAME
}

// Disable the express header for security
app.disable('x-powered-by')

app.use(compression())

app.use(cors())
// Parse JSON and form data in req.body
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(morgan('common'))

// app.use(logging)

app.use(ROUTE_VERSION, router)

// Error handler for promises - silently catch
process.on('uncaughtException', (err) => {
   console.error(`[Uncaught Error]:\n${err.stack}`)
   process.exit(1)
})

export default app
