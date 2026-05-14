# Database and Image Management Improvements

## Issues Fixed

### 1. Category Name Changes Update Products ✅
**Problem**: When a category name/slug was changed, products with the old category slug were not updated.

**Solution**: 
- Added `updateProductsCategory()` function in `src/lib/db/categories.ts`
- When a category slug is updated, all products with the old slug are automatically updated to the new slug
- Uses Firestore batch updates for efficiency
- Logs the number of products updated

**How it works**:
```typescript
// When updating a category
await updateCategory(categoryId, newData, oldSlug)
// Automatically updates all products from oldSlug to newSlug
```

### 2. Prevent Duplicate Category Names ✅
**Problem**: Multiple categories could be created with the same name or slug.

**Solution**:
- Added `checkCategoryExists()` function in `src/lib/db/categories.ts`
- Checks both name and slug for duplicates before saving
- Case-insensitive comparison
- Excludes current category when editing (allows saving without changes)
- Shows user-friendly error messages

**Validation**:
- ❌ "A category with this name already exists"
- ❌ "A category with this slug already exists"
- ✅ Allows editing existing category without name/slug change

### 3. Product Image Upload/Update/Delete ✅
**Problem**: Product images were stored as base64 strings in the database, making it impossible to update or delete them. Images were not uploaded to Firebase Storage.

**Solution**:
- Created `src/lib/storage.ts` with comprehensive image management functions
- Images are now uploaded to Firebase Storage
- Each product gets its own folder: `products/{productId}/`
- Old images are automatically deleted when updating
- Images are deleted when product is deleted

**Features**:
- ✅ Upload single or multiple images
- ✅ Delete single or multiple images
- ✅ Replace images (delete old, upload new)
- ✅ Automatic cleanup on product deletion
- ✅ Support for both File objects and base64 strings
- ✅ Skip deletion for non-Firebase URLs (external images)

## New Functions

### Category Management (`src/lib/db/categories.ts`)

#### `updateCategory(id, updates, oldSlug?)`
Updates a category and optionally updates all products if slug changed.
```typescript
await updateCategory('cat-123', { 
  name: 'New Name', 
  slug: 'new-slug' 
}, 'old-slug')
```

#### `checkCategoryExists(name, slug, excludeId?)`
Checks if a category name or slug already exists.
```typescript
const { nameExists, slugExists } = await checkCategoryExists(
  'Pulses', 
  'pulses', 
  'current-cat-id'
)
```

### Image Management (`src/lib/storage.ts`)

#### `uploadImage(file, path)`
Upload a single image to Firebase Storage.
```typescript
const url = await uploadImage(file, 'products/prod-123/image.jpg')
```

#### `deleteImage(imageUrl)`
Delete an image from Firebase Storage.
```typescript
await deleteImage('https://firebasestorage.googleapis.com/...')
```

#### `uploadMultipleImages(files, basePath)`
Upload multiple images at once.
```typescript
const urls = await uploadMultipleImages(
  [file1, file2, file3], 
  'products/prod-123'
)
```

#### `deleteMultipleImages(imageUrls)`
Delete multiple images at once.
```typescript
await deleteMultipleImages([url1, url2, url3])
```

#### `replaceProductImages(oldImages, newImages, productId)`
Replace product images - delete old, upload new.
```typescript
const newUrls = await replaceProductImages(
  oldImageUrls, 
  newImageFiles, 
  'prod-123'
)
```

## Updated Functions

### `addProduct()` - Enhanced
- Now uploads base64 images to Firebase Storage
- Creates product first to get ID
- Uploads images to `products/{id}/` folder
- Updates product with final image URLs

### `updateProduct()` - Enhanced
- Handles image updates automatically
- Uploads new base64 images to Storage
- Keeps existing Firebase Storage URLs
- Updates product with final image URLs

### `deleteProduct()` - Enhanced
- Fetches product to get image URLs
- Deletes product document from Firestore
- Deletes all associated images from Storage
- Handles errors gracefully

## Storage Structure

```
Firebase Storage
└── products/
    ├── product-id-1/
    │   ├── image-0-timestamp.jpg
    │   ├── image-1-timestamp.jpg
    │   └── image-2-timestamp.jpg
    ├── product-id-2/
    │   ├── image-0-timestamp.jpg
    │   └── image-1-timestamp.jpg
    └── ...
```

## Firestore Structure

### Products Collection
```json
{
  "products": {
    "product-id": {
      "name": "Product Name",
      "category": "category-slug",
      "images": [
        "https://firebasestorage.googleapis.com/.../image-0.jpg",
        "https://firebasestorage.googleapis.com/.../image-1.jpg"
      ],
      "variants": [...],
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  }
}
```

### Categories Collection
```json
{
  "categories": {
    "category-id": {
      "name": "Category Name",
      "slug": "category-slug",
      "description": "Description",
      "icon": "🌾",
      "isActive": true,
      "order": 1,
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  }
}
```

## Usage Examples

### Adding a Product with Images
```typescript
const product = {
  name: 'Toor Dal',
  category: 'pulses',
  images: [base64Image1, base64Image2], // Will be uploaded to Storage
  variants: [...],
  // ... other fields
}

const productId = await addProduct(product)
// Images are automatically uploaded to products/{productId}/
```

### Updating a Product with New Images
```typescript
const updates = {
  name: 'Updated Name',
  images: [
    existingUrl1, // Keep this
    base64NewImage, // Upload this
    existingUrl2, // Keep this
  ]
}

await updateProduct(productId, updates)
// New base64 images are uploaded, existing URLs are kept
```

### Updating a Category Name
```typescript
// Old category slug: 'pulses'
// New category slug: 'dals'

await updateCategory('cat-123', {
  name: 'Dals & Pulses',
  slug: 'dals'
}, 'pulses')

// All products with category='pulses' are now category='dals'
```

### Deleting a Product
```typescript
await deleteProduct('prod-123')
// Product document deleted from Firestore
// All images deleted from Storage (products/prod-123/)
```

## Error Handling

All functions include comprehensive error handling:
- ✅ Permission denied errors
- ✅ Not found errors
- ✅ Network errors
- ✅ Invalid data errors
- ✅ Storage errors

Errors are logged to console with detailed information and user-friendly messages are shown via toast notifications.

## Security Rules Required

Make sure your Firestore Security Rules allow:
1. Read/write access to `products` collection
2. Read/write access to `categories` collection
3. Read/write access to Firebase Storage `products/` folder

Example rules in `FIRESTORE_RULES_FIX.md`.

## Testing Checklist

### Category Management
- [ ] Create new category - should not allow duplicate names
- [ ] Create new category - should not allow duplicate slugs
- [ ] Update category name - should update all products
- [ ] Update category slug - should update all products
- [ ] Delete category - should work properly

### Product Image Management
- [ ] Add product with images - images should upload to Storage
- [ ] Update product - add new images
- [ ] Update product - remove images
- [ ] Update product - replace images
- [ ] Delete product - images should be deleted from Storage
- [ ] Check Storage console - verify images are in correct folders

### Product Category Updates
- [ ] Change category slug - verify products update automatically
- [ ] Check product list - verify category filter still works
- [ ] Check product details - verify category displays correctly

## Files Modified

1. `src/lib/db/categories.ts` - Enhanced category management
2. `src/lib/db/products.ts` - Enhanced product management
3. `src/lib/storage.ts` - NEW: Image upload/delete functions
4. `src/components/admin/CategoryForm.tsx` - Duplicate checking
5. `src/components/admin/ProductForm.tsx` - Image upload handling

## Benefits

✅ **Data Integrity**: Products always have valid category references
✅ **No Duplicates**: Prevents confusion from duplicate category names
✅ **Proper Storage**: Images stored in Firebase Storage, not database
✅ **Automatic Cleanup**: Old images deleted automatically
✅ **Better Performance**: Smaller database size, faster queries
✅ **Scalability**: Can handle thousands of products and images
✅ **User-Friendly**: Clear error messages and feedback
