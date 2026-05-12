# 🚀 Deploy Grahini Mart to Vercel - Quick Guide

## 📋 What You'll Need

1. **GitHub Account** (free) - to store your code
2. **Vercel Account** (free) - to host your website
3. **5-10 minutes** of your time

---

## 🎯 Step-by-Step Deployment

### Step 1: Create GitHub Account (if you don't have one)

1. Go to: https://github.com/signup
2. Create a free account
3. Verify your email

---

### Step 2: Install Git (if not installed)

**Check if Git is installed:**
```bash
git --version
```

**If not installed, download from:** https://git-scm.com/download/win

---

### Step 3: Push Your Code to GitHub

Open terminal in your project folder (`D:\Grahini\`) and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit - Grahini Mart"

# Create repository on GitHub
# Go to: https://github.com/new
# Repository name: grahini-mart
# Keep it Public
# Don't initialize with README
# Click "Create repository"

# Link your local code to GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/grahini-mart.git

# Push code to GitHub
git branch -M main
git push -u origin main
```

**Note:** Replace `YOUR_USERNAME` with your actual GitHub username

---

### Step 4: Create Vercel Account

1. Go to: https://vercel.com/signup
2. Click **"Continue with GitHub"**
3. Authorize Vercel to access your GitHub

---

### Step 5: Deploy to Vercel

1. **Go to Vercel Dashboard:** https://vercel.com/dashboard

2. **Click "Add New Project"**

3. **Import your GitHub repository:**
   - Find "grahini-mart" in the list
   - Click "Import"

4. **Configure Project:**
   - **Project Name:** `grahini-mart` (or any name you like)
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (leave as default)
   - **Build Command:** `npm run build` (auto-filled)
   - **Output Directory:** `.next` (auto-filled)

5. **Add Environment Variables:**
   Click "Environment Variables" and add these:

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

   **Note:** These are dummy credentials. The app will work in demo mode!

6. **Click "Deploy"**

7. **Wait 2-3 minutes** for deployment to complete

8. **Your site is live!** 🎉
   - You'll get a URL like: `https://grahini-mart.vercel.app`
   - Or: `https://grahini-mart-yourname.vercel.app`

---

## 🌐 Your Live Website

After deployment, you'll get:
- **Production URL:** `https://your-project.vercel.app`
- **Preview URLs:** For every git push
- **Automatic HTTPS:** Free SSL certificate
- **Global CDN:** Fast loading worldwide

---

## 📱 Share Your Demo

Share your live URL with anyone:
- Clients
- Friends
- Team members
- Investors

They can:
- ✅ Browse products
- ✅ Add to cart
- ✅ Login/Signup (demo mode)
- ✅ Place orders (demo mode)
- ✅ See all features working

---

## 🔄 Update Your Website

Whenever you make changes:

```bash
# Add changes
git add .

# Commit changes
git commit -m "Updated images and content"

# Push to GitHub
git push

# Vercel automatically deploys! 🚀
```

**Vercel will automatically rebuild and deploy your site in 2-3 minutes!**

---

## 🎨 Add Your Images Before Deploying

**Important:** Add your images before deploying!

1. Add all 12 images to:
   - `public/products/` (6 product images)
   - `public/banners/` (6 banner images)

2. Then commit and push:
   ```bash
   git add public/
   git commit -m "Added product and banner images"
   git push
   ```

---

## ⚙️ Custom Domain (Optional)

Want your own domain like `grahinimart.com`?

1. **Buy domain** from:
   - GoDaddy: https://godaddy.com
   - Namecheap: https://namecheap.com
   - Google Domains: https://domains.google

2. **Add to Vercel:**
   - Go to Project Settings > Domains
   - Add your domain
   - Update DNS records as shown
   - Wait 24-48 hours for DNS propagation

---

## 📊 Vercel Dashboard Features

After deployment, you can:
- ✅ View deployment logs
- ✅ See visitor analytics
- ✅ Monitor performance
- ✅ Check build status
- ✅ Manage domains
- ✅ Update environment variables

---

## 🆘 Troubleshooting

### Build Failed?
- Check the build logs in Vercel dashboard
- Make sure all dependencies are in `package.json`
- Verify environment variables are set

### Images Not Showing?
- Make sure images are in `public/` folder
- Check filenames match exactly
- Commit and push images to GitHub

### Site Not Loading?
- Wait 2-3 minutes after deployment
- Clear browser cache (Ctrl + Shift + R)
- Check Vercel dashboard for errors

---

## 💡 Pro Tips

1. **Free Plan Limits:**
   - Unlimited deployments
   - 100GB bandwidth/month
   - Perfect for demos and small sites

2. **Automatic Deployments:**
   - Every git push triggers a new deployment
   - Preview URLs for testing before going live

3. **Rollback:**
   - Can rollback to any previous deployment
   - Go to Deployments tab in Vercel

4. **Environment Variables:**
   - Can update without redeploying
   - Separate variables for Production/Preview/Development

---

## ✅ Deployment Checklist

Before deploying:
- [ ] All images added to `public/` folders
- [ ] `.env.local` file configured
- [ ] Code tested locally (`npm run dev`)
- [ ] No errors in console
- [ ] All features working

After deploying:
- [ ] Site loads correctly
- [ ] Images showing
- [ ] Navigation working
- [ ] Cart working
- [ ] Login/Signup working
- [ ] Mobile responsive
- [ ] Share URL with others

---

## 🎉 You're Live!

Your Grahini Mart website is now:
- ✅ Live on the internet
- ✅ Accessible from anywhere
- ✅ Fast and secure
- ✅ Ready to share

**Share your demo URL and get feedback!** 🚀

---

## 📞 Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **GitHub Docs:** https://docs.github.com

---

## 🔗 Quick Links

- **Vercel Dashboard:** https://vercel.com/dashboard
- **GitHub:** https://github.com
- **Your Repository:** https://github.com/YOUR_USERNAME/grahini-mart

---

**Happy Deploying! 🎊**
