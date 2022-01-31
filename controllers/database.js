const db = require('../database')

const getProducts = (req, res) => {
   const query = 'SELECT * FROM products'

   db.query(query, (err, data) => {
      if (err) {
         console.error(err)
         res.status(400).json({ error: err })
      }
      res.json(data.rows)
   })
}

const getProductById = (req, res) => {
   const query = 'SELECT * FROM PRODUCTS WHERE id = $1'

   db.query(query, [req.params.id], (err, data) => {
      if (err) throw err
      res.json(data.rows)
   })
}

module.exports = {
   getProducts,
   getProductById,
}
