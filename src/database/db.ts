import { Pool } from 'pg'

if (!process.env.DATABASE_URI) {
   throw new Error('No database URI provided')
}

const pool = new Pool({
   connectionString: process.env.DATABASE_URI,
   /**
    * Require SSL connection but allow no SSL only when in development or test mode.
    * https://stackoverflow.com/questions/25000183/node-js-postgresql-error-no-pg-hba-conf-entry-for-host
    */
   ssl:
      process.env.NODE_ENV === 'development'
         ? false
         : {
              rejectUnauthorized: false
           }
})

// The pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err: Error) => {
   console.error('Unexpected error on idle client', err)
   process.exit(-1)
})

function query(statement: string, params?: string[]) {
   return !params ? pool.query(statement) : pool.query(statement, params)
}

export default {
   query
}
