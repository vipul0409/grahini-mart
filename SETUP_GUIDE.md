# 🚀 Complete Setup Guide

This guide will walk you through setting up the Spice & Grain ecommerce application from scratch.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Firebase Configuration](#firebase-configuration)
4. [Razorpay Configuration](#razorpay-configuration)
5. [Environment Variables](#environment-variables)
6. [Running the Application](#running-the-application)
7. [Database Setup](#database-setup)
8. [Testing](#testing)
9. [Deployment](#deployment)
10. [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.0.0 or higher
  ```bash
  node --version  # Should be v18.0.0 or higher
  ```

- **npm**: Version 9.0.0 or higher (comes with Node.js)
  ```bash
  npm --version
  ```

- **Git**: For version control
  ```bash
  git --version
  ```

- **Code Editor**: VS Code recommended with these extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript and JavaScript Language Features

## Local Development Setup

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone <repository-url>
cd spice-and-grain

# Or if starting fresh, create the directory
mkdir spice-and-grain
cd spice-and-grain
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js
- React
- Tailwind CSS
- Framer Motion
- Firebase
- Zustand
- And more...

### Step 3: Verify Installation

```bash
# Check if all packages are installed
npm list --depth=0
```

## Firebase Configuration

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Enter project name: "spice-and-grain"
4. Disable Google Analytics (optional)
5. Click "Create Project"

### Step 2: Enable Authentication

1. In Firebase Console, go to **Authentication**
2. Click "Get Started"
3. Enable **Email/Password** authentication
4. Enable **Phone** authentication (optional)
5. Add authorized domains (localhost, your domain)

### Step 3: Create Firestore Database

1. Go to **Firestore Database**
2. Click "Create Database"
3. Choose "Start in test mode" (we'll add rules later)
4. Select location (closest to your users)
5. Click "Enable"

### Step 4: Enable Storage

1. Go to **Storage**
2. Click "Get Started"
3. Start in test mode
4. Click "Done"

### Step 5: Get Firebase Config

1. Go to **Project Settings** (gear icon)
2. Scroll to "Your apps"
3. Click web icon (</>) to add web app
4. Register app with nickname "spice-and-grain-web"
5. Copy the config object:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "spice-and-grain.firebaseapp.com",
  projectId: "spice-and-grain",
  storageBucket: "spice-and-grain.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### Step 6: Set Up Firebase Security Rules

**Firestore Rules** (Firestore Database > Rules):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to products
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // User data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Orders
    match /orders/{orderId} {
      allow read: if request.auth != null && 
        (resource.data.userId == request.auth.uid || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
      allow create: if request.auth != null;
      allow update: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

**Storage Rules** (Storage > Rules):
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Razorpay Configuration

### Step 1: Create Razorpay Account

1. Go to [Razorpay](https://razorpay.com/)
2. Sign up for an account
3. Complete KYC verification (for live mode)

### Step 2: Get API Keys

1. Go to **Settings** > **API Keys**
2. Generate Test Keys (for development)
3. Note down:
   - **Key ID**: `rzp_test_...`
   - **Key Secret**: `...`

### Step 3: Configure Webhooks (Optional)

1. Go to **Settings** > **Webhooks**
2. Add webhook URL: `https://yourdomain.com/api/webhooks/razorpay`
3. Select events: `payment.captured`, `payment.failed`
4. Save webhook secret

## Environment Variables

### Step 1: Create Environment File

```bash
cp .env.example .env.local
```

### Step 2: Fill in Variables

Edit `.env.local` with your actual values:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=spice-and-grain.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=spice-and-grain
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=spice-and-grain.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

# Firebase Admin (for server-side)
FIREBASE_ADMIN_PROJECT_ID=spice-and-grain
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-...@spice-and-grain.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=...

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210

# Admin
ADMIN_EMAIL=admin@spiceandgrain.com

# Google Maps (Optional)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=...
```

### Step 3: Verify Environment Variables

```bash
# Check if .env.local exists
ls -la | grep .env.local

# Make sure it's in .gitignore
cat .gitignore | grep .env
```

## Running the Application

### Development Mode

```bash
npm run dev
```

The application will start at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

## Database Setup

### Step 1: Create Collections

In Firestore, create these collections:
- `products`
- `users`
- `orders`
- `categories`
- `coupons`
- `banners`
- `reviews`

### Step 2: Add Sample Data

You can use the Firebase Console to manually add sample data, or create a seed script:

```typescript
// scripts/seed.ts
import { db } from '@/lib/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { sampleProducts } from '@/lib/sampleData'

async function seedDatabase() {
  for (const product of sampleProducts) {
    await addDoc(collection(db, 'products'), product)
  }
  console.log('Database seeded!')
}

seedDatabase()
```

### Step 3: Create Admin User

1. Sign up through the app
2. Go to Firestore Console
3. Find your user document in `users` collection
4. Add field: `role: "admin"`

## Testing

### Manual Testing Checklist

- [ ] Homepage loads correctly
- [ ] Products page displays products
- [ ] Product detail page works
- [ ] Add to cart functionality
- [ ] Cart drawer opens and updates
- [ ] Checkout flow works
- [ ] Payment integration works (test mode)
- [ ] User authentication works
- [ ] Admin dashboard accessible
- [ ] Mobile responsive design

### Test Accounts

**Test User:**
- Email: test@example.com
- Password: Test123!

**Test Admin:**
- Email: admin@example.com
- Password: Admin123!

**Test Cards (Razorpay):**
- Success: 4111 1111 1111 1111
- Failure: 4000 0000 0000 0002

## Deployment

### Deploy to Vercel

#### Option 1: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

#### Option 2: GitHub Integration

1. Push code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: .next
6. Add environment variables
7. Click "Deploy"

### Post-Deployment

1. **Update Firebase Authorized Domains:**
   - Go to Firebase Console > Authentication > Settings
   - Add your Vercel domain to authorized domains

2. **Update Razorpay Webhook:**
   - Update webhook URL to production domain

3. **Test Production:**
   - Test all critical flows
   - Check payment integration
   - Verify email notifications

## Troubleshooting

### Common Issues

#### 1. Firebase Connection Error

**Error:** "Firebase: Error (auth/configuration-not-found)"

**Solution:**
- Check if all Firebase environment variables are set
- Verify Firebase config in `.env.local`
- Restart development server

#### 2. Module Not Found

**Error:** "Module not found: Can't resolve '@/components/...'"

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

#### 3. Tailwind Styles Not Working

**Solution:**
- Check if `tailwind.config.ts` is correct
- Verify `globals.css` imports Tailwind
- Restart development server

#### 4. Build Errors

**Error:** Type errors during build

**Solution:**
```bash
# Run type check
npm run type-check

# Fix type errors
# Then rebuild
npm run build
```

#### 5. Environment Variables Not Loading

**Solution:**
- Ensure file is named `.env.local` (not `.env`)
- Restart development server after changes
- Check for typos in variable names
- Public variables must start with `NEXT_PUBLIC_`

### Getting Help

If you encounter issues:

1. Check the [Next.js Documentation](https://nextjs.org/docs)
2. Check the [Firebase Documentation](https://firebase.google.com/docs)
3. Search [Stack Overflow](https://stackoverflow.com)
4. Open an issue on GitHub
5. Contact support: support@spiceandgrain.com

## Next Steps

After setup is complete:

1. ✅ Customize branding (colors, logo, content)
2. ✅ Add real product data
3. ✅ Configure payment gateway for production
4. ✅ Set up email notifications
5. ✅ Configure domain name
6. ✅ Set up SSL certificate
7. ✅ Enable analytics
8. ✅ Set up monitoring
9. ✅ Create backup strategy
10. ✅ Launch! 🚀

## Maintenance

### Regular Tasks

**Daily:**
- Monitor error logs
- Check order processing
- Respond to customer queries

**Weekly:**
- Review analytics
- Update product inventory
- Check performance metrics

**Monthly:**
- Database backup
- Security audit
- Dependency updates
- Performance optimization

### Updates

```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Update Next.js
npm install next@latest react@latest react-dom@latest

# Update all dependencies (carefully!)
npm update --save
```

---

**Congratulations! 🎉** Your Spice & Grain ecommerce application is now set up and ready to go!
