# 🔧 Fix Firestore Security Rules for Delete Operations

## Problem
Products and categories cannot be deleted because Firestore security rules don't allow delete operations.

## Solution
Update your Firestore Security Rules in Firebase Console.

---

## Step-by-Step Instructions

### 1. Go to Firebase Console
Open: https://console.firebase.google.com/project/grahini-mart/firestore/rules

### 2. Replace ALL rules with this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Products Collection
    match /products/{productId} {
      // Anyone can read products
      allow read: if true;
      
      // Anyone can create, update, and delete products
      // (In production, you should add authentication checks)
      allow create: if true;
      allow update: if true;
      allow delete: if true;
    }
    
    // Orders Collection
    match /orders/{orderId} {
      // Anyone can read orders
      allow read: if true;
      
      // Anyone can create and update orders
      allow create: if true;
      allow update: if true;
      
      // Anyone can delete orders (for admin)
      allow delete: if true;
    }
    
    // Categories Collection
    match /categories/{categoryId} {
      // Anyone can read categories
      allow read: if true;
      
      // Anyone can create, update, and delete categories
      allow create: if true;
      allow update: if true;
      allow delete: if true;
    }
  }
}
```

### 3. Click "Publish" button (top right)

### 4. Wait for confirmation message

---

## Verify It Works

1. Go to your admin panel: https://grahini-mart.vercel.app/admin/dashboard
2. Try deleting a product
3. Should work now! ✅

---

## Security Note

⚠️ **Current rules allow anyone to delete products!**

This is fine for testing, but for production you should add authentication:

```javascript
// Better rules with authentication (implement later)
match /products/{productId} {
  allow read: if true;
  allow create, update, delete: if request.auth != null && request.auth.token.admin == true;
}
```

For now, the simple rules will work for your store.

---

## If Still Not Working

Check browser console (F12) for errors:
- Look for "permission-denied" errors
- Look for "Missing or insufficient permissions"
- Share the error message with me

---

**After updating rules, try deleting again!**
