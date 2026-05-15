# 🛍️ How to Add Products to Grahini Mart

## Issue: Product Not Found Error

When you click on a product, you're getting "Product not found" because:
- Products are not in Firebase Firestore yet
- OR products don't have proper slugs

## Solution: Add Products via Admin Panel

### Step 1: Login to Admin Panel

1. Go to: `your-site-url/admin`
2. Login with:
   - Username: `Pranjal`
   - Password: `Saksham@#2029#456789`

### Step 2: Add Categories First

1. Click "Categories" in admin menu
2. Add categories like:
   - Pulses & Dals (slug: pulses-dals)
   - Masalas & Spices (slug: masalas-spices)
   - Dry Fruits (slug: dry-fruits)
   - Rice & Grains (slug: rice-grains)

### Step 3: Add Products

1. Click "Dashboard" → "Add Product" button
2. Fill in product details:
   - **Name**: जीरा (Cumin Seeds)
   - **Slug**: jeera (auto-generated from name)
   - **Category**: Select from dropdown
   - **Description**: Full product description
   - **Short Description**: Brief description
   - **Tags**: jeera, cumin, masala

3. **Add Variants** (Different sizes/weights):
   - Click "Add Variant"
   - Weight: 250, Unit: g
   - MRP: ₹100
   - Price: ₹80
   - Stock: 50
   - Mark as "Default" (first variant)
   
   - Add more variants:
     - 500g: MRP ₹190, Price ₹150
     - 1kg: MRP ₹350, Price ₹280

4. **Upload Image**:
   - Click "Choose File"
   - Select product image
   - Image will be converted to base64 and stored

5. **Product Flags** (Optional):
   - ✅ Featured Product (shows on home page)
   - ✅ Best Seller
   - ✅ New Arrival

6. Click "Add Product"

### Step 4: Test Product Detail Page

1. Go to Products page
2. Click on the product you just added
3. You should see:
   - Product images
   - All variants (250g, 500g, 1kg)
   - Variant selection buttons
   - Quantity selector
   - Add to Cart button

## Product Detail Page Features

When you click on any product, the page shows:

### ✅ What's Already Working:
1. **Image Gallery** - Main image + thumbnails
2. **Product Info** - Name, category, rating, description
3. **Variant Selection** - All sizes/weights in grid
4. **Price Display** - Updates when variant changes
5. **Quantity Selector** - Increase/decrease quantity
6. **Add to Cart** - Adds selected variant + quantity
7. **Wishlist** - Heart icon to save product
8. **Responsive Design** - Works on mobile, tablet, desktop

### Example Product Detail URL:
```
your-site-url/products/jeera
your-site-url/products/toor-dal
your-site-url/products/basmati-rice
```

## Debugging: Check Browser Console

If products still don't load:

1. Open browser (Chrome/Edge)
2. Press `F12` to open Developer Tools
3. Go to "Console" tab
4. Look for these logs:
   ```
   🔍 Loading product with slug: jeera
   📦 Total products loaded: 5
   📋 Available slugs: ["jeera", "toor-dal", ...]
   ✅ Product found: जीरा
   ```

5. If you see:
   ```
   ❌ Product not found with slug: jeera
   📦 Total products loaded: 0
   ```
   This means no products in Firebase - add them via admin panel!

## Quick Test Product

Add this test product to verify everything works:

**Product Name**: Test Product  
**Slug**: test-product  
**Category**: Any  
**Variants**:
- 250g - ₹50
- 500g - ₹90
- 1kg - ₹170

Then visit: `your-site-url/products/test-product`

## Firebase Firestore Structure

Products are stored like this:

```
Firestore
└── products (collection)
    └── prod-1234567890 (document)
        ├── name: "जीरा"
        ├── slug: "jeera"
        ├── category: "masalas-spices"
        ├── description: "..."
        ├── images: ["base64..."]
        ├── variants: [
        │   {
        │     id: "var-1",
        │     weight: 250,
        │     unit: "g",
        │     price: 80,
        │     mrp: 100,
        │     stock: 50,
        │     isDefault: true
        │   },
        │   ...
        ├── ]
        ├── isFeatured: true
        ├── isBestSeller: true
        ├── isNew: true
        └── createdAt: timestamp
```

## Common Issues & Solutions

### Issue 1: "Product not found"
**Solution**: Add products via admin panel first

### Issue 2: Product shows but no variants
**Solution**: Make sure you added at least one variant when creating product

### Issue 3: Images not showing
**Solution**: 
- Use small images (< 500KB)
- Images are stored as base64 in Firestore
- For production, consider using Firebase Storage (requires Blaze plan)

### Issue 4: Slug mismatch
**Solution**: 
- Slug is auto-generated from product name
- Hindi names convert to English slug
- Example: "जीरा" → "jeera"
- You can manually edit slug if needed

## Logo Image

I see you provided the Grahini Mart logo! To use it:

1. Save the logo image as: `grahini-mart-logo.png`
2. Place it in: `public/images/grahini-mart-logo.png`
3. Update Logo component to use actual image instead of emoji

Or I can update the code to use the logo you provided!

---

**Need Help?**
- Check browser console for detailed logs
- Verify Firebase connection
- Make sure Firestore rules allow read/write
- Contact: grahinimart7@gmail.com
