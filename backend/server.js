import express from "express"
import cors from "cors"
import 'dotenv/config'
import { createServer } from 'http'
import { Server } from 'socket.io'
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import appointmentRouter from "./routes/appointment.route.js";
import adminRouter from "./routes/admin.route.js";
import serviceRouter from "./routes/service.route.js";
import userRouter from "./routes/user.route.js";


//  app config
const app = express()
const port = process.env.PORT || 4000

// Allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL
].filter(Boolean); // Remove undefined/null values

console.log("Allowed Origins:", allowedOrigins);

// Create HTTP server
const httpServer = createServer(app)

// Initialize Socket.IO with CORS
export const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
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


//  middlewares
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    console.log("Incoming Request Origin:", origin);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json())

// Api test
app.get("/", (req, res) => {
  res.send("Backend is runing. Allowed Origins: " + JSON.stringify(allowedOrigins));
})

// api endpoints
app.use("/api/appointment", appointmentRouter)
app.use("/api/admin", adminRouter)
app.use("/api/service", serviceRouter)
app.use("/api/user", userRouter)

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
});

// Startup function
const startServer = async () => {
  try {
    await connectDB();
    await connectCloudinary();
    console.log("Database and Cloudinary connected successfully.");

    // Only listen if not running in Vercel environment (Vercel handles the port binding)
    // OR if we want to run locally
    if (process.env.NODE_ENV !== 'production') {
      httpServer.listen(port, () => {
        console.log("Server running on port: " + port)
        console.log("Socket.IO server initialized")
      })
    }
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();

// Export the app for Vercel
export default httpServer;
