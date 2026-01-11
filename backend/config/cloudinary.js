import {v2 as cloudinary} from 'cloudinary'

// Cloudinary config is synchronous - no need for async
let cloudinaryConfigured = false

const connectCloudinary = () => {
  if (cloudinaryConfigured) {
    return
  }

  // Validate required environment variables
  const cloudName = process.env.CLOUDINARY_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_SECRET_KEY

  if (!cloudName || !apiKey || !apiSecret) {
    console.warn("Cloudinary environment variables missing. Cloudinary features will not work.")
    console.warn("Required: CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_SECRET_KEY")
    return // Don't throw - allow server to start without Cloudinary for non-image routes
  }

  try {
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret
    })

    cloudinaryConfigured = true
    console.log("Cloudinary configured successfully")
  } catch (error) {
    console.error("Cloudinary configuration error:", error)
    // Don't throw - allow server to start
  }
}

export default connectCloudinary