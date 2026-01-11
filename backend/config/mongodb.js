import mongoose from "mongoose"

// Connection state tracking
let isConnecting = false

const connectDB = async () => {
  // If already connected, return immediately
  if (mongoose.connection.readyState === 1) {
    console.log("MongoDB already connected")
    return
  }

  // If connection is in progress, wait for it
  if (isConnecting) {
    await new Promise((resolve) => {
      const checkConnection = () => {
        if (mongoose.connection.readyState === 1) {
          resolve()
        } else {
          setTimeout(checkConnection, 100)
        }
      }
      checkConnection()
    })
    return
  }

  // Start new connection
  isConnecting = true
  try {
    // Validate MongoDB URI is present
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI environment variable is not set")
    }

    // Set up connection event handlers (only once)
    if (!mongoose.connection.listeners('connected').length) {
      mongoose.connection.on("connected", () => {
        console.log("MongoDB connected successfully")
        isConnecting = false
      })

      mongoose.connection.on("error", (err) => {
        console.error("MongoDB connection error:", err)
        isConnecting = false
      })

      mongoose.connection.on("disconnected", () => {
        console.log("MongoDB disconnected")
        isConnecting = false
      })
    }

    // Connection options optimized for serverless
    const options = {
      serverSelectionTimeoutMS: 30000, // Increased to 30s for serverless (network latency)
      connectTimeoutMS: 30000, // Connection timeout
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
      maxPoolSize: 1, // Maintain up to 1 socket connection for serverless
      minPoolSize: 0, // Allow 0 connections when idle (better for serverless)
      retryWrites: true,
      w: 'majority',
      // Buffer commands until connection is established
      bufferCommands: true,
      bufferMaxEntries: 0 // Disable mongoose buffering - throw errors immediately
    }

    await mongoose.connect(`${process.env.MONGODB_URI}/hair-salon`, options)
    console.log("MongoDB connection established")
  } catch (error) {
    isConnecting = false
    console.error("MongoDB connection error:", error)
    // Re-throw so callers can handle it
    throw error
  }
}

export default connectDB