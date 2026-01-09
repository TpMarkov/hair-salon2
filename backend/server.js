import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

//  app config
const app = express()
const port = process.env.PORT || 3000
connectDB()
connectCloudinary()

//  middlewares
app.use(express.json())
app.use(cors())

// Api test
app.get("/", (req, res) => {
  res.send("Some changes")
})


app.listen(port, () => {
  console.log("Server running on port: " + port)
})
