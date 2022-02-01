const chalk = require('chalk')
const TerserPlugin = require('terser-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const NodemonWebpackPlugin = require('nodemon-webpack-plugin')
const paths = require('./paths')
const { appendFile } = require('fs')

module.exports = (webpackeEnv) => {
   const isEnvDevelopment = webpackeEnv === 'development'
   const isEnvProduction = webpackeEnv === 'production'

   return {
      target: 'node',
      mode: webpackeEnv,
      entry: paths.appEntry,
      watch: isEnvDevelopment,
      output: {
         path: paths.appBuild,
         filename: 'index.js'
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
