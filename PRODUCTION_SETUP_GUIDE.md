# 🚀 Production Setup Guide - Grahini Mart

## Overview

This guide will help you set up your Grahini Mart website for **production** with:
- ✅ Real MongoDB database
- ✅ OTP-based authentication
- ✅ Secure admin access (Pranjal / Saksham@#2029#456789)
- ✅ SMS OTP via Twilio or MSG91
- ✅ Auto signup for new users
- ✅ Protected admin panel

---

## 📋 Prerequisites

### 1. MongoDB Database
You need a MongoDB database. Choose one:

**Option A: MongoDB Atlas (Recommended - Free)**
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Create free account
3. Create a cluster (M0 Free tier)
4. Get connection string

**Option B: Local MongoDB**
1. Install MongoDB locally
2. Use connection string: `mongodb://localhost:27017/grahini-mart`

### 2. SMS Service for OTP
Choose one SMS provider:

**Option A: Twilio (Recommended)**
- Sign up: https://www.twilio.com/try-twilio
- Get: Account SID, Auth Token, Phone Number
- Free trial: $15 credit

**Option B: MSG91 (India-focused)**
- Sign up: https://msg91.com/
- Get: Auth Key, Template ID
- Cheaper for Indian numbers

**Option C: Fast2SMS (India)**
- Sign up: https://www.fast2sms.com/
- Get: API Key
- Good for testing

---

## 🔧 Step-by-Step Setup

### Step 1: Install Required Packages

```bash
npm install mongodb mongoose twilio bcryptjs jsonwebtoken
npm install --save-dev @types/bcryptjs @types/jsonwebtoken
```

### Step 2: Set Up Environment Variables

Update your `.env.local` file:

```bash
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/grahini-mart?retryWrites=true&w=majority

# JWT Secret (generate a random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Twilio (for OTP)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# OR MSG91 (alternative)
MSG91_AUTH_KEY=your_msg91_auth_key
MSG91_TEMPLATE_ID=your_template_id

# Admin Credentials
ADMIN_USERNAME=Pranjal
ADMIN_PASSWORD=Saksham@#2029#456789

# App Settings
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### Step 3: Get MongoDB Connection String

**From MongoDB Atlas:**
1. Go to your cluster
2. Click "Connect"
3. Choose "Connect your application"
4. Copy connection string
5. Replace `<password>` with your password
6. Replace `<dbname>` with `grahini-mart`

**Example:**
```
mongodb+srv://grahinimart:MyPassword123@cluster0.xxxxx.mongodb.net/grahini-mart?retryWrites=true&w=majority
```

### Step 4: Get Twilio Credentials

1. Sign up at https://www.twilio.com/try-twilio
2. Go to Console Dashboard
3. Copy:
   - Account SID
   - Auth Token
4. Get a phone number:
   - Go to Phone Numbers
   - Buy a number (or use trial number)
5. Add to `.env.local`

### Step 5: Create Database Models

I'll create the necessary files for you. The system will:
- Store users in MongoDB
- Send OTP via SMS
- Auto-create accounts for new numbers
- Verify OTP before login
- Protect admin panel with password

---

## 🔐 Security Features

### User Authentication
1. User enters phone number
2. System checks if number exists in DB
3. If new: Auto-signup (create account)
4. If existing: Login flow
5. Send 6-digit OTP via SMS
6. User enters OTP
7. Verify OTP
8. Create JWT token
9. User logged in

### Admin Authentication
1. Admin goes to `/admin`
2. Enters username: `Pranjal`
3. Enters password: `Saksham@#2029#456789`
4. Password hashed and verified
5. Admin logged in
6. Only admin can access admin panel

### Security Measures
- ✅ Passwords hashed with bcrypt
- ✅ JWT tokens for sessions
- ✅ OTP expires in 10 minutes
- ✅ Rate limiting on OTP requests
- ✅ Admin password never stored in plain text
- ✅ Environment variables for secrets

---

## 📊 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  phone: "+919876543210",
  name: "Customer Name",
  email: "customer@example.com",
  role: "customer", // or "admin"
  isVerified: true,
  createdAt: Date,
  updatedAt: Date
}
```

### OTP Collection
```javascript
{
  _id: ObjectId,
  phone: "+919876543210",
  otp: "123456",
  expiresAt: Date,
  verified: false,
  createdAt: Date
}
```

### Products Collection
```javascript
{
  _id: ObjectId,
  name: "Premium Toor Dal",
  slug: "premium-toor-dal",
  description: "...",
  category: "pulses",
  images: ["url1", "url2"],
  variants: [...],
  stock: 100,
  createdAt: Date,
  updatedAt: Date
}
```

### Orders Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  items: [...],
  total: 1500,
  status: "pending",
  paymentMethod: "cod",
  deliveryAddress: {...},
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🚀 Deployment Checklist

### Before Going Live

- [ ] MongoDB database created
- [ ] Connection string added to `.env.local`
- [ ] SMS service configured (Twilio/MSG91)
- [ ] JWT secret generated (use: `openssl rand -base64 32`)
- [ ] Admin credentials set in environment
- [ ] Test OTP flow locally
- [ ] Test admin login
- [ ] Test user signup/login
- [ ] Deploy to Vercel
- [ ] Add environment variables to Vercel
- [ ] Test on production

### Environment Variables for Vercel

When deploying to Vercel, add these:
1. Go to Project Settings → Environment Variables
2. Add all variables from `.env.local`
3. Make sure to use production values
4. Redeploy

---

## 💰 Cost Estimate

### Free Tier (Testing)
- MongoDB Atlas: Free (M0 cluster)
- Twilio: $15 trial credit (~500 SMS)
- Vercel: Free hosting
- **Total: $0** (using trial credits)

### Production (Monthly)
- MongoDB Atlas: $0 (M0) or $9 (M10)
- Twilio: ~$0.0075 per SMS (₹0.60)
- MSG91: ~₹0.15 per SMS (cheaper for India)
- Vercel: Free (or $20 for Pro)
- **Total: ~$0-30/month** depending on usage

---

## 🔄 Migration from Demo to Production

### Step 1: Export Demo Data
Your current products are in localStorage. We'll migrate them to MongoDB.

### Step 2: Import to MongoDB
I'll create a migration script to move data.

### Step 3: Update Code
Switch from localStorage to MongoDB API calls.

### Step 4: Test
Test all features with real database.

---

## 🆘 Troubleshooting

### MongoDB Connection Failed
- Check connection string format
- Verify username/password
- Check IP whitelist in MongoDB Atlas
- Add `0.0.0.0/0` to allow all IPs (for testing)

### OTP Not Sending
- Check Twilio credentials
- Verify phone number format (+91...)
- Check Twilio balance
- Check phone number is verified (trial mode)

### Admin Login Not Working
- Check environment variables loaded
- Verify password exactly matches
- Check bcrypt comparison
- Clear browser cache

### JWT Token Issues
- Generate new JWT secret
- Check token expiration
- Verify secret in environment

---

## 📞 Next Steps

I'll now create the following files for you:

1. **Database connection** (`src/lib/mongodb.ts`)
2. **User model** (`src/models/User.ts`)
3. **OTP model** (`src/models/OTP.ts`)
4. **Product model** (`src/models/Product.ts`)
5. **Auth API routes** (`src/app/api/auth/...`)
6. **OTP service** (`src/lib/otp.ts`)
7. **Updated auth components**
8. **Admin middleware**
9. **Migration script**

---

## ⚠️ Important Security Notes

1. **Never commit `.env.local`** to Git
2. **Use strong JWT secret** (32+ characters)
3. **Enable MongoDB IP whitelist** in production
4. **Use HTTPS** in production (Vercel provides this)
5. **Rate limit OTP requests** (prevent spam)
6. **Validate phone numbers** (format checking)
7. **Hash admin password** (never store plain text)

---

## 🎉 Ready?

Once you have:
- ✅ MongoDB connection string
- ✅ Twilio/MSG91 credentials
- ✅ Environment variables set

I'll create all the necessary files to make your site production-ready!

**Let me know when you're ready, and I'll proceed with the implementation!** 🚀

---

**Made with ❤️ for Grahini Mart**
