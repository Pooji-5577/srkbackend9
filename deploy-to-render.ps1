# Quick Deploy Script for Render
# This script helps you push your backend to GitHub for Render deployment

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  SRKE Backend - Render Deployment Helper" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the backend directory
if (-not (Test-Path "package.json")) {
    Write-Host "ERROR: Not in backend directory!" -ForegroundColor Red
    Write-Host "Please run this script from the backend folder." -ForegroundColor Yellow
    exit 1
}

Write-Host "Step 1: Checking Git status..." -ForegroundColor Green
git status

Write-Host ""
Write-Host "Step 2: Adding files to Git..." -ForegroundColor Green
git add .

Write-Host ""
Write-Host "Step 3: Creating commit..." -ForegroundColor Green
$commitMessage = Read-Host "Enter commit message (or press Enter for default)"
if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $commitMessage = "Prepare backend for Render deployment"
}
git commit -m $commitMessage

Write-Host ""
Write-Host "Step 4: Pushing to GitHub..." -ForegroundColor Green
git push origin main

Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "  Files pushed successfully!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Go to https://render.com" -ForegroundColor White
Write-Host "2. Sign up or log in with GitHub" -ForegroundColor White
Write-Host "3. Click 'New +' → 'Blueprint'" -ForegroundColor White
Write-Host "4. Select your repository" -ForegroundColor White
Write-Host "5. Render will detect render.yaml automatically" -ForegroundColor White
Write-Host "6. Add environment variables (see RENDER_DEPLOYMENT.md)" -ForegroundColor White
Write-Host "7. Click 'Apply' to deploy!" -ForegroundColor White
Write-Host ""
Write-Host "📖 Full guide: backend/RENDER_DEPLOYMENT.md" -ForegroundColor Cyan
Write-Host ""
