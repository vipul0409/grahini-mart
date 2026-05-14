# Admin Dashboard - Dynamic Category Filter

## Feature Overview

The admin dashboard now displays **dynamic category cards** that show product counts and allow filtering by clicking on them.

## What Changed

### Before ❌
- Hardcoded category cards (Pulses, Dry Fruits, Masala)
- Only showed 3 categories
- Not clickable
- Didn't reflect actual database categories

### After ✅
- **Dynamic category cards** loaded from database
- Shows **all active categories** (up to 8 total including "Total Products")
- **Clickable cards** to filter products
- Shows **real-time product counts** for each category
- **Visual feedback** - selected category has a blue ring
- **Responsive design** - works on mobile and desktop

## Features

### 1. Dynamic Category Cards
- Automatically loads categories from Firestore
- Shows only active categories
- Sorted by order field
- Each card shows:
  - Category icon (emoji)
  - Category name
  - Product count for that category
  - Color-coded background

### 2. Click to Filter
- Click any category card to filter products
- Click "Total Products" to show all products
- Selected category highlighted with blue ring
- Products table updates instantly

### 3. Responsive Layout
- **Mobile**: 2 columns grid
- **Tablet**: 4 columns grid
- **Desktop**: 5 columns grid
- Smaller text and icons on mobile
- Truncated category names if too long

### 4. Color Coding
Each category gets a unique color:
- Orange: Total Products
- Green: First category
- Yellow: Second category
- Red: Third category
- Blue: Fourth category
- Purple: Fifth category
- Pink: Sixth category
- Indigo: Seventh category

## How It Works

### Category Card Click
```typescript
const handleCategoryClick = (categorySlug: string) => {
  setFilterCategory(categorySlug)
}
```

When you click a category card:
1. `filterCategory` state is updated
2. Products are filtered by category slug
3. Card gets blue ring to show it's selected
4. Product table shows only products in that category

### Product Filtering
```typescript
const filteredProducts = adminProducts.filter((product) => {
  const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
  const matchesCategory = filterCategory === 'all' || product.category === filterCategory
  return matchesSearch && matchesCategory
})
```

Products are filtered by:
1. Search query (product name)
2. Selected category (from card click or dropdown)

### Category Dropdown Sync
The dropdown in the actions bar is also updated to show categories from database:
```typescript
<select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
  <option value="all">All Categories</option>
  {adminCategories
    .filter(cat => cat.isActive)
    .sort((a, b) => a.order - b.order)
    .map(category => (
      <option key={category.id} value={category.slug}>
        {category.icon} {category.name}
      </option>
    ))}
</select>
```

## Usage

### View All Products
1. Click **"Total Products"** card
2. All products are displayed

### Filter by Category
1. Click any **category card** (e.g., "Pulses")
2. Only products in that category are displayed
3. Card shows blue ring to indicate selection

### Use Dropdown
1. Select category from **dropdown** in actions bar
2. Same filtering as clicking card
3. Useful when many categories exist

### Search + Filter
1. Click a category card to filter
2. Type in search box to further filter by name
3. Both filters work together

## Benefits

✅ **Dynamic**: Automatically shows all categories from database
✅ **Real-time**: Product counts update as you add/delete products
✅ **User-friendly**: Click to filter, visual feedback
✅ **Responsive**: Works on all screen sizes
✅ **Scalable**: Supports unlimited categories (shows first 7 + Total)
✅ **Consistent**: Dropdown and cards stay in sync

## Example Scenarios

### Scenario 1: View Pulses Products
1. Admin opens dashboard
2. Sees "Pulses" card showing "5" products
3. Clicks "Pulses" card
4. Table shows only 5 pulse products
5. Card has blue ring

### Scenario 2: Add New Category
1. Admin adds new category "Rice" in Category Management
2. Returns to dashboard
3. New "Rice" card appears automatically
4. Shows "0" products initially
5. Can click to filter (shows empty state)

### Scenario 3: Search Within Category
1. Admin clicks "Dry Fruits" card (10 products)
2. Types "almond" in search box
3. Shows only almond products from dry fruits category
4. Both filters active

## Technical Details

### State Management
```typescript
const [filterCategory, setFilterCategory] = useState('all')
```
- Stores currently selected category slug
- Default: 'all' (show all products)
- Updated by card click or dropdown change

### Category Loading
```typescript
const { categories: adminCategories } = useAdminStore()
```
- Categories loaded from Firestore on mount
- Stored in Zustand store
- Shared across admin pages

### Product Counting
```typescript
const categoryCount = adminProducts.filter(p => p.category === category.slug).length
```
- Counts products for each category
- Real-time calculation
- Updates when products added/deleted

## Styling

### Selected State
```css
filterCategory === category.slug ? 'ring-2 ring-primary-500' : ''
```
- Blue ring around selected card
- 2px border width
- Primary color (matches brand)

### Hover Effect
```css
hover:shadow-lg
```
- Shadow increases on hover
- Indicates clickability
- Smooth transition

### Responsive Sizing
```css
text-xs sm:text-sm  /* Category name */
text-xl sm:text-2xl /* Product count */
w-10 h-10 sm:w-12 sm:h-12 /* Icon container */
```
- Smaller on mobile
- Larger on desktop
- Smooth scaling

## Files Modified

- `src/app/admin/dashboard/page.tsx` - Main dashboard component

## Testing Checklist

- [ ] Category cards load from database ✅
- [ ] Product counts are correct ✅
- [ ] Click "Total Products" shows all products ✅
- [ ] Click category card filters products ✅
- [ ] Selected card has blue ring ✅
- [ ] Dropdown stays in sync with cards ✅
- [ ] Search + category filter work together ✅
- [ ] Responsive on mobile ✅
- [ ] Responsive on tablet ✅
- [ ] Responsive on desktop ✅
- [ ] New categories appear automatically ✅
- [ ] Category icons display correctly ✅

## Future Enhancements

Possible improvements:
1. Show "View All" button if more than 7 categories
2. Add category management link from dashboard
3. Show inactive categories count
4. Add animation when switching categories
5. Remember last selected category in localStorage
6. Add keyboard shortcuts (1-9 for categories)

## Related Documentation

- `ADMIN_FIXES_SUMMARY.md` - Overview of admin improvements
- `DATABASE_IMPROVEMENTS.md` - Category management details
- `CATEGORY_MANAGEMENT_GUIDE.md` - How to manage categories
