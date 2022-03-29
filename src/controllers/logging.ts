import express from 'express'
import morgan from 'morgan'
import path from 'path'
import { existsSync, mkdirSync } from 'fs'
import logger from '../helpers/logGenerator'
import type { Request, Response } from 'express'
// Doesn't support ES module import
// eslint-disable-next-line @typescript-eslint/no-var-requires
const rfs = require('rotating-file-stream')
const router = express.Router()

console.log('Checking logs directories...')

// Create logs directories
if (!existsSync('logs')) {
   console.log('Creating "logs" directory...')
   mkdirSync('logs')
}

if (!existsSync(path.join('logs', 'common'))) {
   console.log('Creating "common" logs directory...')
   mkdirSync(path.join('logs', 'common'))
}

if (!existsSync(path.join('logs', 'error'))) {
   console.log('Creating "error" logs directory...')
   mkdirSync(path.join('logs', 'error'))
}

/**
 * If in development mode, log 4xx to 5xx responses to console
 */
if (process.env.NODE_ENV === 'development') {
   router.use(
      morgan('dev', {
         skip: (req: Request, res: Response) => res.statusCode < 400
      })
   )
}

/**
 * Log all requests to access.log - rotates daily at midnight
 */
router.use(
   morgan('common', {
      stream: rfs.createStream(logger('common'), {
         interval: '1d',
         path: path.join(process.cwd(), 'logs', 'common')
      })
   })
)

/**
 * Log all reported client errors via the API /error-report route
 */
router.use(
   morgan(':remote-addr [:date]', {
      skip: (req: Request) => !req.path.match(/^(\/api)?\/v\d+\/error-report$/),
      stream: rfs.createStream(logger('error'), {
         interval: '1d',
         path: path.join(process.cwd(), 'logs', 'error')
      })
   })
)

export default router
