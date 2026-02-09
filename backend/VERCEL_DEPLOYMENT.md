# Vercel Deployment Guide - PropAnalyze Backend

## 🚀 Quick Deployment Steps

### 1. Deploy to Vercel
```bash
cd /Users/shubhamgupta/Desktop/Project01/PropAnalyze/backend
vercel
```

Follow the prompts and deploy.

### 2. Add Environment Variables in Vercel Dashboard

Go to your Vercel project → Settings → Environment Variables

Add these for **Production**, **Preview**, and **Development**:

```
NODE_ENV=production
DATABASE_URL=your-production-database-url
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=90d
CLOUDINARY_CLOUD_NAME=dgbt8eshk
CLOUDINARY_API_KEY=818552295626676
CLOUDINARY_API_SECRET=uJJ70xJlYduU5Zb7ZtCLpYliR1Y
```

**Important Notes:**
- `DATABASE_URL`: Use a serverless-friendly database like Neon (https://neon.tech) or Supabase
- `JWT_SECRET`: Generate a secure random string (e.g., use `openssl rand -base64 32`)
- Don't use your local PostgreSQL URL for production

### 3. Redeploy
```bash
vercel --prod
```

---

## ✅ What Changed

### Fixed Serverless Compatibility
Created `api/index.js` that exports the Express app without `server.listen()` - this is required for Vercel serverless functions.

**File Structure:**
- `api/index.js` - Vercel serverless entry point (for production)
- `server.js` - Local development server (for `npm start`)
- `vercel.json` - Points to `api/index.js`

---

## 🧪 Test Your Deployment

After deployment, test:

```bash
# Root endpoint
curl https://your-app.vercel.app/

# Health check
curl https://your-app.vercel.app/api/v1/health
```

---

## 🔧 Recommended Database Setup

### Use Neon (Free & Serverless-Optimized)

1. Go to https://neon.tech
2. Sign up and create a project
3. Copy the connection string
4. Add it to Vercel as `DATABASE_URL`
5. Run your database setup script on Neon

**Why Neon?**
- Built for serverless
- Free tier available
- No connection pooling issues
- Auto-scaling

---

## 📝 Missing from Your .env

Your current `.env` is missing:
- `JWT_SECRET` - Add this for authentication to work
- `JWT_EXPIRES_IN` - Add this (e.g., "90d")

**Add to your local .env:**
```
JWT_SECRET=your-secret-key-minimum-32-characters
JWT_EXPIRES_IN=90d
```

Generate a secure JWT_SECRET:
```bash
openssl rand -base64 32
```

---

## 🐛 Common Issues

**"404: NOT_FOUND"** → Fixed! Now using `api/index.js`

**"Database connection failed"** → Use Neon or Supabase, not localhost

**"JWT_SECRET is not defined"** → Add it to Vercel environment variables

**"CORS error"** → Update `src/app.js` to allow your frontend domain

---

## 🎯 Quick Checklist

- [ ] Deploy with `vercel`
- [ ] Add all environment variables in Vercel dashboard
- [ ] Set up production database (Neon/Supabase)
- [ ] Add `JWT_SECRET` to local .env
- [ ] Redeploy with `vercel --prod`
- [ ] Test endpoints
- [ ] Update frontend API URL

---

**Your API is ready for serverless deployment! 🚀**
