import express from "express"
import mongoose from "mongoose"
import Product from "./models/product.js"
import Order from "./models/order.js"
import mercadopago from "mercadopago/lib/mercadopago.js"

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

router.post("/d", async (req, res, next) => {
  const customer_data = { email: "pedro@nosale.com" }

  mercadopago.customers.create(customer_data).then(function (customer) {
    const card_data = {
      token: "9b2d63e00d66a8c721607214cedaecdf",
      customer_id: customer.id,
      issuer_id: "23",
      payment_method_id: "debit_card",
    }

    mercadopago.card.create(card_data).then(function (card) {
      console.log(card)
    })
  })
})

router.post("/orders", async (req, res) => {
  mercadopago.configurations.setAccessToken("TEST-4213422417295532-030301-6c727a7d29c35f372656f64b610ab2f3-134712429")

  /*const customer_data = { email: "ddsfffgd@asdc.opcm" }
  console.log(customer_data)

  mercadopago.customers.create(customer_data).then(function (customer) {
    console.log(customer)
    const card_data = {
      token: req.body.token,
      customer_id: customer.body.id,
      issuer_id: req.body.issuer_id,
      payment_method_id: req.body.payment_method_id,
    }
    console.log(card_data)
    mercadopago.card.create(card_data).then(function (card) {
      console.log(card)
    })
  })
*/
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
      res.json({ ...order, mercado: { status, status_detail, id } })
      //res.status(response.status).json({ status, status_detail, id })
    })
    .catch(function (error) {
      console.error(error)
    })

  //https://www.mercadopago.com.ar/developers/es/guides/online-payments/checkout-api/advanced-integration#editor_2
  //https://www.mercadopago.com.pe/developers/es/guides/online-payments/checkout-api/handling-responses
})

export default router
