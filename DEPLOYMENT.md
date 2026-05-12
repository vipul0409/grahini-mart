# 🚀 Deployment Guide

## Prerequisites

- Node.js 18+ installed
- Firebase account
- Razorpay account
- Vercel account (for deployment)

## Step 1: Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email/Password and Phone)
4. Create Firestore Database
5. Enable Storage
6. Get your Firebase config from Project Settings

## Step 2: Razorpay Setup

1. Sign up at [Razorpay](https://razorpay.com/)
2. Get your API keys from Dashboard > Settings > API Keys
3. Note down Key ID and Key Secret

## Step 3: Environment Variables

1. Copy `.env.example` to `.env.local`
2. Fill in all the required values:

```bash
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
```

## Step 4: Install Dependencies

```bash
npm install
```

## Step 5: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Step 6: Deploy to Vercel

### Option 1: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

### Option 2: Using Vercel Dashboard

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables in Project Settings
6. Deploy!

## Step 7: Configure Domain (Optional)

1. Go to Project Settings > Domains
2. Add your custom domain
3. Update DNS records as instructed

## Step 8: Post-Deployment

1. Test all features
2. Set up Firebase Security Rules
3. Configure Razorpay webhooks
4. Enable Firebase Analytics
5. Set up monitoring and alerts

## Firebase Security Rules

### Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Products (public read, admin write)
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Orders
    match /orders/{orderId} {
      allow read: if request.auth != null && 
        resource.data.userId == request.auth.uid;
      allow create: if request.auth != null;
      allow update: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

### Storage Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Performance Optimization

1. **Image Optimization**: Already configured with Next.js Image component
2. **Code Splitting**: Automatic with Next.js
3. **Caching**: Configure in `next.config.js`
4. **CDN**: Vercel provides global CDN automatically

## Monitoring

1. **Vercel Analytics**: Enable in Project Settings
2. **Firebase Analytics**: Already configured
3. **Error Tracking**: Consider adding Sentry

## Backup Strategy

1. Set up automated Firestore backups
2. Regular database exports
3. Version control for code

## Security Checklist

- [ ] Environment variables secured
- [ ] Firebase rules configured
- [ ] HTTPS enabled
- [ ] API keys restricted
- [ ] Rate limiting enabled
- [ ] Input validation implemented
- [ ] XSS protection enabled
- [ ] CSRF protection enabled

## Support

For issues or questions:
- Email: support@spiceandgrain.com
- Documentation: [Link to docs]
- GitHub Issues: [Link to repo]
