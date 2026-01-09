import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import appointmentRouter from "./routes/appointment.route.js";
import adminRouter from "./routes/admin.route.js";


//  app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()
console.log("Cloudinary connected successfully.")

//  middlewares
app.use(express.json())
app.use(cors())

// Api test
app.get("/", (req, res) => {
  res.send("Some changes")
})

// api endpoints
app.use("/api/appointment", appointmentRouter)
app.use("/api/admin", adminRouter)



app.listen(port, () => {
  console.log("Server running on port: " + port)
})
