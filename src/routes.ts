import express from 'express'
import { getProducts, getProductById } from './controllers/products'
const router = express.Router()

export default router.get('/products', getProducts).get('/products/:id', getProductById)
