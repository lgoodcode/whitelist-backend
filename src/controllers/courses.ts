import db from '../database'
import type { Request, Response } from 'express'

export const getCourses = async (req: Request, res: Response) => {
   const query = 'SELECT * FROM courses'
   const data = await db.query(query)

   if (data.rowCount === 0) {
      res.status(204)
   } else {
      res.status(200)
   }

   res.json(data.rows)
}

export const getCourseById = async (req: Request, res: Response) => {
   const query = 'SELECT * FROM COURSES WHERE id = $1'
   const data = await db.query(query, [req.params.id])

   if (data.rowCount === 0) {
      res.status(204)
   } else {
      res.status(200)
   }

   res.json(data.rows)
}

export default {
   getCourses,
   getCourseById
}
