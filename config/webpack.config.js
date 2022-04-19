const chalk = require('chalk')
const TerserPlugin = require('terser-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const NodemonWebpackPlugin = require('nodemon-webpack-plugin')
const paths = require('./paths')

module.exports = (webpackEnv) => {
   const isEnvDevelopment = webpackEnv === 'development'
   const isEnvProduction = webpackEnv === 'production'

   return {
      target: 'node',
      mode: webpackEnv,
      // Stop compilation early in production
      bail: isEnvProduction,
      entry: paths.appEntry,
      watch: isEnvDevelopment,
      output: {
         path: paths.appBuild,
         // The output file is static for development and build since it is
         // a single point of entry for the app
         filename: 'main.js'
      },
      externals: [nodeExternals()],
      optimization: {
         minimize: isEnvProduction,
         minimizer: [new TerserPlugin()]
      },
      resolve: {
         extensions: ['.js', '.ts']
      },
      module: {
         rules: [
            {
               test: /\.ts$/,
               use: 'ts-loader'
            }
         ]
      },
      plugins: [
         new ProgressBarPlugin({
            format: `${chalk.green.bold('building...')} ${chalk.cyan(
               '[:bar]'
            )} [:percent] [:elapsed seconds] - :msg`
         }),
         // Runs nodemon only when watch is enabled
         new NodemonWebpackPlugin({
            watch: paths.appSrc,
            ext: 'js, ts'
         })
      ]
   }
}
