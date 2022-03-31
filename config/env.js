'use strict'

const paths = require('./paths')
const NODE_ENV = process.env.NODE_ENV

if (!NODE_ENV) {
   throw new Error('The NODE_ENV environment variable is required but was not specified.')
}

const isEnvDevelopment = process.env.NODE_ENV === 'development'

// Used to load the local dotenv file while also loading the dev or prod 
// dotenv file
const dotEnvFiles = [
   !isEnvDevelopment ? `${paths.dotenv}.local` : null,
   `${paths.dotenv}.${
      isEnvDevelopment ? 'development' : 'production'
   }`
].filter(Boolean)

// Loads the environment variables
dotEnvFiles.forEach((dotEnvFile) => {
   require('dotenv').config({ path: dotEnvFile })
})
