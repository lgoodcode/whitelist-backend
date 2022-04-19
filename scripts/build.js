'use strict'

// Do this as the first thing so that any code reading it knows the right env.
process.env.NODE_ENV = 'production'

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
   throw err
})

// Ensure environment variables are read.
require('../config/env')

const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config/webpack.config')('production')

console.clear()
console.log(chalk.yellow('Creating an optimized production build...\n'))

webpack(config, (err, stats) => {
   if (err) {
      console.error(err.stack || err)

      if (err.details) {
         console.error(err.details)
      }
      return
   }

   const info = stats.toJson()

   if (stats.hasErrors()) {
      console.error(info.errors)
      process.exit()
   }

   if (stats.hasWarnings()) {
      console.warn(info.warnings)
   }

   ;['SIGINT', 'SIGTERM'].forEach((sig) => {
      process.on(sig, function () {
         process.exit()
      })
   })
})
