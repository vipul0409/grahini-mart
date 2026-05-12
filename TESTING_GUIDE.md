# 🧪 Testing Guide

Quick guide to test all features of your Spice & Grain app.

## 🚀 Start the App

```bash
npm run dev
```

Open: http://localhost:3000

## ✅ Features to Test

### 1. Login/Signup 👤

**Test Login:**
1. Click "Login" button in header (top right)
2. Enter any email (e.g., `test@example.com`)
3. Enter any password (e.g., `password123`)
4. Click "Login"
5. ✅ You should see: "Login successful!" toast
6. ✅ Header should show your name instead of "Login" button

**Test Signup:**
1. Click "Login" button
2. Click "Sign Up" at the bottom
3. Fill in:
   - Name: `John Doe`
   - Email: `john@example.com`
   - Phone: `9876543210`
   - Password: `password123`
   - Confirm Password: `password123`
4. Click "Create Account"
5. ✅ You should see: "Account created successfully! Welcome bonus: 100 points"
6. ✅ You're now logged in

**Test Password Visibility:**
1. Click the eye icon to show/hide password
2. ✅ Password should toggle between visible and hidden

### 2. Shopping Cart 🛒

**Add Items to Cart:**
1. On homepage, find a product card
2. Click "Add to Cart" button
3. ✅ You should see: "Added to cart!" toast
4. ✅ Cart icon (top right) should show item count badge
5. Add more products (try different ones)
6. ✅ Cart badge number should increase

**View Cart:**
1. Click the cart icon (top right)
2. ✅ Cart drawer should slide in from right
3. ✅ You should see all items you added with:
   - Product image
   - Product name
   - Weight variant
   - Price
   - Quantity controls
   - Remove button

**Update Quantity:**
1. In cart drawer, click "+" button
2. ✅ Quantity should increase
3. ✅ Total should update automatically
4. Click "-" button
5. ✅ Quantity should decrease
6. ✅ Total should update

**Remove Item:**
1. Click the trash icon (🗑️) on any item
2. ✅ Item should be removed from cart
3. ✅ Total should update
4. ✅ Cart count badge should decrease

**Empty Cart:**
1. Remove all items from cart
2. ✅ You should see: "Your cart is empty" message
3. ✅ "Continue Shopping" button should appear

### 3. Product Browsing 🛍️

**Homepage:**
1. ✅ Hero slider should auto-rotate
2. ✅ Click arrows to manually change slides
3. ✅ Click dots to jump to specific slide
4. ✅ Categories should display with icons
5. ✅ Featured products should show

**Product Listing:**
1. Click "Shop" in mobile nav or go to `/products`
2. ✅ All products should display in grid
3. ✅ Product cards should show:
   - Image
   - Name
   - Rating
   - Price
   - Discount badge (if applicable)
   - Add to Cart button

**Product Filters:**
1. Click "Filters" button (mobile) or use sidebar (desktop)
2. Select a category
3. ✅ Products should filter
4. Adjust price range slider
5. ✅ Products should filter by price
6. Select a weight option
7. ✅ Products should filter
8. Click "Clear All"
9. ✅ All filters should reset

**Product Hover Effects:**
1. Hover over a product card (desktop)
2. ✅ Card should lift up
3. ✅ Wishlist heart icon should appear
4. ✅ Shadow should increase

### 4. Mobile Navigation 📱

**Test on Mobile (or resize browser):**
1. Resize browser to mobile width (< 768px)
2. ✅ Bottom navigation should appear with 4 tabs:
   - Home
   - Shop
   - Wishlist
   - Account
3. Click each tab
4. ✅ Active tab should be highlighted
5. ✅ Should navigate to correct page

### 5. Responsive Design 📱💻

**Test Different Screen Sizes:**

**Mobile (320px - 640px):**
1. Resize browser to mobile width
2. ✅ Layout should stack vertically
3. ✅ Text should be readable
4. ✅ Buttons should be touch-friendly
5. ✅ Bottom nav should appear

**Tablet (641px - 1024px):**
1. Resize to tablet width
2. ✅ Products should show 2-3 per row
3. ✅ Layout should adjust smoothly

**Desktop (1025px+):**
1. Full screen
2. ✅ Products should show 4 per row
3. ✅ Filters sidebar should appear
4. ✅ Bottom nav should hide

### 6. Checkout Flow 💳

**Test Checkout:**
1. Add items to cart
2. Click "Proceed to Checkout"
3. Fill in delivery address:
   - Name: `John Doe`
   - Phone: `9876543210`
   - Address: `123 Main Street`
   - City: `Mumbai`
   - State: `Maharashtra`
   - Pincode: `400001`
4. Click "Continue to Payment"
5. ✅ Payment options should appear
6. Select payment method (Razorpay or COD)
7. Click "Place Order"
8. ✅ You should see: "Order placed successfully!"
9. ✅ Cart should be empty
10. ✅ Should redirect to order confirmation

### 7. Animations ✨

**Check Smooth Animations:**
1. ✅ Page transitions should be smooth
2. ✅ Cart drawer should slide in/out
3. ✅ Modal should fade in/out with scale
4. ✅ Product cards should have hover effects
5. ✅ Buttons should have hover states
6. ✅ Hero slider should transition smoothly

### 8. WhatsApp Integration 💬

**Test WhatsApp Button:**
1. Look for "Order on WhatsApp" in header
2. Click it
3. ✅ Should open WhatsApp with pre-filled message
4. ✅ Message should say: "Hi! I want to place an order."

### 9. Search & Filters 🔍

**Test Search (Desktop):**
1. Click search bar in header
2. Type product name (e.g., "turmeric")
3. ✅ Should show search results (future feature)

**Test Filters:**
1. Go to products page
2. Open filters
3. Select multiple categories
4. ✅ Products should match all selected filters
5. Adjust price range
6. ✅ Only products in range should show

### 10. User Account 👤

**After Login:**
1. Click your name in header (desktop)
2. ✅ Should go to account page (future feature)
3. Or click "Account" in mobile nav
4. ✅ Should show user profile

**Logout:**
1. In account page, click "Logout"
2. ✅ Should log you out
3. ✅ Header should show "Login" button again

## 🎯 Expected Behavior

### Cart Functionality
- ✅ Items persist across page refreshes
- ✅ Quantity updates immediately
- ✅ Total calculates correctly
- ✅ Delivery charge applies correctly:
  - Free delivery above ₹500
  - ₹30 for orders ₹300-₹499
  - ₹50 for orders below ₹300

### Authentication
- ✅ Login works with any credentials (demo mode)
- ✅ User data persists across refreshes
- ✅ Logout clears user data
- ✅ Welcome bonus on signup (100 points)

### UI/UX
- ✅ All buttons have hover effects
- ✅ Forms validate input
- ✅ Toast notifications appear for actions
- ✅ Loading states show during operations
- ✅ Smooth animations throughout

## 🐛 Known Limitations (Demo Mode)

- ⚠️ No real database - data doesn't persist on server
- ⚠️ No real authentication - any credentials work
- ⚠️ No real payments - checkout is simulated
- ⚠️ No email notifications
- ⚠️ No order tracking (yet)

## 📝 Console Messages

You'll see helpful messages in browser console:
```
🔧 Running in MOCK MODE with dummy Firebase credentials
📝 To use real Firebase, update credentials in .env.local
Mock login: test@example.com
Mock add to cart: {...}
```

These are normal and help you understand what's happening!

## ✅ Success Checklist

Test each feature and check off:

- [ ] Login works
- [ ] Signup works
- [ ] Add to cart works
- [ ] Cart shows items correctly
- [ ] Quantity updates work
- [ ] Remove from cart works
- [ ] Cart total calculates correctly
- [ ] Checkout flow works
- [ ] Mobile navigation works
- [ ] Responsive design works
- [ ] Animations are smooth
- [ ] WhatsApp button works
- [ ] Filters work
- [ ] Product cards display correctly
- [ ] Hero slider works

## 🎉 All Working?

If everything above works, congratulations! Your app is fully functional in demo mode.

## 🔄 Next Steps

1. **Customize Design** - Change colors, fonts, content
2. **Add Real Backend** - Set up Firebase and Razorpay
3. **Add More Features** - Product details, reviews, etc.
4. **Deploy** - Follow DEPLOYMENT.md

## 🆘 Issues?

If something doesn't work:

1. Check browser console for errors
2. Make sure dev server is running
3. Try clearing cache: `rm -rf .next && npm run dev`
4. Check [SETUP_GUIDE.md](SETUP_GUIDE.md) for troubleshooting

---

**Happy Testing! 🧪**
