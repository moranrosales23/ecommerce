import 'dotenv/config'
import express from 'express'

const PORT = process.env.PORT
const app = express()

app.listen(PORT, () => console.log(`Running on port ${PORT} ...`))