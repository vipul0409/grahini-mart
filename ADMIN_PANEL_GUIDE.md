# 🔐 Admin Panel Guide - Grahini Mart

## Overview

Your Grahini Mart now has a complete admin panel where you can:
- ✅ Add new products with images
- ✅ Edit existing products
- ✅ Set prices and discounts
- ✅ Manage product variants (different weights)
- ✅ Upload product images
- ✅ Delete products
- ✅ View product statistics

---

## 🚀 Accessing Admin Panel

### Step 1: Go to Admin Login
Open your browser and go to:
```
http://localhost:3000/admin
```

Or on your live site:
```
https://your-site.vercel.app/admin
```

### Step 2: Login with Demo Credentials
- **Username:** `admin`
- **Password:** `admin123`

### Step 3: Access Dashboard
After login, you'll be redirected to the admin dashboard.

---

## 📊 Admin Dashboard Features

### 1. Statistics Cards
View at a glance:
- Total number of products
- Products by category (Pulses, Dry Fruits, Masala)

### 2. Search & Filter
- **Search:** Find products by name
- **Filter:** Filter by category (All, Pulses, Dry Fruits, Masala)

### 3. Product Table
See all products with:
- Product image and name
- Category
- Price (with MRP if discounted)
- Stock status
- Edit and Delete buttons

---

## ➕ Adding a New Product

### Step 1: Click "Add Product" Button
Located in the top right of the dashboard.

### Step 2: Fill in Basic Information
- **Product Name** * (required)
  - Example: "Premium Basmati Rice"
  
- **Category** * (required)
  - Choose from: Pulses, Dry Fruits, Masala, Rice, Flour
  
- **Short Description**
  - Brief description for product cards
  - Example: "Premium quality basmati rice"
  
- **Full Description** * (required)
  - Detailed product description
  - Example: "High-quality basmati rice sourced from the finest farms..."
  
- **Tags** (optional)
  - Comma-separated tags
  - Example: "rice, basmati, premium, organic"

### Step 3: Upload Product Images
1. Click the "Upload Image" button
2. Select one or more images from your computer
3. Images will appear as thumbnails
4. You can upload multiple images
5. Remove images by clicking the trash icon

**Image Tips:**
- Use high-quality images (800x800px or larger)
- Clear product visibility
- Clean background
- Multiple angles if possible

### Step 4: Add Price Variants
Each product can have multiple variants (different weights/sizes).

**For each variant, enter:**
- **Weight** * (required) - Example: 500, 1, 5
- **Unit** * (required) - Choose: g, kg, ml, l
- **MRP (₹)** * (required) - Maximum Retail Price
- **Price (₹)** * (required) - Selling Price
- **Discount (%)** - Auto-calculated from MRP and Price
- **SKU** - Stock Keeping Unit (optional)
- **Stock** * (required) - Number of units available
- **Default** - Check if this is the default variant

**Example Variant:**
- Weight: 500
- Unit: g
- MRP: ₹150
- Price: ₹120
- Discount: 20% (auto-calculated)
- SKU: BR-500
- Stock: 100
- Default: ✓

**Add More Variants:**
Click "Add Variant" to add different sizes (e.g., 500g, 1kg, 5kg)

### Step 5: Set Product Flags
- **Featured Product** - Show on homepage featured section
- **New Arrival** - Mark as new product
- **Best Seller** - Mark as best selling product

### Step 6: Save Product
Click "Add Product" button at the bottom.

✅ **Product added successfully!**

---

## ✏️ Editing a Product

### Step 1: Find the Product
Use search or scroll through the product table.

### Step 2: Click Edit Button
Click the blue edit icon (pencil) next to the product.

### Step 3: Modify Details
- Change any field you want to update
- Add/remove images
- Update variants
- Change prices and discounts

### Step 4: Save Changes
Click "Update Product" button.

✅ **Product updated successfully!**

---

## 🗑️ Deleting a Product

### Step 1: Find the Product
Locate the product in the table.

### Step 2: Click Delete Button
Click the red delete icon (trash) next to the product.

### Step 3: Confirm Deletion
A confirmation dialog will appear.
Click "OK" to confirm.

✅ **Product deleted successfully!**

---

## 💰 Setting Prices and Discounts

### How Discounts Work
Discounts are **automatically calculated** based on MRP and Price:

```
Discount % = ((MRP - Price) / MRP) × 100
```

**Example:**
- MRP: ₹150
- Price: ₹120
- Discount: 20% (auto-calculated)

### Tips for Pricing
1. **Set realistic MRP** - Original price before discount
2. **Set competitive Price** - Your selling price
3. **Discount shows automatically** - No need to calculate
4. **Different variants can have different discounts**

---

## 🖼️ Image Upload Guide

### Supported Formats
- JPG/JPEG
- PNG
- WebP

### Recommended Specifications
- **Size:** 800x800px minimum
- **Aspect Ratio:** Square (1:1) preferred
- **File Size:** Under 2MB per image
- **Quality:** High resolution, clear visibility

### How Images are Stored
- Images are converted to Base64 format
- Stored in browser localStorage
- Persist across sessions
- No server upload needed (demo mode)

### Multiple Images
- Upload multiple images per product
- First image is the main product image
- Other images can show different angles
- Customers can view all images

---

## 📦 Managing Product Variants

### What are Variants?
Variants are different sizes/weights of the same product.

**Example: Toor Dal**
- Variant 1: 500g at ₹120
- Variant 2: 1kg at ₹220
- Variant 3: 5kg at ₹1000

### Adding Variants
1. Click "Add Variant" button
2. Fill in weight, unit, prices
3. Set stock for each variant
4. Mark one as default

### Default Variant
- The variant shown by default on product page
- Usually the most popular size
- Only one variant can be default

### Variant Pricing
- Each variant can have different prices
- Each variant can have different discounts
- Customers can switch between variants

---

## 📊 Product Categories

### Available Categories
1. **Pulses** - Dal, lentils, beans
2. **Dry Fruits** - Cashews, almonds, raisins
3. **Masala** - Spice powders, blends
4. **Rice** - Basmati, regular rice
5. **Flour** - Wheat flour, gram flour

### Category Benefits
- Helps customers find products
- Enables filtering
- Shows in category statistics
- Organizes product catalog

---

## 🏷️ Product Tags

### What are Tags?
Keywords that describe your product.

**Example Tags:**
- organic
- premium
- healthy
- gluten-free
- vegan
- traditional

### How to Add Tags
Enter comma-separated tags:
```
organic, premium, healthy, protein-rich
```

### Tag Benefits
- Improves search
- Helps categorization
- SEO benefits
- Customer discovery

---

## 🔒 Admin Security

### Demo Mode
Currently using demo credentials:
- Username: `admin`
- Password: `admin123`

### For Production
**Change these credentials before going live!**

1. Update admin credentials in code
2. Use environment variables
3. Implement proper authentication
4. Add password hashing
5. Enable 2FA (optional)

---

## 💾 Data Storage

### Current Setup (Demo Mode)
- Products stored in browser localStorage
- Data persists across sessions
- No database required
- Perfect for testing

### For Production
When ready for real deployment:
1. Connect to Firebase Firestore
2. Store products in database
3. Upload images to Firebase Storage
4. Enable real-time sync

---

## 🎯 Best Practices

### Product Management
1. **Use clear product names** - Easy to understand
2. **Write detailed descriptions** - Help customers decide
3. **Upload quality images** - First impression matters
4. **Set competitive prices** - Research market rates
5. **Keep stock updated** - Avoid overselling
6. **Use relevant tags** - Improve discoverability

### Image Guidelines
1. **Consistent style** - All images similar quality
2. **Good lighting** - Clear product visibility
3. **Clean background** - White or light colored
4. **Multiple angles** - Show product details
5. **Actual product** - Don't use stock photos

### Pricing Strategy
1. **Competitive pricing** - Check competitor rates
2. **Attractive discounts** - 15-30% works well
3. **Bulk discounts** - Larger sizes = better value
4. **Round numbers** - ₹120 better than ₹119
5. **Psychological pricing** - ₹99 instead of ₹100

---

## 🆘 Troubleshooting

### Products not showing on website?
- Check if product is saved
- Refresh the homepage
- Clear browser cache
- Check product has images

### Images not uploading?
- Check file size (under 2MB)
- Use supported formats (JPG, PNG)
- Try one image at a time
- Check browser console for errors

### Can't login to admin?
- Check credentials: admin / admin123
- Clear browser cache
- Try incognito mode
- Check console for errors

### Changes not saving?
- Check all required fields filled
- Check variants have all details
- Look for error messages
- Try refreshing and re-entering

---

## 📱 Mobile Access

The admin panel is **fully responsive**!

Access from:
- ✅ Desktop computer
- ✅ Laptop
- ✅ Tablet
- ✅ Mobile phone

**Tip:** For easier product management, use desktop/laptop.

---

## 🔄 Workflow Example

### Adding a New Product (Complete Flow)

1. **Login to Admin**
   - Go to /admin
   - Enter credentials
   - Click Login

2. **Click Add Product**
   - Dashboard → Add Product button

3. **Enter Product Details**
   - Name: "Premium Moong Dal"
   - Category: Pulses
   - Short Description: "Split green gram, protein-rich"
   - Full Description: "High-quality moong dal..."
   - Tags: "dal, pulses, protein, healthy"

4. **Upload Images**
   - Click Upload Image
   - Select 2-3 product images
   - Review thumbnails

5. **Add Variants**
   - Variant 1: 500g, ₹100, ₹80, Stock: 50
   - Variant 2: 1kg, ₹190, ₹150, Stock: 30
   - Mark 500g as default

6. **Set Flags**
   - ✓ Featured Product
   - ✓ New Arrival

7. **Save Product**
   - Click "Add Product"
   - See success message

8. **Verify on Website**
   - Go to homepage
   - Check featured section
   - Check products page
   - Test add to cart

✅ **Done!**

---

## 🎉 You're Ready!

Your admin panel is fully functional. You can now:
- ✅ Manage all products
- ✅ Upload images directly
- ✅ Set prices and discounts
- ✅ Control what customers see

**Start adding your products now!** 🚀

---

## 📞 Admin Panel URLs

**Local Development:**
- Login: http://localhost:3000/admin
- Dashboard: http://localhost:3000/admin/dashboard

**Production (After Deployment):**
- Login: https://your-site.vercel.app/admin
- Dashboard: https://your-site.vercel.app/admin/dashboard

---

**Happy Managing! 🎊**

**Made with ❤️ for Grahini Mart**
