# Deploying SRKE Backend to Render

This guide will walk you through deploying your backend API to Render.com for free hosting.

## Prerequisites

- A GitHub account
- A Render account (sign up at https://render.com)
- Your backend code pushed to a GitHub repository
- Supabase database credentials

## Step-by-Step Deployment Guide

### Step 1: Prepare Your Repository

1. **Ensure your backend code is in a GitHub repository**
   ```bash
   cd backend
   git add .
   git commit -m "Prepare for Render deployment"
   git push origin main
   ```

2. **Verify the following files exist:**
   - ✅ `render.yaml` (configuration file)
   - ✅ `package.json` (with postinstall script)
   - ✅ `tsconfig.json`
   - ✅ `prisma/schema.prisma`

### Step 2: Create a Render Account

1. Go to https://render.com
2. Click "Get Started for Free"
3. Sign up with your GitHub account (recommended)
4. Authorize Render to access your GitHub repositories

### Step 3: Create a New Web Service

#### Option A: Using Blueprint (Automated - Recommended)

1. From Render Dashboard, click **"New +"** → **"Blueprint"**
2. Connect your GitHub repository
3. Render will detect the `render.yaml` file automatically
4. Click **"Apply"** to create the service

#### Option B: Manual Setup

1. From Render Dashboard, click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Select the repository containing your backend code
4. Configure the service:
   - **Name:** `srke-backend` (or your preferred name)
   - **Region:** Oregon (or closest to your users)
   - **Branch:** `main`
   - **Root Directory:** `backend` (if backend is in a subdirectory)
   - **Runtime:** `Node`
   - **Build Command:** 
     ```bash
     npm install && npm run build && npx prisma generate
     ```
   - **Start Command:** 
     ```bash
     npm start
     ```
   - **Plan:** Free

### Step 4: Configure Environment Variables

In the Render dashboard, add the following environment variables:

1. Click on your service → **"Environment"** tab
2. Add each variable:

| Key | Value | Description |
|-----|-------|-------------|
| `NODE_ENV` | `production` | Environment mode |
| `PORT` | `10000` | Port (auto-assigned by Render) |
| `DATABASE_URL` | `your-postgresql-url` | Supabase PostgreSQL connection string |
| `SUPABASE_URL` | `your-supabase-url` | Supabase project URL |
| `SUPABASE_ANON_KEY` | `your-anon-key` | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | `your-service-role-key` | Supabase service role key |
| `FRONTEND_URL` | `https://your-frontend.vercel.app` | Your frontend URL for CORS |

**Where to find Supabase credentials:**
- Log in to https://supabase.com
- Select your project
- Go to **Settings** → **API**
- Copy the URL and keys
- For DATABASE_URL, go to **Settings** → **Database** → **Connection String** → **URI**

### Step 5: Deploy

1. Click **"Create Web Service"** or **"Apply Blueprint"**
2. Render will start building your application
3. Watch the logs for any errors
4. Once deployed, you'll get a URL like: `https://srke-backend.onrender.com`

### Step 6: Verify Deployment

1. Open your browser and navigate to:
   ```
   https://your-app-name.onrender.com/api/health
   ```
2. You should see:
   ```json
   {
     "status": "OK",
     "message": "Sai Radha Krishna Educational Society API is running",
     "timestamp": "2025-10-05T..."
   }
   ```

### Step 7: Run Database Migrations

After first deployment, you may need to run migrations:

1. Go to your service in Render Dashboard
2. Click **"Shell"** tab (opens a terminal)
3. Run:
   ```bash
   npx prisma migrate deploy
   ```

Or use Render's manual deploy hooks:
1. Settings → Deploy Hooks
2. Create a hook named "Run Migrations"
3. Use the provided URL to trigger migrations

### Step 8: Update Frontend Configuration

Update your frontend to use the new backend URL:

**In your Next.js frontend:**
```env
# .env.local or .env.production
NEXT_PUBLIC_API_URL=https://srke-backend.onrender.com
```

## Important Notes

### Free Tier Limitations

⚠️ **Render Free Tier Spin Down:**
- Free services spin down after 15 minutes of inactivity
- First request after spin down takes ~30-60 seconds (cold start)
- Solution: Upgrade to paid plan ($7/month) for always-on service

### CORS Configuration

Make sure your frontend URL is added to the CORS whitelist in `src/index.ts`:
```typescript
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'https://your-frontend-domain.vercel.app'
  ],
  credentials: true
}));
```

### Database Migrations

For production databases, use migrations instead of `prisma db push`:
```bash
# Create a migration
npx prisma migrate dev --name migration_name

# Deploy to production
npx prisma migrate deploy
```

## Monitoring and Logs

1. **View Logs:** Dashboard → Your Service → Logs tab
2. **Metrics:** Dashboard → Your Service → Metrics tab
3. **Health Checks:** Render automatically pings `/api/health`

## Troubleshooting

### Build Fails

**Error: Prisma Client not generated**
- Solution: Ensure `postinstall` script exists in package.json
- Check build command includes `npx prisma generate`

**Error: TypeScript compilation fails**
- Solution: Check `tsconfig.json` is valid
- Ensure all dependencies are in `package.json`

### Deployment Fails

**Error: Cannot find module**
- Solution: Check all imports are correct
- Ensure `dist` folder is being created

**Error: Database connection fails**
- Solution: Verify `DATABASE_URL` environment variable
- Check Supabase database is accessible
- Whitelist Render's IP addresses in Supabase (usually not needed)

### Runtime Errors

**Error: Port already in use**
- Solution: Use `process.env.PORT` in your code (already configured)

**Error: CORS issues**
- Solution: Add your frontend domain to CORS whitelist
- Update `FRONTEND_URL` environment variable

## Automatic Deployments

Render automatically deploys when you push to your main branch:
```bash
git add .
git commit -m "Update backend"
git push origin main
# Render will automatically deploy
```

## Custom Domain (Optional)

1. Go to Service Settings → Custom Domains
2. Add your domain
3. Update DNS records as instructed
4. SSL certificate is automatically provisioned

## Cost Optimization

- **Free Tier:** Perfect for testing and small projects
- **Starter Plan ($7/month):** Always-on, no spin down
- **Pro Plan ($25/month):** More resources and scaling options

## Next Steps

1. ✅ Deploy backend to Render
2. ✅ Test all API endpoints
3. ⬜ Deploy frontend to Vercel
4. ⬜ Update frontend API URL
5. ⬜ Test end-to-end functionality

## Support Resources

- Render Documentation: https://render.com/docs
- Render Community: https://community.render.com
- Prisma on Render: https://render.com/docs/deploy-prisma

---

**Need Help?** Check the Render logs for detailed error messages or contact Render support.

## Environment Variables Quick Reference

```bash
# Required for Render deployment
NODE_ENV=production
PORT=10000
DATABASE_URL=postgresql://user:password@host:5432/database?pgbouncer=true
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
FRONTEND_URL=https://your-frontend.vercel.app
```

Good luck with your deployment! 🚀
