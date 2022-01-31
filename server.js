require('./config/env')
const path = require('path')
const cluster = require('cluster')
const express = require('express')
const compression = require('compression')

const app = express()
const port = process.env.PORT || 4000

// Set process name
if (process.env.APP_NAME) {
   process.title = process.env.APP_NAME
}

// Disable the express header for security
app.disable('x-powered-by')

app.use(compression())

// Parse JSON and form data in req.body
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(
   express.static(path.join(__dirname, 'public'), {
      maxAge: '365d',
   })
)

// app.use(require('./controllers/logging'))

app.use(require('./routes'))

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
if (cluster.isMaster) {
   module.exports = app.listen(port, () => {
      console.log(`Server started in ${app.get('env')} mode on port ${port}`)
   })
} else {
   // eslint-disable-next-line global-require
   require('os')
      .cpus()
      .forEach(() => cluster.fork())

   // log any workers that disconnect; if a worker disconnects, it
   // should then exit, so we'll wait for the exit event to spawn
   // a new worker to replace it
   cluster.on('disconnect', (worker) => {
      console.log('CLUSTER: Worker %d disconnected from the cluster.', worker.id)
   })

   // when a worker dies (exits), create a worker to replace it
   cluster.on('exit', (worker, code, signal) => {
      console.log(
         'CLUSTER: Worker %d died with exit code %d (%s)',
         worker.id,
         code,
         signal
      )
      cluster.fork()
   })
}
