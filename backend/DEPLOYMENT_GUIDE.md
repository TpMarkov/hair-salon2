# Deployment Guide for Vercel

## Issues Fixed

1. **Serverless Function Export**: Changed from exporting `httpServer` to exporting Express `app` (required by Vercel)
2. **Lazy Database Connection**: MongoDB connection now happens per-request instead of at startup (prevents timeout)
3. **CORS Configuration**: Added proper CORS handling with frontend URL support
4. **Error Handling**: Improved error handling for serverless environment

## Required Environment Variables

Set these in your Vercel project settings (Project → Settings → Environment Variables):

### Backend Environment Variables:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net
JWT_SECRET=your-secret-key-for-jwt-tokens (REQUIRED)
FRONTEND_URL=https://hair-salon2-frontend.vercel.app
ADMIN_URL=https://your-admin-url.vercel.app (if you have one)
CLOUDINARY_NAME=your-cloudinary-name (optional - only needed for image uploads)
CLOUDINARY_API_KEY=your-api-key (optional)
CLOUDINARY_SECRET_KEY=your-secret-key (optional)
ADMIN_EMAIL=your-admin-email (optional - for admin authentication)
ADMIN_PASSWORD=your-admin-password (optional - for admin authentication)
NODE_ENV=production
```

**Critical Variables (Required):**
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for signing JWT tokens (use a strong random string)

**Optional Variables:**
- Cloudinary variables - Only needed if you use image upload features
- Admin credentials - Only needed for admin authentication

### Frontend Environment Variables:
```
VITE_BACKEND_URL=https://hair-salon-backend-beta.vercel.app
```
**Important**: Make sure `VITE_BACKEND_URL` does NOT end with a trailing slash (`/`)

### Admin Environment Variables:
```
VITE_BACKEND_URL=https://hair-salon-backend-beta.vercel.app
```

## MongoDB Atlas Configuration

### IP Whitelist Setup

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Navigate to your cluster → Network Access
3. Click "Add IP Address"
4. Add `0.0.0.0/0` to allow access from anywhere (required for Vercel serverless functions)
   - **Note**: This is safe because MongoDB requires authentication
   - Vercel serverless functions don't have static IPs

### Alternative: Database User Permissions

Make sure your database user has proper permissions:
- At minimum: `readWrite` permissions on your database

## Testing the Deployment

### 1. Test Backend Health Check
```bash
curl https://hair-salon-backend-beta.vercel.app/
```

Should return:
```json
{
  "success": true,
  "message": "Backend is running",
  "allowedOrigins": [...],
  "dbStatus": "connected" or "disconnected"
}
```

### 2. Test Database Connection
```bash
curl https://hair-salon-backend-beta.vercel.app/api/health
```

### 3. Test API Endpoint
```bash
curl https://hair-salon-backend-beta.vercel.app/api/service/list
```

## Common Issues and Solutions

### Issue: "Could not connect to any servers in your MongoDB Atlas cluster"
**Solution**: 
- Verify IP whitelist includes `0.0.0.0/0`
- Check `MONGODB_URI` environment variable is set correctly
- Ensure database user credentials are correct
- Make sure your MongoDB connection string format is correct: `mongodb+srv://username:password@cluster.mongodb.net`
- Verify you're not blocking the connection with firewall rules

### Issue: "Operation buffering timed out after 10000ms"
**Solution**:
- This means MongoDB connection is failing - check the above solutions
- Verify `MONGODB_URI` is correctly set in Vercel environment variables
- Check MongoDB Atlas Network Access allows `0.0.0.0/0`
- Verify database user has proper permissions
- Check Vercel function logs for specific MongoDB connection errors

### Issue: CORS errors
**Solution**:
- Verify `FRONTEND_URL` matches your actual frontend URL exactly
- Check that the frontend URL doesn't have trailing slashes
- Verify `VITE_BACKEND_URL` doesn't have trailing slashes

### Issue: Double slash in URLs (`//api/...`)
**Solution**:
- Ensure `VITE_BACKEND_URL` does NOT end with `/`
- It should be: `https://hair-salon-backend-beta.vercel.app` (no trailing slash)
- NOT: `https://hair-salon-backend-beta.vercel.app/` (has trailing slash)

### Issue: Function timeout
**Solution**:
- Database connections are now lazy (per-request)
- First request may be slower (cold start + DB connection)
- Subsequent requests should be faster

## Deployment Steps

1. **Backend Deployment**:
   ```bash
   cd backend
   vercel --prod
   ```

2. **Set Environment Variables in Vercel Dashboard**

3. **Configure MongoDB Atlas IP Whitelist**

4. **Deploy Frontend**:
   ```bash
   cd frontend
   vercel --prod
   ```

5. **Set Frontend Environment Variables**

6. **Test the deployment**

## Notes

- Socket.IO will NOT work in serverless mode (it requires persistent connections)
- The backend will automatically detect serverless environment and handle connections accordingly
- Local development still works with full Socket.IO support

