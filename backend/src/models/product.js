import mongoose from "mongoose"

const schema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  price: Number,
})

export default mongoose.model("Product", schema)
