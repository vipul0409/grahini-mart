# 🏷️ Category Management Guide - Grahini Mart

## Overview

You can now **manage product categories** in your admin panel! Add, edit, delete, and organize categories for your products.

---

## 🚀 Accessing Category Management

### From Admin Dashboard
1. Login to admin panel: `http://localhost:3000/admin`
2. Click **"Categories"** button in the header
3. You're in Category Management!

### Direct URL
```
http://localhost:3000/admin/categories
```

---

## ✨ Features

### 1. View All Categories
- See all categories in a grid layout
- View category icon, name, description
- See active/inactive status
- Check display order

### 2. Add New Categories
- Create custom categories
- Choose from 24+ emoji icons
- Set description and order
- Auto-generate URL-friendly slugs

### 3. Edit Categories
- Update name and description
- Change icon
- Modify display order
- Toggle active/inactive status

### 4. Delete Categories
- Remove unused categories
- Protection: Can't delete if products exist

### 5. Activate/Deactivate
- Toggle categories on/off
- Inactive categories hidden from customers
- Products remain but category not shown

---

## ➕ Adding a New Category

### Step 1: Click "Add Category"
Located in the top right of the category management page.

### Step 2: Select an Icon
1. Click the icon box (shows 🌾 by default)
2. Choose from 24+ emoji options:
   - 🌾 Grains/Pulses
   - 🥜 Nuts/Dry Fruits
   - 🌶️ Spices
   - 🍚 Rice
   - 🍞 Bakery
   - 🍯 Honey/Sweeteners
   - ☕ Beverages
   - And many more!

### Step 3: Enter Category Details

**Category Name** * (required)
- Example: "Organic Products"
- Clear, descriptive name
- Auto-generates slug

**Slug** * (required)
- Auto-generated from name
- URL-friendly format
- Example: "organic-products"
- Used in URLs: `/products?category=organic-products`

**Description** * (required)
- Brief description of category
- Example: "Certified organic products for healthy living"
- Shown to customers

**Display Order**
- Number determining position
- Lower numbers appear first
- Example: 1, 2, 3, 4...

**Active Status**
- ✓ Active: Shown to customers
- ✗ Inactive: Hidden from customers

### Step 4: Save Category
Click **"Add Category"** button.

✅ **Category created successfully!**

---

## ✏️ Editing a Category

### Step 1: Find the Category
Scroll through the category grid or use search.

### Step 2: Click "Edit"
Click the blue "Edit" button on the category card.

### Step 3: Modify Details
- Change icon
- Update name (slug auto-updates)
- Edit description
- Change display order
- Toggle active status

### Step 4: Save Changes
Click **"Update Category"** button.

✅ **Category updated successfully!**

---

## 🗑️ Deleting a Category

### Important: Protection System
You **cannot delete** a category if:
- Any products are assigned to it
- You must reassign products first

### Step 1: Check for Products
Make sure no products use this category.

### Step 2: Click "Delete"
Click the red "Delete" button on the category card.

### Step 3: Confirm
A confirmation dialog appears.
Click "OK" to confirm deletion.

✅ **Category deleted successfully!**

---

## 👁️ Activating/Deactivating Categories

### Toggle Active Status
Click the eye icon on any category card:
- 👁️ Green eye = Active (visible to customers)
- 👁️‍🗨️ Gray eye = Inactive (hidden from customers)

### What Happens When Inactive?
- Category hidden from customer view
- Products remain in database
- Can be reactivated anytime
- Useful for seasonal categories

---

## 📊 Category Statistics

View at the top of the page:
- **Total Categories** - All categories
- **Active Categories** - Currently visible
- **Inactive Categories** - Currently hidden

---

## 🎨 Available Icons

Choose from these emoji icons:

### Food & Grains
🌾 🥜 🌶️ 🍚 🌰 🫘 🧄 🧅

### Vegetables
🥔 🥕 🌽 🫑 🥦 🥬

### Bakery & Dairy
🍞 🧈 🍯 🫙

### Beverages
☕ 🍵 🥤 🧃 🥛

### Seasonings
🧂

**Tip:** Choose icons that represent your category well!

---

## 🔤 Slug Guidelines

### What is a Slug?
A URL-friendly version of the category name.

**Example:**
- Name: "Organic Products"
- Slug: "organic-products"

### Slug Rules
- Lowercase only
- Hyphens instead of spaces
- No special characters
- Must be unique

### Auto-Generation
Slugs are automatically generated from the name:
- "Dry Fruits" → "dry-fruits"
- "Masala Powders" → "masala-powders"
- "100% Organic" → "100-organic"

---

## 📈 Display Order

### How It Works
Categories are displayed in order from lowest to highest number.

**Example:**
- Order 1: Pulses (shows first)
- Order 2: Dry Fruits
- Order 3: Masala
- Order 4: Rice
- Order 5: Flour (shows last)

### Best Practices
1. **Popular first** - Most-bought categories at top
2. **Logical grouping** - Related categories together
3. **Leave gaps** - Use 10, 20, 30 for easy reordering
4. **Seasonal** - Adjust order seasonally

---

## 🔗 Category Usage

### In Product Management
When adding/editing products:
1. Category dropdown shows all **active** categories
2. Categories sorted by display order
3. Shows icon + name for easy selection

### On Customer Website
Categories appear in:
- Product filters
- Category navigation
- Product cards
- Search results

---

## 💡 Category Ideas

### Common Grocery Categories
- 🌾 Pulses & Lentils
- 🥜 Dry Fruits & Nuts
- 🌶️ Spices & Masala
- 🍚 Rice & Grains
- 🌾 Flour & Atta
- 🧄 Fresh Vegetables
- 🍯 Honey & Sweeteners
- ☕ Tea & Coffee
- 🧂 Salt & Seasonings
- 🍞 Bakery Items

### Specialty Categories
- 🌱 Organic Products
- 💚 Health Foods
- 🎁 Gift Hampers
- 📦 Combo Packs
- 🏷️ Special Offers
- ⭐ Premium Range

---

## 🎯 Best Practices

### Naming Categories
1. **Clear & Descriptive** - "Dry Fruits" not "DF"
2. **Customer Language** - Use terms customers search
3. **Consistent Style** - All plural or all singular
4. **Not Too Specific** - "Spices" not "Red Chilli Powders"
5. **Not Too Broad** - "Pulses" not "Food Items"

### Organizing Categories
1. **Start with 5-10** - Don't overwhelm customers
2. **Group logically** - Related items together
3. **Popular first** - Best-sellers at top
4. **Seasonal adjustment** - Reorder for festivals
5. **Regular review** - Remove unused categories

### Icon Selection
1. **Relevant** - Icon matches category
2. **Distinct** - Each category unique icon
3. **Recognizable** - Customers understand quickly
4. **Consistent** - Similar style across all

---

## 🔄 Workflow Example

### Adding a New Category

**Scenario:** You want to add "Organic Products" category

1. **Go to Categories**
   - Admin Dashboard → Categories button

2. **Click Add Category**
   - Top right corner

3. **Select Icon**
   - Click icon box
   - Choose 🌱 (plant emoji)

4. **Enter Details**
   - Name: "Organic Products"
   - Slug: "organic-products" (auto-generated)
   - Description: "Certified organic products for healthy living"
   - Order: 6
   - Active: ✓

5. **Save**
   - Click "Add Category"

6. **Verify**
   - See new category in grid
   - Check it appears in product form

7. **Add Products**
   - Go to Products
   - Add/Edit products
   - Select "Organic Products" category

✅ **Done!**

---

## 🆘 Troubleshooting

### Can't Delete Category?
**Error:** "Cannot delete category that has products"

**Solution:**
1. Go to Products page
2. Find products in this category
3. Edit each product
4. Change to different category
5. Try deleting again

### Slug Already Exists?
**Error:** "A category with this slug already exists"

**Solution:**
1. Change the category name slightly
2. Or manually edit the slug
3. Make it unique

### Category Not Showing in Product Form?
**Check:**
1. Is category Active? (eye icon green)
2. Refresh the product form page
3. Check browser console for errors

### Changes Not Saving?
**Try:**
1. Check all required fields filled
2. Check slug is unique
3. Refresh page and try again
4. Check browser console

---

## 📱 Mobile Access

Category management is **fully responsive**!

Works on:
- ✅ Desktop
- ✅ Laptop
- ✅ Tablet
- ✅ Mobile

**Tip:** Desktop recommended for easier management.

---

## 💾 Data Storage

### Current Setup (Demo Mode)
- Categories stored in browser localStorage
- Persist across sessions
- Default categories included
- No database needed

### Default Categories
Your store comes with 5 default categories:
1. 🌾 Pulses
2. 🥜 Dry Fruits
3. 🌶️ Masala
4. 🍚 Rice
5. 🌾 Flour

You can edit or delete these anytime!

---

## 🎉 You're Ready!

You can now:
- ✅ Add custom categories
- ✅ Edit existing categories
- ✅ Delete unused categories
- ✅ Organize with display order
- ✅ Activate/deactivate categories
- ✅ Choose from 24+ icons

**Start organizing your products now!** 🚀

---

## 📞 Category Management URLs

**Local Development:**
- Categories: http://localhost:3000/admin/categories

**Production (After Deployment):**
- Categories: https://your-site.vercel.app/admin/categories

---

## 🔗 Related Guides

- **ADMIN_PANEL_GUIDE.md** - Complete admin guide
- **ADMIN_PANEL_SUMMARY.md** - Admin panel overview

---

**Happy Organizing! 🎊**

**Made with ❤️ for Grahini Mart**
