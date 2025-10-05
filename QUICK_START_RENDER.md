# 🚀 Render Deployment Quick Start

## Files Created

✅ `render.yaml` - Render deployment configuration
✅ `RENDER_DEPLOYMENT.md` - Complete deployment guide
✅ `.env.example` - Environment variables template
✅ `deploy-to-render.ps1` - Quick push script
✅ Updated `package.json` - Added postinstall script

## Quick Deploy Steps

### 1. Push to GitHub
```powershell
# Run the deployment helper script
.\deploy-to-render.ps1

# Or manually:
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### 2. Deploy on Render
1. Go to **https://render.com**
2. Sign up/Login with GitHub
3. Click **"New +"** → **"Blueprint"**
4. Select your repository
5. Render detects `render.yaml` automatically
6. Click **"Apply"**

### 3. Add Environment Variables
In Render Dashboard → Environment tab, add:

```
NODE_ENV=production
PORT=10000
DATABASE_URL=postgresql://... (from Supabase)
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=your-key
SUPABASE_SERVICE_ROLE_KEY=your-key
FRONTEND_URL=https://your-frontend.vercel.app
```

### 4. Wait for Deployment
- Build takes ~2-3 minutes
- Check logs for any errors
- Your API will be at: `https://your-app.onrender.com`

### 5. Test Your API
```bash
curl https://your-app.onrender.com/api/health
```

Should return:
```json
{
  "status": "OK",
  "message": "Sai Radha Krishna Educational Society API is running"
}
```

## Where to Get Supabase Credentials

1. **Log in to Supabase:** https://supabase.com
2. **Select your project**
3. **Settings → API:**
   - Copy `Project URL` → SUPABASE_URL
   - Copy `anon/public key` → SUPABASE_ANON_KEY
   - Copy `service_role key` → SUPABASE_SERVICE_ROLE_KEY
4. **Settings → Database → Connection String → URI:**
   - Copy the URI → DATABASE_URL

## Important Notes

⚠️ **Free Tier Limitations:**
- Spins down after 15 min inactivity
- Cold start ~30-60 seconds
- Upgrade to $7/month for always-on

🔄 **Auto-Deploy:**
- Every push to `main` triggers deployment
- No manual action needed after initial setup

📊 **Monitor:**
- Dashboard → Logs (real-time)
- Dashboard → Metrics
- Health checks at `/api/health`

## Need Help?

📖 Read full guide: **RENDER_DEPLOYMENT.md**
🌐 Render Docs: https://render.com/docs
💬 Support: https://community.render.com

---

**Your backend is ready for Render! 🎉**
