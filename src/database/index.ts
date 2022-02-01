import { Pool, QueryResult } from 'pg'

const SSL =
   process.env.NODE_ENV === 'development'
      ? false
      : {
           rejectUnauthorized: false
        }

const pool = new Pool({
   connectionString: process.env.PG_CONNECTION,
   /**
    * Require SSL connection but allow unauthorized certificates. This is because we are
    * using self-signed certs which aren't validated by a CA.
    * https://stackoverflow.com/questions/25000183/node-js-postgresql-error-no-pg-hba-conf-entry-for-host
    */
   ssl: SSL
})

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err: Error) => {
   console.error('Unexpected error on idle client', err)
   process.exit(-1)
})

function query(
   queryStr: string,
   params: string[],
   callback: (err: Error, result: QueryResult) => void
): void {
   if (!params && callback) {
      pool.query(queryStr, callback)
   } else {
      pool.query(queryStr, params, callback)
   }
}

export default {
   query
}