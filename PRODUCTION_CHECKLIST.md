# ✅ Production Setup Checklist

## What You Need Before We Start

### 1. MongoDB Database
- [ ] Create MongoDB Atlas account: https://www.mongodb.com/cloud/atlas/register
- [ ] Create free cluster (M0)
- [ ] Get connection string
- [ ] Format: `mongodb+srv://username:password@cluster.mongodb.net/grahini-mart`

### 2. SMS Service (Choose One)

**Option A: Twilio** (Recommended)
- [ ] Sign up: https://www.twilio.com/try-twilio
- [ ] Get Account SID
- [ ] Get Auth Token
- [ ] Get Phone Number
- [ ] You get $15 free credit

**Option B: MSG91** (India-focused, cheaper)
- [ ] Sign up: https://msg91.com/
- [ ] Get Auth Key
- [ ] Get Template ID
- [ ] Better rates for Indian numbers

**Option C: Fast2SMS** (India, simple)
- [ ] Sign up: https://www.fast2sms.com/
- [ ] Get API Key
- [ ] Good for testing

### 3. Environment Setup
- [ ] Node.js installed
- [ ] Project running locally
- [ ] `.env.local` file ready

---

## Quick Start (5 Steps)

### Step 1: Get MongoDB Connection String (5 min)
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up (free)
3. Create cluster → Choose M0 (Free)
4. Wait 3-5 minutes for cluster creation
5. Click "Connect" → "Connect your application"
6. Copy connection string
7. Replace `<password>` with your password

**Example:**
```
mongodb+srv://grahinimart:MyPass123@cluster0.xxxxx.mongodb.net/grahini-mart
```

### Step 2: Get Twilio Credentials (5 min)
1. Go to https://www.twilio.com/try-twilio
2. Sign up (free $15 credit)
3. Go to Console Dashboard
4. Copy Account SID
5. Copy Auth Token
6. Get a phone number (Phone Numbers → Buy a number)

### Step 3: Install Packages (2 min)
```bash
npm install mongodb mongoose twilio bcryptjs jsonwebtoken
npm install --save-dev @types/bcryptjs @types/jsonwebtoken
```

### Step 4: Update Environment Variables (2 min)
Create/update `.env.local`:

```bash
# MongoDB
MONGODB_URI=your_mongodb_connection_string_here

# JWT Secret (generate random string)
JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long

# Twilio
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# Admin
ADMIN_USERNAME=Pranjal
ADMIN_PASSWORD=Saksham@#2029#456789

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### Step 5: Tell Me You're Ready! (1 min)
Once you have:
- ✅ MongoDB connection string
- ✅ Twilio credentials (or MSG91/Fast2SMS)
- ✅ Environment variables ready

**Reply with: "Ready for production setup"**

And I'll create all the necessary files!

---

## What I'll Create for You

Once you're ready, I'll create:

### Backend Files
1. ✅ MongoDB connection (`src/lib/mongodb.ts`)
2. ✅ User model (`src/models/User.ts`)
3. ✅ OTP model (`src/models/OTP.ts`)
4. ✅ Product model (`src/models/Product.ts`)
5. ✅ Order model (`src/models/Order.ts`)

### API Routes
6. ✅ Send OTP API (`/api/auth/send-otp`)
7. ✅ Verify OTP API (`/api/auth/verify-otp`)
8. ✅ Admin login API (`/api/auth/admin-login`)
9. ✅ Get user API (`/api/auth/me`)
10. ✅ Products API (`/api/products`)

### Services
11. ✅ OTP service (`src/lib/otp.ts`)
12. ✅ Auth utilities (`src/lib/auth.ts`)
13. ✅ JWT utilities (`src/lib/jwt.ts`)

### Updated Components
14. ✅ Auth page with real OTP
15. ✅ Admin login with password
16. ✅ Protected admin routes
17. ✅ User context provider

### Migration
18. ✅ Data migration script
19. ✅ Setup instructions

---

## Alternative: Use Demo Credentials First

If you want to test the flow before setting up real services:

### Demo MongoDB (for testing)
```bash
MONGODB_URI=mongodb://localhost:27017/grahini-mart
```
(Requires MongoDB installed locally)

### Demo OTP (console logging)
I can create a demo mode that logs OTP to console instead of sending SMS.

---

## Cost Breakdown

### Free Tier (Perfect for Testing)
- MongoDB Atlas M0: **Free forever**
- Twilio Trial: **$15 credit** (~500 SMS)
- Vercel Hosting: **Free**
- **Total: $0**

### Production (Monthly)
- MongoDB Atlas M0: **Free** (up to 512MB)
- Twilio SMS: **~₹0.60 per SMS**
- Vercel: **Free** (hobby plan)
- **Total: Pay only for SMS sent**

**Example:** 100 customers/month = 100 OTPs = ₹60/month

---

## Security Features I'll Implement

1. ✅ **Password Hashing** - Admin password encrypted with bcrypt
2. ✅ **JWT Tokens** - Secure session management
3. ✅ **OTP Expiry** - OTPs expire in 10 minutes
4. ✅ **Rate Limiting** - Prevent OTP spam
5. ✅ **Phone Validation** - Verify phone number format
6. ✅ **Admin Protection** - Only Pranjal can access admin
7. ✅ **HTTPS** - Secure connections (Vercel provides)
8. ✅ **Environment Secrets** - Credentials never in code

---

## FAQ

### Q: Do I need to pay for MongoDB?
**A:** No! MongoDB Atlas M0 (free tier) is perfect for your store. It's free forever and supports up to 512MB data.

### Q: How much do SMS cost?
**A:** Twilio: ~₹0.60 per SMS. MSG91: ~₹0.15 per SMS. You only pay for OTPs sent.

### Q: Can I test without SMS?
**A:** Yes! I can create a demo mode that logs OTP to console for testing.

### Q: Is my admin password secure?
**A:** Yes! It's hashed with bcrypt and never stored in plain text. Only you know the password.

### Q: What if I forget admin password?
**A:** You can change it in environment variables and redeploy.

### Q: Can I add more admins?
**A:** Yes! I'll show you how to add more admin users to the database.

---

## Ready to Start?

### Option 1: Full Production Setup
Get MongoDB + Twilio credentials, then tell me you're ready!

### Option 2: Demo Mode First
I can create a demo mode with:
- Local MongoDB (or mock)
- Console OTP logging
- Test everything before going live

**Which option do you prefer?**

---

**Reply with your choice and I'll proceed!** 🚀

---

**Made with ❤️ for Grahini Mart**
