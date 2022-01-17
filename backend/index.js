import "dotenv/config"
import mongoose from "mongoose"
import express from "express"
import routes from "./src/routes.js"

mongoose.connect(process.env.MONGO_DB_URI || "mongodb://127.0.0.1:27017/ecommerce")

const PORT = process.env.PORT
const app = express()

app.use("/api", routes)

app.listen(PORT, () => console.log(`Running on port ${PORT} ...`))
