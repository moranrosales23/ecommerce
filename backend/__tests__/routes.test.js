import request from "supertest"
import mongoose from "mongoose"
import app from "../src/app.js"

afterAll(async () => {
  await mongoose.disconnect()
})

describe("/", () => {
  test("GET responds with success code", async () => {
    const response = await request(app).get("/api/products")
    expect(response.statusCode).toBe(200)
  })
})
