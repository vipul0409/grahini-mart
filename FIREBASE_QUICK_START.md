# 🚀 Firebase Quick Start Guide - Grahini Mart

## Step-by-Step Setup (10 minutes)

---

## ✅ Step 1: Choose Firebase Products

You need these 3 products:

### 1. ✅ **Cloud Firestore** (Database)
- **Purpose:** Store products, orders, categories
- **Action:** Enable this ✓

### 2. ⚠️ **Firebase Authentication** (Optional for now)
- **Purpose:** Admin login (currently using simple password)
- **Action:** Skip for now (can add later)

### 3. ⚠️ **Firebase Hosting** (Optional)
- **Purpose:** Host your website (you'll use Vercel instead)
- **Action:** Skip for now

**Summary:** Only enable **Cloud Firestore** for now!

---

## ✅ Step 2: Set Up Firebase Products

### **2.1: Create Firebase Project**

1. **Go to:** https://console.firebase.google.com/

2. **Click:** "Add project" (big blue button)

3. **Enter project name:**
   ```
   grahini-mart
   ```
   (or any name you like)

4. **Click:** "Continue"

5. **Google Analytics:**
   - Toggle OFF (you don't need it)
   - Click "Create project"

6. **Wait ~30 seconds** for project creation

7. **Click:** "Continue" when ready

---

### **2.2: Enable Cloud Firestore**

1. **In Firebase Console, click:** "Firestore Database" (left sidebar)

2. **Click:** "Create database" button

3. **Choose mode:**
   - Select: **"Start in production mode"**
   - Click "Next"

4. **Choose location:**
   - Select: **"asia-south1 (Mumbai)"** (closest to India)
   - Click "Enable"

5. **Wait ~1 minute** for database creation

6. **You'll see:** Empty database with "Start collection" button

---

### **2.3: Set Security Rules**

1. **Click:** "Rules" tab (top of Firestore page)

2. **Delete everything** in the editor

3. **Copy and paste this:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Products - Anyone can read, only you can write
    match /products/{productId} {
      allow read: if true;
      allow write: if true;  // Temporary - anyone can write for testing
    }
    
    // Orders - Anyone can create, only you can read/update
    match /orders/{orderId} {
      allow read: if true;
      allow create: if true;
      allow update: if true;
    }
    
    // Categories - Anyone can read, only you can write
    match /categories/{categoryId} {
      allow read: if true;
      allow write: if true;  // Temporary - anyone can write for testing
    }
  }
}
```

4. **Click:** "Publish" button

5. **Done!** Security rules are set

**Note:** These rules allow anyone to write (for testing). We'll secure them later.

---

## ✅ Step 3: Register Your App

### **3.1: Add Web App**

1. **In Firebase Console, click:** Project Overview (top left)

2. **Click:** Web icon `</>` (under "Get started by adding Firebase to your app")

3. **Enter app nickname:**
   ```
   Grahini Mart Web
   ```

4. **Firebase Hosting:**
   - Leave UNCHECKED (we'll use Vercel)

5. **Click:** "Register app"

---

### **3.2: Copy Configuration**

You'll see a code snippet like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC1234567890abcdefghijklmnop",
  authDomain: "grahini-mart.firebaseapp.com",
  projectId: "grahini-mart",
  storageBucket: "grahini-mart.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456"
};
```

**IMPORTANT:** Copy these 6 values! You'll need them next.

6. **Click:** "Continue to console"

---

## ✅ Step 4: Connect Your App's Code

### **4.1: Update Environment Variables**

1. **Open your project** in VS Code

2. **Open file:** `.env.local` (in root folder)

3. **Find these lines:**
```env
# Firebase Configuration (DUMMY - Replace later)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDummyKeyForDevelopment123456789
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=spice-and-grain-dummy.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=spice-and-grain-dummy
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=spice-and-grain-dummy.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abc123def456
```

4. **Replace with YOUR values** from Step 3.2:

```env
# Firebase Configuration (REAL CREDENTIALS)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC1234567890abcdefghijklmnop
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=grahini-mart.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=grahini-mart
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=grahini-mart.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abc123def456
```

5. **Save the file** (Ctrl+S or Cmd+S)

---

### **4.2: Restart Development Server**

1. **Stop the server** (if running):
   - Press `Ctrl+C` in terminal

2. **Start again:**
   ```bash
   npm run dev
   ```

3. **Check console output:**
   - Should NOT see "Running in MOCK MODE"
   - If you see it, check `.env.local` again

---

## ✅ Step 5: Test Everything

### **5.1: Test Adding Product**

1. **Open browser:** http://localhost:3000

2. **Go to admin:** http://localhost:3000/admin

3. **Login:**
   - Username: `Pranjal`
   - Password: `Saksham@#2029#456789`

4. **Click:** "Add Product" button

5. **Fill in product details:**
   ```
   Name: Test Product
   Description: This is a test product
   Category: pulses
   Price: 100
   MRP: 150
   Stock: 50
   ```

6. **Click:** "Add Product"

7. **Check Firebase Console:**
   - Go to Firestore Database
   - You should see a new document in `products` collection!

---

### **5.2: Test Viewing Product**

1. **Open homepage:** http://localhost:3000

2. **You should see your test product!**

3. **Open in another browser** (Chrome, Firefox, Edge)
   - Product should be visible there too!

4. **Open on your phone:**
   - Connect to same WiFi
   - Go to: http://YOUR_COMPUTER_IP:3000
   - Product should be visible!

---

### **5.3: Test Placing Order**

1. **Add product to cart**

2. **Go to checkout**

3. **Fill in details:**
   ```
   Name: Test Customer
   Phone: 9876543210
   Address: Test Address, Test City
   Pincode: 123456
   ```

4. **Click:** "Place Order"

5. **Check Firebase Console:**
   - Go to Firestore Database
   - Click "orders" collection
   - You should see your order!

6. **Check Admin Orders:**
   - Go to: http://localhost:3000/admin/orders
   - Your order should be listed!

---

## ✅ Verification Checklist

Check all these:

- [ ] Firebase project created
- [ ] Firestore Database enabled
- [ ] Security rules published
- [ ] Web app registered
- [ ] `.env.local` updated with real credentials
- [ ] Development server restarted
- [ ] Test product added successfully
- [ ] Product visible in Firebase Console
- [ ] Product visible on website
- [ ] Product visible in another browser
- [ ] Test order placed successfully
- [ ] Order visible in Firebase Console
- [ ] Order visible in admin panel

---

## 🎉 Success!

If all checkboxes are checked, you're done! Your database is now:

✅ **Live and working**
✅ **Accessible from anywhere**
✅ **Permanent storage**
✅ **Production ready**

---

## 🔧 Troubleshooting

### **Issue: Still seeing "MOCK MODE" message**

**Solution:**
1. Check `.env.local` file
2. Make sure values are correct (no extra spaces)
3. Restart server: `Ctrl+C` then `npm run dev`
4. Hard refresh browser: `Ctrl+Shift+R`

---

### **Issue: "Permission denied" error**

**Solution:**
1. Go to Firebase Console → Firestore → Rules
2. Make sure rules are published
3. Check rules allow `read: if true` and `write: if true`

---

### **Issue: Products not showing**

**Solution:**
1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Check Network tab for failed requests
4. Verify Firebase credentials in `.env.local`

---

### **Issue: Can't add products**

**Solution:**
1. Check browser console for errors
2. Verify Firestore rules allow write
3. Check Firebase Console → Usage tab (not exceeded limits)

---

## 📞 Need Help?

### **Check These First:**
1. Browser console (F12 → Console tab)
2. Terminal output (where `npm run dev` is running)
3. Firebase Console → Firestore → Data tab

### **Common Mistakes:**
- ❌ Forgot to restart server after updating `.env.local`
- ❌ Extra spaces in `.env.local` values
- ❌ Wrong Firebase project selected
- ❌ Firestore rules not published

---

## 🚀 Next Steps

### **After Testing:**

1. **Add Real Products:**
   - Login to admin panel
   - Add 10-20 real products
   - Upload product images

2. **Test from Multiple Devices:**
   - Phone
   - Tablet
   - Different computers

3. **Deploy to Production:**
   - Push code to GitHub
   - Deploy to Vercel
   - Add Firebase credentials to Vercel environment variables

4. **Secure Firestore Rules:**
   - Add proper authentication
   - Restrict write access to admin only

---

## 📚 Resources

- **Firebase Console:** https://console.firebase.google.com/
- **Firestore Docs:** https://firebase.google.com/docs/firestore
- **Your Project:** https://console.firebase.google.com/project/YOUR_PROJECT_ID

---

**You're all set! Start adding products and building your store!** 🎉
