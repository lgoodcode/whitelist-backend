const { Pool } = require('pg')

// const pool = new Pool({
//    user: process.env.PGUSER,
//    password: process.env.PGPASSWORD,
//    database: process.env.PGDATABASE,
//    port: process.env.PGPORT,
//    host: process.env.PGHOST,
//    ssl: process.env.PGSSL,
// })

const pool = new Pool({
   connectionString: process.env.PG_CONNECTION,
   ssl: {
      rejectUnauthorized: false,
   },
})

const getProducts = (req, res) => {
   pool.query('SELECT * FROM products', (err, data) => {
      if (err) {
         console.error(err)
         res.status(400).json({ error: err })
      }
      res.json(data.rows)
   })
}

const getProductById = () => null

module.exports = {
   getProducts,
   getProductById,
}
