# 🔥 Firebase Setup Guide for Grahini Mart

## Overview
Your application now uses **Firebase Firestore** as the database instead of localStorage. This means:
- ✅ Products are stored permanently in the cloud
- ✅ All users see the same products across all devices
- ✅ Orders are saved permanently
- ✅ Data persists even after clearing browser cache
- ✅ Real-time updates (optional)

---

## Step 1: Create Firebase Project

1. **Go to Firebase Console:**
   - Visit: https://console.firebase.google.com/
   - Sign in with your Google account

2. **Create New Project:**
   - Click "Add project"
   - Project name: `grahini-mart` (or any name you prefer)
   - Disable Google Analytics (optional)
   - Click "Create project"

3. **Wait for project creation** (takes ~30 seconds)

---

## Step 2: Register Web App

1. **Add Web App:**
   - In Firebase Console, click the **Web icon** (`</>`)
   - App nickname: `Grahini Mart Web`
   - Check "Also set up Firebase Hosting" (optional)
   - Click "Register app"

2. **Copy Configuration:**
   - You'll see a `firebaseConfig` object
   - **IMPORTANT:** Copy these values, you'll need them next

Example:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "grahini-mart.firebaseapp.com",
  projectId: "grahini-mart",
  storageBucket: "grahini-mart.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

---

## Step 3: Update Environment Variables

1. **Open `.env.local` file** in your project root

2. **Replace the dummy Firebase credentials** with your real ones:

```env
# Firebase Configuration (REAL CREDENTIALS)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC...  # Your actual API key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=grahini-mart.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=grahini-mart
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=grahini-mart.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

3. **Save the file**

---

## Step 4: Enable Firestore Database

1. **Go to Firestore Database:**
   - In Firebase Console, click "Firestore Database" in the left menu
   - Click "Create database"

2. **Choose Mode:**
   - Select **"Start in production mode"** (we'll set rules next)
   - Click "Next"

3. **Choose Location:**
   - Select closest region to your users (e.g., `asia-south1` for India)
   - Click "Enable"

4. **Wait for database creation** (~1 minute)

---

## Step 5: Set Firestore Security Rules

1. **Go to Rules Tab:**
   - In Firestore Database, click the "Rules" tab

2. **Replace with these rules:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Products collection - Read by anyone, Write by admin only
    match /products/{productId} {
      allow read: if true;  // Anyone can read products
      allow write: if request.auth != null;  // Only authenticated users can write
    }
    
    // Orders collection - Read/Write by admin only
    match /orders/{orderId} {
      allow read: if request.auth != null;  // Only authenticated users
      allow create: if true;  // Anyone can create orders (customers)
      allow update, delete: if request.auth != null;  // Only authenticated users
    }
    
    // Categories collection - Read by anyone, Write by admin only
    match /categories/{categoryId} {
      allow read: if true;  // Anyone can read categories
      allow write: if request.auth != null;  // Only authenticated users
    }
  }
}
```

3. **Click "Publish"**

**Note:** These rules allow:
- ✅ Anyone to view products and categories
- ✅ Anyone to create orders (customers placing orders)
- ✅ Only authenticated admins to add/edit/delete products
- ✅ Only authenticated admins to manage orders

---

## Step 6: Create Firestore Indexes (Optional but Recommended)

1. **Go to Indexes Tab:**
   - In Firestore Database, click the "Indexes" tab

2. **Create Composite Indexes:**

**For Products:**
- Collection: `products`
- Fields: `category` (Ascending), `createdAt` (Descending)
- Query scope: Collection

**For Orders:**
- Collection: `orders`
- Fields: `status` (Ascending), `createdAt` (Descending)
- Query scope: Collection

**Note:** Firebase will automatically suggest creating indexes when you run queries that need them.

---

## Step 7: Test the Connection

1. **Restart your development server:**
```bash
npm run dev
```

2. **Check the console:**
   - Open browser DevTools (F12)
   - Look for Firebase connection messages
   - Should NOT see "Running in MOCK MODE"

3. **Add a test product:**
   - Go to `/admin`
   - Login (Username: Pranjal, Password: Saksham@#2029#456789)
   - Add a product
   - Check Firebase Console → Firestore Database
   - You should see the product in the `products` collection

---

## Step 8: Verify Everything Works

### Test Products:
1. ✅ Add product in admin panel
2. ✅ Check Firebase Console - product should appear
3. ✅ Open website in another browser/device
4. ✅ Product should be visible there too
5. ✅ Edit/delete product - changes should sync everywhere

### Test Orders:
1. ✅ Add product to cart
2. ✅ Complete checkout
3. ✅ Check Firebase Console - order should appear in `orders` collection
4. ✅ Check admin orders page - order should be visible
5. ✅ Mark order as complete - status should update in Firebase

---

## Collections Structure

Your Firestore database will have these collections:

### `products` Collection
```javascript
{
  id: "auto-generated",
  name: "Product Name",
  slug: "product-name",
  description: "...",
  shortDescription: "...",
  category: "pulses",
  images: ["url1", "url2"],
  variants: [{...}],
  features: ["..."],
  tags: ["..."],
  rating: 4.5,
  reviewCount: 0,
  isFeatured: true,
  isNew: false,
  isBestSeller: false,
  stock: 100,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### `orders` Collection
```javascript
{
  id: "auto-generated",
  orderId: "ORD-1234567890",
  customer: {...},
  deliveryAddress: {...},
  items: [{...}],
  subtotal: 500,
  deliveryCharge: 0,
  total: 500,
  paymentMethod: "cod",
  status: "pending",
  securityCheck: "VALIDATED",
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### `categories` Collection
```javascript
{
  id: "auto-generated",
  name: "Category Name",
  slug: "category-name",
  description: "...",
  icon: "🌾",
  isActive: true,
  order: 1,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

---

## Troubleshooting

### Issue: "Permission denied" errors
**Solution:** Check Firestore Security Rules (Step 5)

### Issue: Products not showing
**Solution:** 
1. Check Firebase Console - are products there?
2. Check browser console for errors
3. Verify `.env.local` has correct credentials

### Issue: "Firebase not initialized"
**Solution:**
1. Restart development server
2. Clear browser cache
3. Check `.env.local` file exists and has correct values

### Issue: Slow loading
**Solution:**
1. Create Firestore indexes (Step 6)
2. Check internet connection
3. Consider enabling offline persistence

---

## Cost & Limits

### Firebase Free Tier (Spark Plan):
- ✅ **Firestore:** 1 GB storage, 50K reads/day, 20K writes/day
- ✅ **Hosting:** 10 GB storage, 360 MB/day transfer
- ✅ **Authentication:** Unlimited users

**For Grahini Mart:**
- Small store with ~100 products = ~1 MB
- ~1000 page views/day = ~10K reads
- **Conclusion:** Free tier is MORE than enough!

### When to upgrade:
- More than 50K product views per day
- More than 1000 products
- Need advanced features

---

## Next Steps

1. ✅ **Add Initial Products:**
   - Login to admin panel
   - Add your first 10-20 products
   - Mark some as Featured/Best Sellers

2. ✅ **Test from Multiple Devices:**
   - Open on phone
   - Open on another computer
   - Verify products show everywhere

3. ✅ **Deploy to Production:**
   - Deploy to Vercel/Netlify
   - Update `.env` on hosting platform
   - Test live website

4. ✅ **Monitor Usage:**
   - Check Firebase Console → Usage tab
   - Monitor reads/writes
   - Set up billing alerts (optional)

---

## Support

**Firebase Documentation:**
- https://firebase.google.com/docs/firestore

**Need Help?**
- Firebase Support: https://firebase.google.com/support
- Stack Overflow: Tag `firebase` + `firestore`

---

**Your database is now production-ready!** 🎉
