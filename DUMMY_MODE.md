# 🔧 Running in Dummy Mode

Your app is currently configured with **dummy credentials** so you can start developing immediately without Firebase or Razorpay accounts.

## ✅ What Works in Dummy Mode

### Fully Functional
- ✅ **UI/UX**: All pages and components display correctly
- ✅ **Navigation**: Browse all pages and sections
- ✅ **Product Browsing**: View products (using sample data)
- ✅ **Shopping Cart**: Add/remove items, update quantities
- ✅ **Filters & Search**: Product filtering works
- ✅ **Responsive Design**: Test on all device sizes
- ✅ **Animations**: All Framer Motion animations work
- ✅ **State Management**: Cart and UI state persist

### Limited Functionality (Mock Mode)
- ⚠️ **Authentication**: Login/signup will show console logs only
- ⚠️ **Database**: No real data persistence (uses sample data)
- ⚠️ **Payments**: Checkout will show mock success
- ⚠️ **File Upload**: Returns placeholder images
- ⚠️ **Orders**: Order data not saved to database

## 🎯 Current Status

```
🔧 MOCK MODE ACTIVE
📝 Using dummy Firebase credentials
💳 Using dummy Razorpay credentials
✅ App runs without real backend
```

## 🚀 What You Can Do Now

### 1. Explore the UI
```bash
npm run dev
```
Visit http://localhost:3000 and explore:
- Homepage with hero slider
- Product listing with filters
- Product cards and details
- Shopping cart
- Checkout flow
- Mobile responsive design

### 2. Customize Design
- Edit colors in `tailwind.config.ts`
- Update content in `src/lib/constants.ts`
- Modify components in `src/components/`
- Add your logo and images

### 3. Test Features
- Add products to cart
- Update quantities
- Apply filters
- Test mobile navigation
- Check responsive design

### 4. Review Code
- Study component structure
- Understand state management
- Review routing setup
- Explore utilities

## 🔄 When to Switch to Real Credentials

Switch to real Firebase/Razorpay when you need:
- ✅ Real user authentication
- ✅ Data persistence
- ✅ Actual payment processing
- ✅ Order management
- ✅ User accounts
- ✅ Production deployment

## 📝 How to Switch to Real Credentials

### Step 1: Set Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email/Password)
4. Create Firestore Database
5. Enable Storage
6. Copy your config from Project Settings

### Step 2: Set Up Razorpay

1. Sign up at [Razorpay](https://razorpay.com/)
2. Get test API keys from Settings > API Keys
3. Note down Key ID and Secret

### Step 3: Update .env.local

Replace the dummy values in `.env.local`:

```bash
# Replace these with your real Firebase config
NEXT_PUBLIC_FIREBASE_API_KEY=your_real_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Replace with your real Razorpay keys
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_secret_key
```

### Step 4: Restart Dev Server

```bash
# Stop the current server (Ctrl+C)
# Start again
npm run dev
```

The app will automatically detect real credentials and switch from mock mode!

## 🎨 Customization in Dummy Mode

You can fully customize the app even in dummy mode:

### Change Brand Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    500: '#YOUR_COLOR', // Change saffron
  },
  secondary: {
    500: '#YOUR_COLOR', // Change green
  },
}
```

### Update Site Name
Edit `src/lib/constants.ts`:
```typescript
export const SITE_NAME = 'Your Store Name'
export const SITE_DESCRIPTION = 'Your description'
```

### Modify Sample Products
Edit `src/lib/sampleData.ts` to change product data

### Add Your Logo
Replace the emoji logo in `src/components/layout/Header.tsx`

## 📊 Sample Data

The app includes sample data for:
- ✅ 6 Products (pulses, dry fruits, spices)
- ✅ 3 Banners for hero slider
- ✅ 6 Categories
- ✅ 3 Testimonials
- ✅ Product variants (weights)
- ✅ Pricing and discounts

## 🔍 Console Messages

In dummy mode, you'll see helpful console messages:

```
🔧 Running in MOCK MODE with dummy Firebase credentials
📝 To use real Firebase, update credentials in .env.local
Mock login: user@example.com
Mock add to products: {...}
```

These are normal and help you understand what would happen with real credentials.

## ⚠️ Limitations

### Cannot Do in Dummy Mode
- ❌ Real user registration/login
- ❌ Save data to database
- ❌ Process real payments
- ❌ Upload images to storage
- ❌ Send emails/SMS
- ❌ Deploy to production

### Can Do in Dummy Mode
- ✅ Develop UI/UX
- ✅ Test user flows
- ✅ Customize design
- ✅ Add features
- ✅ Test responsive design
- ✅ Review code structure

## 🎯 Development Workflow

### Phase 1: Dummy Mode (Current)
1. ✅ Explore the app
2. ✅ Customize design
3. ✅ Modify components
4. ✅ Test UI/UX
5. ✅ Add features

### Phase 2: Real Credentials
1. Set up Firebase
2. Set up Razorpay
3. Update .env.local
4. Test authentication
5. Test payments

### Phase 3: Production
1. Add real product data
2. Configure security rules
3. Set up live payment keys
4. Deploy to Vercel
5. Launch!

## 📚 Next Steps

1. **Explore the App**
   - Run `npm run dev`
   - Browse all pages
   - Test all features

2. **Customize**
   - Update branding
   - Modify content
   - Add your style

3. **Learn**
   - Read documentation
   - Study code structure
   - Understand architecture

4. **When Ready**
   - Set up Firebase
   - Set up Razorpay
   - Switch to real mode

## 💡 Tips

- **Don't worry about errors**: Mock mode may show some console warnings - they're harmless
- **Focus on UI**: Use this time to perfect your design
- **Test thoroughly**: Try all features to understand the flow
- **Customize freely**: All changes work in both mock and real mode

## 🆘 Need Help?

- 📖 Read [SETUP_GUIDE.md](SETUP_GUIDE.md) for real setup
- 📚 Check [INDEX.md](INDEX.md) for all documentation
- 💬 Review code comments for guidance

## ✅ Checklist

Current Status:
- [x] Dependencies installed
- [x] Dummy credentials configured
- [x] App runs successfully
- [ ] Firebase account created
- [ ] Razorpay account created
- [ ] Real credentials configured
- [ ] Production deployment

---

**🎉 You're all set to start developing! Run `npm run dev` and explore your app!**

*When you're ready for real backend functionality, follow the steps above to switch to real credentials.*
