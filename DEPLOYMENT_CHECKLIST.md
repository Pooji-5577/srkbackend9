# 🚀 Render Deployment Checklist

## Pre-Deployment ✅

- [x] Backend code pushed to GitHub
- [x] `render.yaml` configuration file created
- [x] `package.json` has postinstall script
- [x] All deployment docs created
- [ ] Supabase database is set up and accessible
- [ ] Have all Supabase credentials ready

## Deployment Steps

### 1. Create Render Account
- [ ] Go to https://render.com
- [ ] Sign up with GitHub account
- [ ] Authorize Render to access repositories

### 2. Create Web Service
- [ ] Click "New +" → "Blueprint"
- [ ] Select repository: `Pooji-5577/srkbackend9`
- [ ] Render detects `render.yaml` automatically
- [ ] Review configuration

### 3. Add Environment Variables
- [ ] `NODE_ENV` = `production`
- [ ] `PORT` = `10000`
- [ ] `DATABASE_URL` = `postgresql://...` (from Supabase)
- [ ] `SUPABASE_URL` = `https://xxx.supabase.co`
- [ ] `SUPABASE_ANON_KEY` = `your-anon-key`
- [ ] `SUPABASE_SERVICE_ROLE_KEY` = `your-service-role-key`
- [ ] `FRONTEND_URL` = `https://your-frontend.vercel.app`

### 4. Deploy
- [ ] Click "Apply" to start deployment
- [ ] Watch build logs for errors
- [ ] Wait for deployment to complete (~3-5 min)
- [ ] Service status shows "Live"

### 5. Verify Deployment
- [ ] Visit: `https://your-app.onrender.com/api/health`
- [ ] Response shows: `{"status": "OK", ...}`
- [ ] Check logs for any errors
- [ ] Test API endpoints

### 6. Run Migrations (if needed)
- [ ] Go to Shell tab in Render
- [ ] Run: `npx prisma migrate deploy`
- [ ] Or use Prisma Studio to verify tables

### 7. Update Frontend
- [ ] Update frontend `.env` with new API URL
- [ ] Deploy frontend changes
- [ ] Test end-to-end functionality

## Post-Deployment

### Testing
- [ ] Test health endpoint
- [ ] Test GET /api/donations
- [ ] Test POST /api/contact
- [ ] Test CORS with frontend
- [ ] Verify database connections

### Monitoring
- [ ] Set up health check alerts
- [ ] Monitor logs for errors
- [ ] Check performance metrics
- [ ] Review memory/CPU usage

### Optional Enhancements
- [ ] Set up custom domain
- [ ] Upgrade to paid plan (no sleep)
- [ ] Configure deploy hooks
- [ ] Set up monitoring alerts
- [ ] Add rate limiting
- [ ] Implement caching

## Troubleshooting Guide

### Build Fails
- [ ] Check build logs in Render dashboard
- [ ] Verify all dependencies in package.json
- [ ] Ensure TypeScript compiles locally
- [ ] Check Prisma generates successfully

### Deployment Fails
- [ ] Verify environment variables
- [ ] Check DATABASE_URL format
- [ ] Ensure Supabase is accessible
- [ ] Review start command

### Runtime Errors
- [ ] Check application logs
- [ ] Verify database connection
- [ ] Check CORS configuration
- [ ] Review API endpoint responses

## Important Notes

⚠️ **Free Tier Limitations:**
- Sleeps after 15 minutes of inactivity
- Cold start takes 30-60 seconds
- Consider upgrading for production

🔄 **Automatic Deployments:**
- Every push to `main` triggers rebuild
- No manual action needed

📊 **Monitoring:**
- Dashboard shows real-time logs
- Metrics tab shows performance
- Health checks run automatically

## Resources

- 📖 Full Guide: `RENDER_DEPLOYMENT.md`
- ⚡ Quick Start: `QUICK_START_RENDER.md`
- 📝 Summary: `DEPLOYMENT_SUMMARY.md`
- 🌐 Render Docs: https://render.com/docs

## Success! 🎉

Once all items are checked, your backend is live and ready!

**API URL:** `https://your-app.onrender.com`

---

*Print this checklist and check off items as you complete them!*
