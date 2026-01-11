# MongoDB Connection Troubleshooting

## Error: "Operation buffering timed out after 10000ms"

This error means your MongoDB connection is failing. The query is waiting for a connection that never establishes.

## Step-by-Step Fix

### 1. Check MongoDB Atlas IP Whitelist

**CRITICAL**: Vercel serverless functions don't have static IPs, so you MUST allow all IPs.

1. Go to [MongoDB Atlas Dashboard](https://cloud.mongodb.com/)
2. Click **Network Access** in the left sidebar
3. Click **"Add IP Address"**
4. Click **"Allow Access from Anywhere"** button (this adds `0.0.0.0/0`)
   - OR manually enter: `0.0.0.0/0`
5. Click **Confirm**
6. Wait 1-2 minutes for changes to propagate

**Security Note**: This is safe because:
- Your connection string includes authentication (username/password)
- Only authenticated users can access your database
- The IP whitelist is just an extra layer of security

### 2. Verify Environment Variable in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your backend project
3. Go to **Settings** → **Environment Variables**
4. Check that `MONGODB_URI` is set correctly
5. Format should be: `mongodb+srv://username:password@cluster.mongodb.net`
6. Make sure:
   - Username and password are URL-encoded (special chars like `@`, `:`, `/` should be encoded)
   - No spaces or extra characters
   - Includes the full cluster URL

**To encode special characters:**
- `@` becomes `%40`
- `:` becomes `%3A`
- `/` becomes `%2F`
- `#` becomes `%23`

### 3. Verify Database User Permissions

1. In MongoDB Atlas, go to **Database Access**
2. Find your database user
3. Ensure the user has at least **Read and write to any database** permissions
   - OR grant access to specific database: `hair-salon`

### 4. Test Connection String

You can test your connection string locally:

```bash
# Install MongoDB shell (mongosh) if needed
npm install -g mongosh

# Test connection
mongosh "your-connection-string-here/hair-salon"
```

If this works locally but not on Vercel, the issue is likely the IP whitelist.

### 5. Check Vercel Function Logs

1. Go to Vercel Dashboard → Your Project
2. Click **Deployments** tab
3. Click on the latest deployment
4. Click **Functions** tab
5. Click on any function execution
6. Look for MongoDB connection errors

Common error messages:
- `MongooseServerSelectionError: Could not connect to any servers` → IP whitelist issue
- `Authentication failed` → Wrong username/password
- `ENOTFOUND` → Wrong cluster URL
- `ETIMEDOUT` → Network/firewall blocking connection

### 6. Verify Connection String Format

Your `MONGODB_URI` should look like:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net
```

NOT:
- `mongodb://...` (older format, might not work with Atlas)
- Missing `@` symbol
- Wrong cluster name

## Quick Checklist

- [ ] MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- [ ] `MONGODB_URI` environment variable is set in Vercel
- [ ] Connection string format is correct (`mongodb+srv://...`)
- [ ] Username and password are correct (URL-encoded if needed)
- [ ] Database user has proper permissions
- [ ] Waited 1-2 minutes after changing IP whitelist
- [ ] Checked Vercel function logs for specific errors

## Still Not Working?

1. **Redeploy after changes**: After fixing IP whitelist or env vars, trigger a new deployment
2. **Check MongoDB Atlas Status**: Make sure your cluster is running (not paused)
3. **Verify Cluster Type**: Free tier clusters might have connection limits
4. **Contact Support**: If all else fails, check MongoDB Atlas logs or contact support

## Testing the Fix

Once fixed, test your API endpoint:

```bash
curl https://hair-salon-backend-beta.vercel.app/api/service/list
```

Should return:
```json
{
  "success": true,
  "services": [...]
}
```

Instead of a timeout error.

