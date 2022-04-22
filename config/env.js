'use strict'

const paths = require('./paths')
const NODE_ENV = process.env.NODE_ENV

if (!NODE_ENV) {
   throw new Error('The NODE_ENV environment variable is required but was not specified.')
}

// We include the `.env.devlopment.local` file for to hold secret such as
// the database URI connection and SendGrid API key which we don't want to
// include in the repository
const dotEnvFiles = [
   // Include general .env files
   `${paths.dotenv}`,
   `${paths.dotenv}.${NODE_ENV}.local`,
   // Don't include `.env.local` for `test` environmentgit 
   // since normally you expect tests to produce the same
   // results for everyone
   NODE_ENV !== 'test' && `${paths.dotenv}.local`,
   // Include local development environment files for secrets for dev or tests
   NODE_ENV.match(/development|test/) && `${paths.dotenv}.development.local`,
   `${paths.dotenv}.${NODE_ENV}`
].filter(Boolean)

// Loads the environment variables
dotEnvFiles.forEach((dotEnvFile) => {
   require('dotenv').config({ path: dotEnvFile })
})
