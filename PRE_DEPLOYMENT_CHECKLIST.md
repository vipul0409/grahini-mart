# ✅ Pre-Deployment Checklist for Grahini Mart

## Before You Deploy to Vercel

### 1. Images ✅
- [ ] All 6 product images added to `public/products/`
  - [ ] toor-dal.jpg
  - [ ] cashews.jpg
  - [ ] almonds.jpg
  - [ ] red-chilli-powder.jpg
  - [ ] turmeric-powder.jpg
  - [ ] garam-masala.jpg

- [ ] All 6 banner images added to `public/banners/`
  - [ ] dry-fruits-banner.jpg
  - [ ] dry-fruits-banner-mobile.jpg
  - [ ] masala-banner.jpg
  - [ ] masala-banner-mobile.jpg
  - [ ] pulses-banner.jpg
  - [ ] pulses-banner-mobile.jpg

### 2. Local Testing ✅
- [ ] Run `npm run dev` successfully
- [ ] Homepage loads correctly
- [ ] All images showing
- [ ] Hero slider working
- [ ] Product cards displaying
- [ ] Cart functionality working
- [ ] Login/Signup working
- [ ] Mobile responsive (test on phone or browser dev tools)
- [ ] No console errors

### 3. Code Quality ✅
- [ ] No TypeScript errors: `npm run build`
- [ ] All files committed to git
- [ ] `.env.local` NOT committed (should be in .gitignore)
- [ ] `node_modules/` NOT committed (should be in .gitignore)

### 4. GitHub Setup ✅
- [ ] GitHub account created
- [ ] Git installed on your computer
- [ ] Repository created on GitHub
- [ ] Code pushed to GitHub

### 5. Vercel Setup ✅
- [ ] Vercel account created
- [ ] Vercel connected to GitHub
- [ ] Environment variables ready to add

### 6. Environment Variables ✅

Copy these to Vercel during deployment:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDummyKeyForDevelopment123456789
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=grahini-mart-dummy.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=grahini-mart-dummy
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=grahini-mart-dummy.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_dummy123456789
RAZORPAY_KEY_SECRET=dummy_secret_key_123456789
NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
NEXT_PUBLIC_WHATSAPP_NUMBER=918989475895
```

**Note:** Update `NEXT_PUBLIC_APP_URL` after you get your Vercel URL!

---

## Deployment Steps

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push
```

### Step 2: Deploy on Vercel
1. Go to https://vercel.com/dashboard
2. Click "Add New Project"
3. Import your GitHub repository
4. Add environment variables (copy from above)
5. Click "Deploy"
6. Wait 2-3 minutes

### Step 3: Get Your Live URL
- You'll get: `https://grahini-mart-xxx.vercel.app`
- Or: `https://your-custom-name.vercel.app`

### Step 4: Update Environment Variable
1. Go to Vercel Project Settings
2. Update `NEXT_PUBLIC_APP_URL` with your actual URL
3. Redeploy (Vercel will do this automatically)

---

## After Deployment

### Test Your Live Site ✅
- [ ] Site loads at your Vercel URL
- [ ] All images showing
- [ ] Hero slider working
- [ ] Products displaying correctly
- [ ] Cart working
- [ ] Login/Signup working
- [ ] Mobile responsive
- [ ] WhatsApp link working
- [ ] Social media links working

### Share Your Demo ✅
- [ ] Copy your Vercel URL
- [ ] Share with friends/clients
- [ ] Get feedback
- [ ] Make improvements

---

## Common Issues & Solutions

### Images Not Showing?
- ✅ Make sure images are in `public/` folder
- ✅ Check filenames match exactly
- ✅ Commit and push images to GitHub
- ✅ Redeploy on Vercel

### Build Failed?
- ✅ Check build logs in Vercel dashboard
- ✅ Run `npm run build` locally to test
- ✅ Fix any TypeScript errors
- ✅ Push fixes and redeploy

### Site Not Loading?
- ✅ Wait 2-3 minutes after deployment
- ✅ Clear browser cache (Ctrl + Shift + R)
- ✅ Check Vercel dashboard for errors

### Environment Variables Not Working?
- ✅ Make sure all variables are added in Vercel
- ✅ Check for typos in variable names
- ✅ Redeploy after adding variables

---

## Quick Commands Reference

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production (test before deploying)
npm run build

# Start production server locally
npm start

# Git commands
git add .
git commit -m "Your message"
git push

# Check Git status
git status
```

---

## Need Help?

📖 **Read the guides:**
- [DEPLOY_TO_VERCEL.md](DEPLOY_TO_VERCEL.md) - Complete deployment guide
- [IMAGE_UPLOAD_GUIDE.md](IMAGE_UPLOAD_GUIDE.md) - Image upload instructions
- [DUMMY_MODE.md](DUMMY_MODE.md) - Understanding dummy mode

🌐 **Official Docs:**
- Vercel: https://vercel.com/docs
- Next.js: https://nextjs.org/docs
- GitHub: https://docs.github.com

---

## 🎉 Ready to Deploy?

If all checkboxes above are checked, you're ready to deploy!

**Follow the steps in [DEPLOY_TO_VERCEL.md](DEPLOY_TO_VERCEL.md) now!** 🚀

---

**Good luck with your deployment! 🎊**
