import express from 'express'
import products from './controllers/products'
const router = express.Router()

export default router
   .get('/products', products.getProducts)
   .get('/products/:id', products.getProductById)
