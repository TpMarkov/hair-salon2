# Troubleshooting FUNCTION_INVOCATION_FAILED

## Quick Fix: Express 5 Compatibility Issue

If you're using Express 5, Vercel might not fully support it yet. **Downgrade to Express 4:**

```bash
cd backend
npm install express@^4.18.2
```

Express 4 is stable and well-supported by Vercel.

## Changes Made

1. **Socket.IO made lazy**: No longer imported at module level - only initialized when needed
2. **Better error handling**: All initialization wrapped in try-catch
3. **Serverless detection**: Proper detection and handling of serverless environment

## Debugging Steps

1. **Check Vercel Logs**:
   - Go to Vercel Dashboard → Your Project → Logs
   - Look for the exact error message

2. **Verify Environment Variables**:
   - `MONGODB_URI` - Required
   - `JWT_SECRET` - Required
   - `FRONTEND_URL` - Optional but recommended
   - `CLOUDINARY_*` - Optional (only if using image uploads)

3. **Test Health Endpoint**:
   ```bash
   curl https://your-backend.vercel.app/
   ```

4. **Check Build Logs**:
   - Look for any errors during `npm install` or build process

## Common Issues

### Issue: Express 5 Compatibility
**Solution**: Downgrade to Express 4 (see above)

### Issue: Missing Environment Variables
**Solution**: Set all required variables in Vercel Dashboard

### Issue: Route Import Failures
**Solution**: Check that all route files export correctly

### Issue: MongoDB Connection
**Solution**: 
- Verify `MONGODB_URI` is set
- Whitelist `0.0.0.0/0` in MongoDB Atlas
- Connection is lazy (per-request) so shouldn't block function export

