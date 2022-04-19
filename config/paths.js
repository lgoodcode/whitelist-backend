const { realpathSync } = require('fs')
const { resolve } = require('path')

const appDirectory = realpathSync(process.cwd())
const resolveApp = (relativePath) => resolve(appDirectory, relativePath)

module.exports = {
   dotenv: resolveApp('.env'),
   appPath: resolveApp('.'),
   appBuild: resolveApp('build'),
   appEntry: resolveApp('src/server.ts'),
   appSrc: resolveApp('src')
}
