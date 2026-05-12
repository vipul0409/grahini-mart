# ⚡ Quick Start Guide

Get your Spice & Grain ecommerce app running in 5 minutes!

## 🎯 Prerequisites

- Node.js 18+ installed
- ~~Firebase account~~ **Not needed! Pre-configured with dummy credentials**
- ~~Razorpay account~~ **Not needed! Pre-configured with dummy credentials**

## 🚀 2-Minute Setup (No Firebase/Razorpay Required!)

### 1. Install Dependencies (1 min)

```bash
npm install
```

### 2. Run the App! (30 sec)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## 🔧 Running in Dummy Mode

✅ **The app is pre-configured with dummy credentials!**

You can start developing immediately without Firebase or Razorpay accounts. The app uses:
- Mock Firebase authentication
- Sample product data
- Mock payment processing
- Local state management

### What Works:
- ✅ All UI/UX features
- ✅ Product browsing
- ✅ Shopping cart
- ✅ Checkout flow (mock)
- ✅ Responsive design
- ✅ All animations

### What's Mocked:
- ⚠️ User authentication (console logs only)
- ⚠️ Database operations (no persistence)
- ⚠️ Payment processing (mock success)

📝 **See [DUMMY_MODE.md](DUMMY_MODE.md) for complete details**

## 🔄 Want Real Backend? (Optional)

When you're ready for real authentication and payments:

### 1. Set Up Firebase (5 min)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create new project: "spice-and-grain"
3. Enable Authentication (Email/Password)
4. Create Firestore Database (test mode)
5. Copy config from Project Settings

### 2. Set Up Razorpay (2 min)

1. Sign up at [Razorpay](https://razorpay.com/)
2. Get test API keys from Settings > API Keys

### 3. Update .env.local (1 min)

Replace the dummy values in `.env.local` with your real credentials:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_real_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_real_domain
# ... etc
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_real_key
```

### 4. Restart Server

```bash
# Stop current server (Ctrl+C)
npm run dev
```

The app will automatically detect real credentials and switch from mock mode!

## 📱 What You Get

✅ **Homepage** with hero slider and featured products  
✅ **Product Listing** with filters and search  
✅ **Product Details** with variants and reviews  
✅ **Shopping Cart** with real-time updates  
✅ **Checkout Flow** with address and payment  
✅ **User Authentication** with Firebase  
✅ **Mobile Responsive** design  
✅ **Admin Dashboard** (coming soon)

## 🎨 Customization

### Change Brand Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    500: '#FF9933', // Your primary color
  },
  secondary: {
    500: '#138808', // Your secondary color
  },
}
```

### Update Site Name

Edit `src/lib/constants.ts`:

```typescript
export const SITE_NAME = 'Your Store Name'
export const SITE_DESCRIPTION = 'Your description'
```

### Add Products

Products are currently using sample data from `src/lib/sampleData.ts`.

To add real products:
1. Go to Firebase Console > Firestore
2. Add documents to `products` collection
3. Or create an admin panel (see FEATURES.md)

## 🧪 Test Features

### Test Shopping Flow

1. Browse products on homepage
2. Click on a product
3. Select weight variant
4. Add to cart
5. Open cart drawer (top right)
6. Proceed to checkout
7. Fill address details
8. Select payment method
9. Place order (test mode)

### Test Payment

Use Razorpay test cards:
- **Success**: 4111 1111 1111 1111
- **Failure**: 4000 0000 0000 0002
- CVV: Any 3 digits
- Expiry: Any future date

## 📚 Next Steps

1. **Read Full Documentation**
   - [SETUP_GUIDE.md](SETUP_GUIDE.md) - Complete setup
   - [FEATURES.md](FEATURES.md) - All features
   - [ARCHITECTURE.md](ARCHITECTURE.md) - Technical details

2. **Customize Your Store**
   - Update branding
   - Add real products
   - Configure payment gateway

3. **Deploy to Production**
   - See [DEPLOYMENT.md](DEPLOYMENT.md)
   - Deploy to Vercel
   - Configure domain

## 🆘 Common Issues

### Port Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

### Firebase Error

```bash
# Check environment variables
cat .env.local

# Restart dev server
npm run dev
```

### Module Not Found

```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

## 💡 Pro Tips

1. **Use VS Code** with these extensions:
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense

2. **Enable Hot Reload** (already configured)
   - Changes auto-refresh
   - No need to restart server

3. **Check Browser Console**
   - Press F12 to open DevTools
   - Check for errors

4. **Use React DevTools**
   - Install browser extension
   - Inspect component state

## 🎓 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Firebase Docs](https://firebase.google.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)

## 📞 Need Help?

- 📧 Email: support@spiceandgrain.com
- 💬 GitHub Issues: [Create Issue]
- 📖 Full Docs: See other .md files

---

**Happy Coding! 🚀**

Built with ❤️ using Next.js, React, Tailwind CSS, and Firebase
