const paths = require('./paths')

const isEnvDevelopment = process.env.NODE_ENV === 'development'
const dotenvFilePath = `${paths.dotenv}.${
   isEnvDevelopment ? 'development' : 'production'
}`

require('dotenv').config({ path: dotenvFilePath })
