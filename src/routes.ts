import express, { Request, Response, NextFunction } from 'express'
import sendEmail from './controllers/email'
import { getProducts, getProductById } from './controllers/products'
const router = express.Router()

export default router
   .post('/contact', sendEmail)
   .get('/products', getProducts)
   .get('/products/:id', getProductById)
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   .use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error(err)
      res.status(403).send(err.message)
   })
