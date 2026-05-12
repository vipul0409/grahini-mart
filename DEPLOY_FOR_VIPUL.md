# 🚀 Deployment Guide for Vipul - Grahini Mart

## Your GitHub Profile
**Username:** vipul0409  
**Profile:** https://github.com/vipul0409

---

## 📋 Step-by-Step Deployment (10 Minutes)

### Step 1: Initialize Git in Your Project (1 minute)

Open terminal in `D:\Grahini\` and run:

```bash
git init
git add .
git commit -m "Initial commit - Grahini Mart ecommerce website"
```

---

### Step 2: Create Repository on GitHub (2 minutes)

#### Option A: Using GitHub Website (Easier)

1. **Go to:** https://github.com/new

2. **Fill in details:**
   - Repository name: `grahini-mart`
   - Description: `Grahini Mart - Premium Indian Grocery Ecommerce`
   - Visibility: **Public** (so you can share the demo)
   - ❌ **Don't** check "Initialize with README"
   - ❌ **Don't** add .gitignore or license

3. **Click:** "Create repository"

4. **You'll see a page with commands** - Copy the commands under "push an existing repository"

#### Option B: Using GitHub CLI (If you have it installed)

```bash
gh repo create grahini-mart --public --source=. --remote=origin --push
```

---

### Step 3: Push Your Code to GitHub (2 minutes)

After creating the repository, run these commands in your terminal:

```bash
# Link your local code to GitHub
git remote add origin https://github.com/vipul0409/grahini-mart.git

# Push your code
git branch -M main
git push -u origin main
```

**Enter your GitHub credentials when prompted.**

✅ **Your code is now on GitHub!**  
View it at: https://github.com/vipul0409/grahini-mart

---

### Step 4: Deploy to Vercel (5 minutes)

#### A. Create Vercel Account

1. **Go to:** https://vercel.com/signup

2. **Click:** "Continue with GitHub"

3. **Authorize Vercel** to access your GitHub account

✅ **Vercel account created!**

#### B. Import Your Project

1. **Go to:** https://vercel.com/new

2. **Find your repository:**
   - Look for `vipul0409/grahini-mart`
   - Click "Import"

3. **Configure Project:**
   - **Project Name:** `grahini-mart` (or any name you like)
   - **Framework Preset:** Next.js ✅ (auto-detected)
   - **Root Directory:** `./` (leave as default)
   - **Build Command:** `npm run build` ✅ (auto-filled)
   - **Output Directory:** `.next` ✅ (auto-filled)

#### C. Add Environment Variables

Click **"Environment Variables"** and add these one by one:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDummyKeyForDevelopment123456789
```
```
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=grahini-mart-dummy.firebaseapp.com
```
```
NEXT_PUBLIC_FIREBASE_PROJECT_ID=grahini-mart-dummy
```
```
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=grahini-mart-dummy.appspot.com
```
```
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
```
```
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```
```
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_dummy123456789
```
```
RAZORPAY_KEY_SECRET=dummy_secret_key_123456789
```
```
NEXT_PUBLIC_APP_URL=https://grahini-mart.vercel.app
```
```
NEXT_PUBLIC_WHATSAPP_NUMBER=918989475895
```

**Tip:** Copy each line, paste in "Key" field, then paste value in "Value" field.

#### D. Deploy!

1. **Click:** "Deploy" button

2. **Wait 2-3 minutes** - Vercel will:
   - Install dependencies
   - Build your project
   - Deploy to production

3. **Success!** 🎉 You'll see:
   - ✅ Deployment successful
   - 🌐 Your live URL

---

## 🌐 Your Live URLs

After deployment, you'll get:

**Production URL:**
- `https://grahini-mart.vercel.app`
- OR `https://grahini-mart-vipul0409.vercel.app`

**GitHub Repository:**
- `https://github.com/vipul0409/grahini-mart`

---

## 📱 Share Your Demo

Share these links:

**Live Website:**
```
https://grahini-mart.vercel.app
```

**GitHub Code:**
```
https://github.com/vipul0409/grahini-mart
```

---

## 🔄 Update Your Site Later

Made changes? Just push to GitHub:

```bash
# In D:\Grahini\ folder
git add .
git commit -m "Updated content"
git push
```

**Vercel automatically redeploys!** No need to do anything else! 🚀

---

## ✅ Verification Checklist

After deployment, check:

- [ ] Visit your Vercel URL
- [ ] Homepage loads
- [ ] Slider shows (may show placeholder if no images)
- [ ] Products display
- [ ] Cart works
- [ ] Login/Signup works
- [ ] Mobile responsive
- [ ] WhatsApp link works

---

## 🖼️ Add Images Later

If you want to add product and banner images:

1. Add 12 images to folders:
   - `public/products/` (6 images)
   - `public/banners/` (6 images)

2. Push to GitHub:
   ```bash
   git add public/
   git commit -m "Added product and banner images"
   git push
   ```

3. Vercel auto-deploys with images! ✅

See [IMAGE_UPLOAD_GUIDE.md](IMAGE_UPLOAD_GUIDE.md) for image details.

---

## 🆘 Troubleshooting

### Git asks for credentials?

**Option 1: Use Personal Access Token**
1. Go to: https://github.com/settings/tokens
2. Generate new token (classic)
3. Select scopes: `repo`
4. Copy token
5. Use token as password when git asks

**Option 2: Use GitHub CLI**
```bash
# Install GitHub CLI first
gh auth login
```

### Build failed on Vercel?

1. Check build logs in Vercel dashboard
2. Look for error messages
3. Common fixes:
   - Make sure all files are committed
   - Check environment variables are correct
   - Run `npm run build` locally to test

### Images not showing?

- Add images to `public/` folders
- Commit and push to GitHub
- Vercel will auto-redeploy

---

## 📊 What You Get (Free Plan)

Vercel Free Plan includes:
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Free SSL certificate
- ✅ Global CDN (fast worldwide)
- ✅ Automatic HTTPS
- ✅ Preview deployments
- ✅ Analytics

**Perfect for demos and small businesses!**

---

## 🎯 Quick Commands Reference

```bash
# Check git status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Your message"

# Push to GitHub
git push

# View remote URL
git remote -v

# Check current branch
git branch
```

---

## 📞 Your Grahini Mart Details

- **Name:** Grahini Mart
- **Tagline:** थोक दाम में किराना, अब आपके दरवाजे पर
- **WhatsApp:** +91 8989475895
- **Instagram:** @Grahini_Mart7
- **Email:** grahinimart7@gmail.com
- **Location:** Gwalior, MP (474001)

---

## 🎉 You're All Set!

Follow the steps above and you'll have:
- ✅ Code on GitHub
- ✅ Live website on Vercel
- ✅ Shareable demo URL
- ✅ Automatic deployments

**Total time: ~10 minutes**

---

## 📖 Need More Help?

- **Vercel Docs:** https://vercel.com/docs
- **GitHub Docs:** https://docs.github.com
- **Next.js Docs:** https://nextjs.org/docs

---

**Good luck with your deployment, Vipul! 🚀**

**Made with ❤️ for Grahini Mart**
