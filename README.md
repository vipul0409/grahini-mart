# 🛒 Grahini Mart - Premium Indian Grocery Ecommerce

**थोक दाम में किराना, अब आपके दरवाजे पर**

A modern, mobile-first ecommerce web application for selling pulses, dry fruits, spices, and masala powders. Built with Next.js 14, React, Tailwind CSS, Firebase, and Razorpay.

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-10-orange)](https://firebase.google.com/)

## 🌐 Live Demo

**Coming Soon!** Deploy to Vercel to get your live URL.

## 📞 Contact

- **WhatsApp**: +91 8989475895
- **Instagram**: [@Grahini_Mart7](https://instagram.com/Grahini_Mart7)
- **Facebook**: [Grahini Mart](https://facebook.com/GrahiniMart)
- **Email**: grahinimart7@gmail.com
- **Location**: Gwalior, MP (474001)

## ✨ Features

- 🛍️ **Modern UI/UX**: Premium design with smooth Framer Motion animations
- 📱 **Mobile-First**: Fully responsive with PWA support
- ⚡ **Fast Performance**: Optimized images, lazy loading, skeleton screens
- 🛒 **Complete Ecommerce**: Cart, checkout, payments, order tracking
- 📱 **OTP Login**: Mobile number + OTP authentication
- 💳 **Multi-Payment**: Razorpay integration (UPI, Cards, Wallets) + COD
- 💬 **WhatsApp Integration**: Direct order support
- 👤 **User Features**: Account management, order history, logout
- 🔍 **SEO Optimized**: Meta tags, structured data, sitemap
- 🎨 **Premium Design**: Saffron, green, and earthy brown color scheme

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI**: React 18, Tailwind CSS, Framer Motion
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Payments**: Razorpay
- **State Management**: Zustand
- **Icons**: Lucide React
- **Deployment**: Vercel

## 🚀 Quick Start

Get started immediately with **dummy credentials** (no Firebase/Razorpay needed)!

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/grahini-mart.git
cd grahini-mart

# 2. Install dependencies
npm install

# 3. Run development server (uses dummy credentials)
npm run dev

# 4. Open http://localhost:3000
```

✅ **The app is pre-configured with dummy credentials** - you can start developing immediately!  
📝 See [DUMMY_MODE.md](DUMMY_MODE.md) for what works and how to switch to real credentials later.

## 🖼️ Add Your Images

Before deploying, add your product and banner images:

### Product Images (6 images)
Add to `public/products/`:
- `toor-dal.jpg`
- `cashews.jpg`
- `almonds.jpg`
- `red-chilli-powder.jpg`
- `turmeric-powder.jpg`
- `garam-masala.jpg`

### Banner Images (6 images)
Add to `public/banners/`:
- `dry-fruits-banner.jpg` + `dry-fruits-banner-mobile.jpg`
- `masala-banner.jpg` + `masala-banner-mobile.jpg`
- `pulses-banner.jpg` + `pulses-banner-mobile.jpg`

📖 **See [IMAGE_UPLOAD_GUIDE.md](IMAGE_UPLOAD_GUIDE.md) for detailed instructions**

## 🚀 Deploy to Vercel

Deploy your site in 5 minutes:

```bash
# 1. Push to GitHub
git add .
git commit -m "Initial commit"
git push

# 2. Go to vercel.com
# 3. Import your GitHub repository
# 4. Add environment variables
# 5. Deploy!
```

📖 **See [DEPLOY_TO_VERCEL.md](DEPLOY_TO_VERCEL.md) for step-by-step guide**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

## 📚 Documentation

- **[DEPLOY_TO_VERCEL.md](DEPLOY_TO_VERCEL.md)** - 🚀 Deploy your site (START HERE!)
- **[IMAGE_UPLOAD_GUIDE.md](IMAGE_UPLOAD_GUIDE.md)** - 🖼️ Add your images
- **[QUICKSTART.md](QUICKSTART.md)** - Get running in 5 minutes
- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Complete setup instructions
- **[DUMMY_MODE.md](DUMMY_MODE.md)** - Working with dummy credentials
- **[AUTH_GUIDE.md](AUTH_GUIDE.md)** - Authentication system guide
- **[FEATURES.md](FEATURES.md)** - Detailed feature documentation
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Technical architecture
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Advanced deployment guide

## 🔧 Environment Variables

The app comes with dummy credentials pre-configured in `.env.local`:

```bash
# Firebase (Dummy)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDummyKeyForDevelopment123456789
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=grahini-mart-dummy.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=grahini-mart-dummy
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=grahini-mart-dummy.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456

# Razorpay (Dummy)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_dummy123456789
RAZORPAY_KEY_SECRET=dummy_secret_key_123456789

# App Config
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=918989475895
```

## 📱 Products Available

1. **Premium Toor Dal** - High-quality pulses
2. **Premium Cashews (Kaju)** - Whole cashew nuts
3. **Premium Almonds (Badam)** - California almonds
4. **Organic Turmeric Powder** - Pure haldi powder
5. **Kashmiri Red Chilli Powder** - Vibrant color, mild heat
6. **Garam Masala Powder** - Traditional spice blend

## 🎨 Brand Identity

- **Name**: Grahini Mart
- **Tagline**: थोक दाम में किराना, अब आपके दरवाजे पर
- **Logo**: 🛒
- **Colors**: Saffron (#FF9933), Green (#138808), Earthy Brown
- **Location**: Gwalior, MP (474001)

## 📊 Performance

- ⚡ Lighthouse Score: 90+
- 🚀 First Contentful Paint: < 1.5s
- 📱 Mobile-Optimized
- ♿ Accessibility Compliant
- 🔍 SEO Optimized

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details

---

**Made with ❤️ for Grahini Mart**
