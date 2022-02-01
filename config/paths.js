const fs = require('fs')
const { resolve } = require('path')
const path = require('path')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

module.exports = {
   dotenv: resolveApp('.env'),
   appPath: resolveApp('.'),
   appBuild: resolveApp('build'),
   appEntry: resolveApp('src/server.ts'),
   appSrc: resolveApp('src')
}
