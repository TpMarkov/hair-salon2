import express from "express"
import cors from "cors"
import 'dotenv/config'
import {createServer} from 'http'
import {Server} from 'socket.io'
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import appointmentRouter from "./routes/appointment.route.js";
import adminRouter from "./routes/admin.route.js";
import serviceRouter from "./routes/service.route.js";
import userRouter from "./routes/user.route.js";


//  app config
const app = express()
const port = process.env.PORT || 4000
app.options("*", cors());

// Create HTTP server
const httpServer = createServer(app)

// Initialize Socket.IO with CORS
export const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"], // frontend and admin URLs
    methods: ["GET", "POST"],
    credentials: true
  }
})

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id)

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id)
  })
})

connectDB()
connectCloudinary()
console.log("Cloudinary connected successfully.")

//  middlewares
app.use(cors({
  origin: "https://hair-salon2-ebon.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.use(express.json())

// Api test
app.get("/", (req, res) => {
  res.send("Some changes")
})

// api endpoints
app.use("/api/appointment", appointmentRouter)
app.use("/api/admin", adminRouter)
app.use("/api/service", serviceRouter)
app.use("/api/user", userRouter)


httpServer.listen(port, () => {
  console.log("Server running on port: " + port)
  console.log("Socket.IO server initialized")
})
