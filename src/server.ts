import cluster, { type Worker } from 'cluster'
import os from 'os'
import chalk from 'chalk'
import app from './app'

// Check the number of workers possible with Heroku with fallback to CPU count
const totalWorkers = process.env.WEB_CONCURRENCY || os.cpus().length
const port = process.env.PORT ?? 4000

/**
 * If not the master, then it is a worker and run the server process.
 * Otherwise, if it is the master, then create a worker for each CPU thread
 * and fork.
 */
if (!cluster.isPrimary) {
   app.listen(port, () => {
      console.log(chalk.cyan(`Server started in ${app.get('env')} mode on port ${port}`))
   })
} else {
   for (let i = 0; i < totalWorkers; i++) {
      cluster.fork()
   }

   // Log any workers that disconnect
   cluster.on('disconnect', (worker: Worker) => {
      console.log(
         chalk.yellow(`[CLUSTER] Worker ${worker.id} disconnected from the cluster`)
      )
   })

   // When a worker dies, create a worker to replace it
   cluster.on('exit', (worker: Worker, code: number, signal: string) => {
      console.log(
         chalk.red(
            `[CLUSTER] Worker ${worker.id} died with exit code ${code} (${signal})`
         )
      )
      cluster.fork()
   })
}
