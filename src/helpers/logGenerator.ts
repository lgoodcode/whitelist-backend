import path from 'path'
import { existsSync, mkdirSync } from 'fs'

/**
 *  Pads the month and day values so that they are a fixed length
 *
 *  @param {Integer} num - The value
 *  @returns {Integer} New value i.e. 1 -> 01, 11-> 11
 */
const pad = (num: number) => (num > 9 ? '' : '0') + num

/**
 *  Creates the time part of the directory for logging
 *
 *  @returns {String}
 */
function timeDirString() {
   const time = new Date()
   const year = time.getFullYear()
   const month = pad(time.getMonth() + 1)
   const day = pad(time.getDate())

   return `${year}_${month}/${year}_${month}_${day}`
}

/**
 *  Creates the path for the year_month of the log directory
 *
 *  @param {String} dirName The directory name to get for logs
 */
function getLogDir(dirName: string) {
   const time = new Date()
   const year = time.getFullYear()
   const month = pad(time.getMonth() + 1)

   return path.join(process.cwd(), 'logs', dirName, `${year}_${month}`)
}

/**
 *  Creates the filename for the log in the proper format with the name given.
 *
 *  @param {String} logName - The name of the log directory i.e. "access_logs"
 *  @return {String} The filename with year_month_day format
 */
function logGenerator(logName: string): string {
   const dir = getLogDir(logName)

   if (!existsSync(dir)) {
      console.log(`Creating ${dir} log directory...`)
      mkdirSync(dir)
   }
   return `${timeDirString()}-${logName.split('_')[0]}.log`
}

export default logGenerator
