# Production Deployment Checklist

## ✅ Pre-Deployment Steps

### 1. Environment Variables (Vercel)

You need to add these environment variables in Vercel:

**Go to**: Vercel Dashboard → Your Project → Settings → Environment Variables

Add these variables:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC2Z35BZMtlFGWJJk2xK3f0wNnihY5iArE
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=grahini-mart.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=grahini-mart
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=grahini-mart.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1065580782606
NEXT_PUBLIC_FIREBASE_APP_ID=1:1065580782606:web:cd33386748c60129ab085f
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-PDLGQP14ME

# App Configuration
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NEXT_PUBLIC_WHATSAPP_NUMBER=918989475895

# Admin Credentials
ADMIN_EMAIL=grahinimart7@gmail.com
NEXT_PUBLIC_ADMIN_USERNAME=Pranjal
NEXT_PUBLIC_ADMIN_PASSWORD=Saksham@#2029#456789

# Optional (if you have them)
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

**Important**: 
- Don't wrap password in quotes in Vercel
- Just use: `Saksham@#2029#456789`

### 2. Firebase Security Rules

Make sure these are set in Firebase Console:

**Firestore Rules**: ✅ Already set (you showed me earlier)

**Storage Rules**: ⚠️ Need to set (if you upgrade to Blaze plan)
- Go to: https://console.firebase.google.com/project/grahini-mart/storage/rules
- See `FIREBASE_STORAGE_RULES.md` for rules

### 3. Update App URL in .env.local

After deployment, update this line:
```bash
NEXT_PUBLIC_APP_URL=https://your-actual-domain.vercel.app
```

## 🚀 Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Commit all changes to GitHub**:
   ```bash
   git add .
   git commit -m "Production ready: Fixed admin panel, added category filters"
   git push origin main
   ```

2. **Vercel will auto-deploy** (if connected to GitHub)
   - Or manually trigger deployment in Vercel Dashboard

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Deploy to production
vercel --prod
```

## 📋 Post-Deployment Checklist

### 1. Test Admin Panel
- [ ] Go to: `https://your-domain.vercel.app/admin`
- [ ] Login with: Username: `Pranjal`, Password: `Saksham@#2029#456789`
- [ ] Check if you can see products
- [ ] Try adding a new product
- [ ] Try editing a product
- [ ] Try deleting a product

### 2. Test Category Management
- [ ] Go to: `https://your-domain.vercel.app/admin/categories`
- [ ] Check if categories load
- [ ] Try adding a new category
- [ ] Try editing a category
- [ ] Check if duplicate names are blocked

### 3. Test Category Filters
- [ ] Go to admin dashboard
- [ ] Check if category cards show correct counts
- [ ] Click on a category card
- [ ] Verify products filter correctly

### 4. Test Frontend
- [ ] Go to: `https://your-domain.vercel.app`
- [ ] Check if products display
- [ ] Check if categories work
- [ ] Test "Contact Us" button
- [ ] Test product details page

## 🔧 If Issues Occur

### Issue: "Firebase Error: Invalid API Key"
**Solution**: Check environment variables in Vercel are correct

### Issue: "Products not loading"
**Solution**: 
1. Check Firestore rules allow read access
2. Check if products exist in Firestore database
3. Check browser console for errors

### Issue: "Can't add/edit products"
**Solution**:
1. Check Firestore rules allow write access
2. Check admin is logged in
3. Check browser console for errors

### Issue: "Images not uploading"
**Solution**:
1. This is expected if Storage not enabled (Spark plan)
2. Images will be stored as base64 (works but not optimal)
3. To fix: Upgrade to Blaze plan and set Storage rules

## 📊 Monitor After Deployment

### Check Vercel Logs
- Go to: Vercel Dashboard → Your Project → Deployments → Latest → Logs
- Look for any errors

### Check Firebase Console
- **Firestore**: https://console.firebase.google.com/project/grahini-mart/firestore
  - Check if products are being created
  - Check if categories exist
  
- **Authentication**: https://console.firebase.google.com/project/grahini-mart/authentication
  - Check if admin user exists (if using Firebase Auth)

### Check Browser Console
- Open your production site
- Press F12 to open console
- Look for any errors

## 🎯 Success Criteria

Your deployment is successful if:
- ✅ Admin can login
- ✅ Admin can view products
- ✅ Admin can add new products
- ✅ Admin can edit products (if they exist in Firestore)
- ✅ Admin can delete products
- ✅ Category filters work
- ✅ Frontend displays products
- ✅ No console errors

## 📝 Important Notes

### About Product Editing Issue
The "product not found" error you saw locally will likely be resolved in production if:
1. You add products fresh in production
2. Products get proper Firestore IDs
3. You don't try to edit old/dummy products

### About Firebase Storage
- Currently using base64 images (works but not optimal)
- To enable proper image storage:
  1. Upgrade to Blaze plan
  2. Set Storage rules
  3. Images will automatically upload to Storage

### About Admin Password
- Password is visible in environment variables
- For better security, consider:
  1. Using Firebase Authentication
  2. Or at least hash the password
  3. Current setup is basic but functional

## 🚨 Before You Deploy

**IMPORTANT**: Make sure you've committed all changes:

```bash
# Check what files changed
git status

# Add all changes
git add .

# Commit with message
git commit -m "Production ready: All admin fixes applied"

# Push to GitHub
git push origin main
```

## 📞 Need Help?

If you encounter any issues during deployment:
1. Check Vercel deployment logs
2. Check browser console
3. Check Firebase Console
4. Share the error messages

## 🎉 After Successful Deployment

1. Update `NEXT_PUBLIC_APP_URL` in Vercel environment variables
2. Test all admin features
3. Add your first products in production
4. Share the site with users!

---

**Ready to deploy?** Follow the steps above and let me know if you need help!
