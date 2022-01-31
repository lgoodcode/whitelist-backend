const router = require('express').Router()
const database = require('./controllers/database')

module.exports = router

router.get('/products', database.getProducts)

router.get('/products/:id', database.getProductById)
