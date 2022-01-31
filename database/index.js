const { Pool } = require('pg')

const SSL =
   process.env.NODE_ENV === 'development'
      ? false
      : {
           rejectUnauthorized: false,
        }

const pool = new Pool({
   connectionString: process.env.PG_CONNECTION,
   /**
    * Require SSL connection but allow unauthorized certificates. This is because we are
    * using self-signed certs which aren't validated by a CA.
    * https://stackoverflow.com/questions/25000183/node-js-postgresql-error-no-pg-hba-conf-entry-for-host
    */
   ssl: SSL,
})

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err) => {
   console.error('Unexpected error on idle client', err)
   process.exit(-1)
})

module.exports = {
   query: (text, params, callback) => pool.query(text, params, callback),
}
