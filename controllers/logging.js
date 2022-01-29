const router = require('express').Router()
const morgan = require('morgan')
const rfs = require('rotating-file-stream')
const path = require('path')
const logGenerator = require('../utilities/logGenerator')

module.exports = router

/**
 * If in development mode, log 4xx to 5xx responses to console
 */
if (process.env.NODE_ENV === 'development') {
   router.use(
      morgan('dev', {
         skip: (req, res) => res.statusCode < 400,
      })
   )
}

/**
 * Log all requests to access.log - rotates daily at midnight
 */
router.use(
   morgan('common', {
      stream: rfs.createStream(logGenerator('common'), {
         interval: '1d',
         path: path.join(process.cwd(), 'logs', 'common'),
      }),
   })
)

/**
 * Log all reported client errors via the API /error-report route
 */
router.use(
   morgan(':remote-addr [:date]', {
      skip: (req) => !req.path.match(/^(\/api)?\/v\d+\/error-report$/),
      stream: rfs.createStream(logGenerator('error'), {
         interval: '1d',
         path: path.join(process.cwd(), 'logs', 'error'),
      }),
   })
)
