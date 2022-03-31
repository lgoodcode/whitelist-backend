import '../config/env'
import express from 'express'
import cluster from 'cluster'
import compression from 'compression'
import cors from 'cors'
import routes from './routes'
import logging from './controllers/logging'
import type { Worker } from 'cluster'

import forceHTTPS from './helpers/forceHTTPS'

const app = express()
const port = process.env.PORT || 4000

// Set process name
if (process.env.APP_NAME) {
   process.title = process.env.APP_NAME
}

// Disable the express header for security
app.disable('x-powered-by')
// Compress all responses
app.use(compression())
// Allow cross-domain requests from the frontend to Heroku backend
app.use(cors())
// Parse JSON and form data in req.body
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// app.use(forceHTTPS)

app.use(logging)

app.use('/v1', routes)

// Error handler for promises - silently catch
process.on('uncaughtException', (err) => {
   console.error(`uncaught error\n${err.stack}`)
   console.error('Killing node...')
   process.exit(1)
})

/**
 *  If this script is ran directly, require.main === module will be true;
 *  if it is false, the script has been loaded from another script
 *  using require.
 *
 *  If ran directly, start server app with clustering
 */
if (cluster.isPrimary) {
   app.listen(port, () => {
      console.log(`Server started in ${app.get('env')} mode on port ${port}`)
   })
} else {
   // eslint-disable-next-line @typescript-eslint/no-var-requires
   require('os')
      .cpus()
      .forEach(() => cluster.fork())

   // log any workers that disconnect; if a worker disconnects, it
   // should then exit, so we'll wait for the exit event to spawn
   // a new worker to replace it
   cluster.on('disconnect', (worker: Worker) => {
      console.log('CLUSTER: Worker %d disconnected from the cluster.', worker.id)
   })

   // when a worker dies (exits), create a worker to replace it
   cluster.on('exit', (worker: Worker, code: number, signal: string) => {
      console.log(
         'CLUSTER: Worker %d died with exit code %d (%s)',
         worker.id,
         code,
         signal
      )
      cluster.fork()
   })
}
