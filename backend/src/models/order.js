import mongoose from "mongoose"

const schema = new mongoose.Schema({
  date: { type: Date, default: () => new Date() },
  status: { type: String, enum: ["created", "payed", "cancelled", "delivered"], default: "created" },
  products: [
    {
      name: String,
      description: String,
      image: String,
      price: Number,
    },
  ],
})

export default mongoose.model("Order", schema)
