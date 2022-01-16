import express from 'express'
import Product from './models/product.js'

const router = express.Router()

router.get('/products', async (req, res, next) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (e) {
    next(e)
  }
})

export default router