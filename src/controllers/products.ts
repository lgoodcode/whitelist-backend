import db from '../database'
import type { Request, Response } from 'express'

export const getProducts = (req: Request, res: Response) => {
   const query = 'SELECT * FROM products'

   db.query(query, [], (err, data) => {
      if (err) {
         console.error(err)
         res.status(400).json({ error: err })
      }
      res.json(data.rows)
   })
}

export const getProductById = (req: Request, res: Response) => {
   const query = 'SELECT * FROM PRODUCTS WHERE id = $1'

   db.query(query, [req.params.id], (err, data) => {
      if (err) throw err
      res.json(data.rows)
   })
}

export default {
   getProducts,
   getProductById
}
