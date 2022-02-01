'use strict'

const paths = require('./paths')
const NODE_ENV = process.env.NODE_ENV

if (!NODE_ENV) {
   throw new Error('The NODE_ENV environment variable is required but was not specified.')
}

// Determine whether to read the development or production .env files
const isEnvDevelopment = process.env.NODE_ENV === 'development'
const dotenvFilePath = `${paths.dotenv}.${
   isEnvDevelopment ? 'development' : 'production'
}`

// Loads the environment variables
require('dotenv').config({ path: dotenvFilePath })
