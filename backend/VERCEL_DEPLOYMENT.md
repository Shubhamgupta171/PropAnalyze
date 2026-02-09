# Vercel Deployment Guide - PropAnalyze Backend

## 🚀 Quick Deployment Steps

### 1. Install Vercel CLI (if not already installed)
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy from Backend Directory
```bash
cd /Users/shubhamgupta/Desktop/Project01/PropAnalyze/backend
vercel
```

Follow the prompts:
- **Set up and deploy?** Yes
- **Which scope?** Select your account
- **Link to existing project?** No (first time) or Yes (subsequent deploys)
- **Project name?** propanalyze-backend (or your preferred name)
- **Directory?** ./ (current directory)
- **Override settings?** No

### 4. Set Environment Variables

After initial deployment, add your environment variables:

```bash
vercel env add DATABASE_URL
vercel env add JWT_SECRET
vercel env add JWT_EXPIRES_IN
vercel env add CLOUDINARY_CLOUD_NAME
vercel env add CLOUDINARY_API_KEY
vercel env add CLOUDINARY_API_SECRET
```

Or use the Vercel Dashboard:
1. Go to your project on vercel.com
2. Navigate to Settings → Environment Variables
3. Add each variable:

**Required Environment Variables:**
- `DATABASE_URL` - Your PostgreSQL connection string
- `JWT_SECRET` - Your JWT secret key
- `JWT_EXPIRES_IN` - Token expiration (e.g., "90d")
- `CLOUDINARY_CLOUD_NAME` - Your Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Your Cloudinary API key
- `CLOUDINARY_API_SECRET` - Your Cloudinary API secret
- `NODE_ENV` - Set to "production" (already in vercel.json)

### 5. Redeploy After Adding Environment Variables
```bash
vercel --prod
```

---

## ✅ What Was Fixed

### Issue
When accessing the root URL `/`, the API returned a 404 error because there was no route handler for it.

### Solution
1. **Added Root Route Handler** in `src/app.js`:
   - Now returns a welcome message with API information
   - Lists all available endpoints
   - Provides link to documentation

2. **Enhanced vercel.json**:
   - Added CORS headers for API routes
   - Set NODE_ENV to production
   - Configured proper routing

3. **Created .vercelignore**:
   - Excludes unnecessary files from deployment
   - Reduces deployment size

---

## 🧪 Testing Your Deployment

After deployment, test these endpoints:

### 1. Root Endpoint
```bash
curl https://your-app.vercel.app/
```

Expected response:
```json
{
  "status": "success",
  "message": "Welcome to PropAnalyze API",
  "version": "1.0.0",
  "documentation": "/api-docs",
  "endpoints": {
    "health": "/api/v1/health",
    "auth": "/api/v1/users",
    "properties": "/api/v1/properties",
    "analysis": "/api/v1/analysis",
    "portfolios": "/api/v1/portfolios",
    "reports": "/api/v1/reports"
  }
}
```

### 2. Health Check
```bash
curl https://your-app.vercel.app/api/v1/health
```

### 3. Test Login (after adding env vars)
```bash
curl -X POST https://your-app.vercel.app/api/v1/users/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "yourpassword"}'
```

---

## 🔧 Database Configuration

### Option 1: Use Vercel Postgres (Recommended)
1. Go to your Vercel project dashboard
2. Navigate to Storage → Create Database → Postgres
3. Vercel will automatically add `DATABASE_URL` to your environment variables

### Option 2: Use External PostgreSQL
Use any PostgreSQL provider:
- **Neon** (https://neon.tech) - Free tier available
- **Supabase** (https://supabase.com) - Free tier available
- **Railway** (https://railway.app) - Free tier available
- **ElephantSQL** (https://www.elephantsql.com) - Free tier available

Get your connection string and add it as `DATABASE_URL` environment variable.

---

## 📝 Important Notes

### Database Migrations
After deployment, you need to run database migrations:

1. Connect to your production database
2. Run the setup script:
   ```bash
   # If using Vercel Postgres, use their CLI
   # Or connect directly and run your schema
   ```

### CORS Configuration
The current configuration allows all origins (`*`). For production, you should:

1. Update `src/app.js`:
   ```javascript
   app.use(cors({
     origin: 'https://your-frontend-domain.vercel.app',
     credentials: true
   }));
   ```

2. Update `vercel.json` headers to match your frontend domain.

### Rate Limiting
The API has rate limiting (100 requests/hour). Monitor this in production and adjust if needed.

---

## 🔄 Continuous Deployment

Vercel automatically deploys when you push to your Git repository:

1. **Connect to Git**:
   ```bash
   vercel git connect
   ```

2. **Push to deploy**:
   ```bash
   git push origin main
   ```

Vercel will automatically deploy on every push to the main branch.

---

## 🐛 Troubleshooting

### Error: "Can't find / on this server"
✅ **Fixed!** The root route handler has been added.

### Error: "Database connection failed"
- Check that `DATABASE_URL` is set correctly
- Ensure your database allows connections from Vercel IPs
- For Vercel Postgres, it should work automatically

### Error: "JWT_SECRET is not defined"
- Add `JWT_SECRET` environment variable in Vercel dashboard
- Redeploy after adding

### Error: "CORS policy error"
- Update CORS origin in `app.js` to match your frontend domain
- Ensure `vercel.json` headers are configured correctly

### Error: "Function timeout"
- Vercel free tier has 10-second timeout
- For PDF generation, consider upgrading to Pro plan
- Or use background jobs for long-running tasks

---

## 📊 Monitoring

### View Logs
```bash
vercel logs
```

Or view in Vercel Dashboard:
1. Go to your project
2. Navigate to Deployments
3. Click on a deployment
4. View Function Logs

### Performance Monitoring
- Vercel provides built-in analytics
- Monitor response times and errors in the dashboard

---

## 🎯 Production Checklist

- [ ] All environment variables added
- [ ] Database migrations run
- [ ] CORS configured for production domain
- [ ] Test all API endpoints
- [ ] Monitor logs for errors
- [ ] Set up custom domain (optional)
- [ ] Configure SSL (automatic with Vercel)
- [ ] Update frontend API URL to Vercel deployment URL

---

## 🔗 Useful Commands

```bash
# Deploy to production
vercel --prod

# View deployment logs
vercel logs

# List all deployments
vercel ls

# Remove a deployment
vercel rm [deployment-url]

# View environment variables
vercel env ls

# Pull environment variables locally
vercel env pull
```

---

## 📞 Support

If you encounter issues:
1. Check Vercel logs: `vercel logs`
2. Review Vercel documentation: https://vercel.com/docs
3. Check your environment variables are set correctly
4. Ensure database is accessible from Vercel

---

**Your API is now ready for deployment! 🚀**
