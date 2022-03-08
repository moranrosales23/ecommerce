import express from "express"
import mongoose from "mongoose"
import Product from "./models/product.js"
import Order from "./models/order.js"
import mercadopago from "mercadopago/lib/mercadopago.js"
import validateError from "./util.js"

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
  mercadopago.configurations.setAccessToken(process.env.ACCESS_TOKEN)
  mercadopago.payment
    .save(req.body)
    .then(async function (response) {
      const { status, status_detail, id } = response.body
      const { additional_info } = req.body
      const products = additional_info.items
      for (let i = 0; i < products.length; i++) {
        const product = await Product.findById(new mongoose.Types.ObjectId(products[i].id)).lean()
        products[i] = product
      }
      const order = await Order.create({ products })
      res.status(response.status).json({ status, status_detail, id })
    })
    .catch(function (error) {
      const { errorMessage, errorStatus } = validateError(error)
      res.status(errorStatus).json({ error: errorMessage })
    })
})

export default router
