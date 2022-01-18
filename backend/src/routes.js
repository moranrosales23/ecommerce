import express from "express"
import mongoose from "mongoose"
import Product from "./models/product.js"
import Order from "./models/order.js"

const router = express.Router()

router.get("/products", async (req, res, next) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (e) {
    next(e)
  }
})

router.post("/products", async (req, res, next) => {
  try {
    const { name, description, price, image } = req.body
    const product = await Product.create({ name, description, price, image })
    res.json(product)
  } catch (e) {
    next(e)
  }
})

router.post("/orders", async (req, res) => {
  const { products } = req.body
  for (let i = 0; i < products.length; i++) {
    const product = await Product.findOne(new mongoose.Types.ObjectId(products[i])).lean()
    products[i] = product
  }
  const order = await Order.create({ products })
  res.json(order)
})

export default router
