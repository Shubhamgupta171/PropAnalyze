4# Backend 500 Error Fix - Environment Variables Checklist

## Current Issue
```
POST https://prop-analyze.vercel.app/api/v1/users/login 500 (Internal Server Error)
```

This means the backend is missing environment variables.

---

## ✅ Step-by-Step Fix

### 1. Generate JWT Secret (Run Locally)

Open terminal and run:
```bash
openssl rand -base64 32
```

**Copy the output** - you'll need it in step 2.

---

### 2. Add Environment Variables in Vercel

Go to: **Vercel Dashboard** → **prop-analyze** (backend) → **Settings** → **Environment Variables**

Click **"Add New"** and add each of these **7 variables**:

#### Variable 1: NODE_ENV
- **Name:** `NODE_ENV`
- **Value:** `production`
- **Environments:** ✅ Production, ✅ Preview, ✅ Development
- Click **Save**

#### Variable 2: JWT_SECRET
- **Name:** `JWT_SECRET`
- **Value:** `<paste output from openssl command>`
- **Environments:** ✅ Production, ✅ Preview, ✅ Development
- Click **Save**

#### Variable 3: JWT_EXPIRES_IN
- **Name:** `JWT_EXPIRES_IN`
- **Value:** `90d`
- **Environments:** ✅ Production, ✅ Preview, ✅ Development
- Click **Save**

#### Variable 4: DATABASE_URL
- **Name:** `DATABASE_URL`
- **Value:** `<your Neon database connection string>`
- **Environments:** ✅ Production, ✅ Preview, ✅ Development
- Click **Save**

**Don't have a database yet?** See step 3 below.

#### Variable 5: CLOUDINARY_CLOUD_NAME
- **Name:** `CLOUDINARY_CLOUD_NAME`
- **Value:** `dgbt8eshk`
- **Environments:** ✅ Production, ✅ Preview, ✅ Development
- Click **Save**

#### Variable 6: CLOUDINARY_API_KEY
- **Name:** `CLOUDINARY_API_KEY`
- **Value:** `818552295626676`
- **Environments:** ✅ Production, ✅ Preview, ✅ Development
- Click **Save**

#### Variable 7: CLOUDINARY_API_SECRET
- **Name:** `CLOUDINARY_API_SECRET`
- **Value:** `uJJ70xJlYduU5Zb7ZtCLpYliR1Y`
- **Environments:** ✅ Production, ✅ Preview, ✅ Development
- Click **Save**

---

### 3. Set Up Production Database (Neon)

If you don't have `DATABASE_URL` yet:

1. Go to **https://neon.tech**
2. **Sign up** (free account)
3. Click **"Create a project"**
4. Give it a name (e.g., "propanalyze-prod")
5. **Copy the connection string** (looks like: `postgresql://user:pass@host.neon.tech/dbname`)
6. Use this as the value for `DATABASE_URL` in step 2 above

---

### 4. Redeploy Backend

After adding ALL 7 environment variables:

1. Go to **Deployments** tab in Vercel
2. Find the latest deployment
3. Click the **three dots (•••)**
4. Click **"Redeploy"**
5. Wait for deployment to complete (~1-2 minutes)

---

### 5. Test

After redeployment:
1. Visit your frontend
2. Try to login
3. Should work! ✅

---

## Quick Check: Did You Add All 7?

- [ ] `NODE_ENV`
- [ ] `JWT_SECRET`
- [ ] `JWT_EXPIRES_IN`
- [ ] `DATABASE_URL`
- [ ] `CLOUDINARY_CLOUD_NAME`
- [ ] `CLOUDINARY_API_KEY`
- [ ] `CLOUDINARY_API_SECRET`

**All 7 must be added for the backend to work!**

---

## Still Getting 500 Error?

Check Vercel logs:
1. Vercel Dashboard → Your Backend Project
2. Click on latest deployment
3. Click **"View Function Logs"**
4. Look for error messages

Common issues:
- Database connection failed → Check `DATABASE_URL` is correct
- JWT error → Check `JWT_SECRET` is set
- Missing variable → Make sure all 7 are added

---

**Add all environment variables and redeploy!** 🚀
