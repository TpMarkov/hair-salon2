import express from "express"
import cors from "cors"
import 'dotenv/config'
import mongoose from "mongoose"
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import appointmentRouter from "./routes/appointment.route.js";
import adminRouter from "./routes/admin.route.js";
import serviceRouter from "./routes/service.route.js";
import userRouter from "./routes/user.route.js";

// Check if running in serverless environment (Vercel)
const isServerless = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME

//  app config
const app = express()
const port = process.env.PORT || 4000

// Allowed origins - include frontend and admin URLs
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL,
  "https://hair-salon2-frontend.vercel.app", // Hardcoded for now, ideally use env var
].filter(Boolean); // Remove undefined/null values

console.log("Allowed Origins:", allowedOrigins);

// Socket.IO - initialize lazily only in local development (serverless doesn't support WebSockets)
let io = null
let httpServer = null

// Lazy Socket.IO initialization function
const initSocketIO = async () => {
  if (isServerless || io !== null) return io
  
  try {
    const { createServer } = await import('http')
    const { Server } = await import('socket.io')
    
    httpServer = createServer(app)
    io = new Server(httpServer, {
      cors: {
        origin: allowedOrigins,
        methods: ["GET", "POST"],
        credentials: true
      }
    })

    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id)
      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id)
      })
    })
    
    console.log("Socket.IO initialized")
    return io
  } catch (error) {
    console.warn("Socket.IO initialization skipped:", error.message)
    return null
  }
}

export { io }

// Connection state for serverless
let dbConnected = false
let isConnecting = false

// Lazy database connection middleware for serverless
const ensureDBConnection = async (req, res, next) => {
  // If already connected, proceed
  if (mongoose.connection.readyState === 1) {
    dbConnected = true
    return next()
  }

  // If connection is in progress, wait for it (with timeout)
  if (isConnecting) {
    const maxWait = 10000 // 10 seconds max wait
    const startTime = Date.now()
    await new Promise((resolve) => {
      const checkConnection = () => {
        if (mongoose.connection.readyState === 1) {
          dbConnected = true
          resolve()
        } else if (Date.now() - startTime > maxWait) {
          resolve() // Timeout - proceed anyway, connection will retry
        } else {
          setTimeout(checkConnection, 100)
        }
      }
      checkConnection()
    })
    return next()
  }

  // Start connection
  isConnecting = true
  try {
    await connectDB()
    connectCloudinary() // Synchronous config
    dbConnected = true
    isConnecting = false
    next()
  } catch (error) {
    isConnecting = false
    console.error("Database connection failed:", error)
    // Don't block - let the route handler deal with it
    // Some routes might work without DB (health check, etc.)
    next()
  }
}

//  middlewares
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, Postman, or server-to-server)
    if (!origin) return callback(null, true);

    console.log("Incoming Request Origin:", origin);
    
    // Check if origin is in allowed list
    const isAllowed = allowedOrigins.some(allowed => {
      return origin === allowed || origin.startsWith(allowed);
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin, "Allowed origins:", allowedOrigins);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token']
}));

app.use(express.json())

// Health check endpoint (no DB required)
app.get("/", (req, res) => {
  res.json({ 
    success: true,
    message: "Backend is running",
    allowedOrigins: allowedOrigins,
    dbStatus: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
  });
})

// Health check for Vercel
app.get("/api/health", (req, res) => {
  res.json({ 
    success: true,
    status: "healthy",
    timestamp: new Date().toISOString()
  });
})

// Ensure DB connection for API routes (serverless-safe)
// Express 5 requires different pattern syntax - use regex or proper parameter
if (isServerless) {
  app.use(/^\/api\//, ensureDBConnection)
}

// api endpoints
app.use("/api/appointment", appointmentRouter)
app.use("/api/admin", adminRouter)
app.use("/api/service", serviceRouter)
app.use("/api/user", userRouter)

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err.stack);
  res.status(err.status || 500).json({ 
    success: false, 
    message: "Internal Server Error", 
    error: process.env.NODE_ENV === 'production' ? "Something went wrong" : err.message 
  });
});

// Validate critical environment variables
const validateEnv = () => {
  const required = ['MONGODB_URI', 'JWT_SECRET']
  const missing = required.filter(key => !process.env[key])
  
  if (missing.length > 0) {
    console.error("Missing required environment variables:", missing.join(', '))
    console.error("Server may not function correctly without these variables")
    // Don't throw in serverless - let it fail gracefully on first request
    if (!isServerless) {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
    }
  }
}

// Startup function (only for local development)
const startServer = async () => {
  try {
    // Validate environment variables
    validateEnv()
    
    if (isServerless) {
      console.log("Running in serverless mode - database connections will be handled per-request")
      connectCloudinary() // Initialize Cloudinary (synchronous, fails gracefully)
      return
    }

    // Local development: connect immediately
    await connectDB();
    connectCloudinary();
    console.log("Database and Cloudinary connected successfully.");

    // Initialize Socket.IO for local development
    await initSocketIO()
    
    if (httpServer) {
      httpServer.listen(port, () => {
        console.log("Server running on port: " + port)
      })
    }
  } catch (error) {
    console.error("Failed to start server:", error);
    // In serverless, don't exit - let Vercel handle it
    // In local dev, exit to surface the error
    if (!isServerless && process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
  }
}

// Only call startServer if not in serverless, or wrap it properly
if (!isServerless) {
  startServer();
} else {
  // In serverless, just initialize Cloudinary (synchronous, safe)
  try {
    validateEnv()
    connectCloudinary()
    console.log("Serverless function initialized")
  } catch (error) {
    console.error("Serverless initialization error:", error)
    // Don't throw - let the function export anyway
  }
}

// Export the Express app for Vercel (REQUIRED - Vercel expects the Express app, not HTTP server)
export default app;
