import db from '../database'
import type { Request, Response } from 'express'

export const getProducts = async (req: Request, res: Response) => {
   const query = 'SELECT * FROM products'
   const data = await db.query(query)

   if (data.rowCount === 0) {
      res.status(204)
   } else {
      res.status(200)
   }

   res.json(data.rows)
}

export const getProductById = async (req: Request, res: Response) => {
   const query = 'SELECT * FROM PRODUCTS WHERE id = $1'
   const data = await db.query(query, [req.params.id])

   if (data.rowCount === 0) {
      res.status(204)
   } else {
      res.status(200)
   }

   res.json(data.rows)
}

export default {
   getProducts,
   getProductById
}
