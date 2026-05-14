# Firebase Storage Security Rules

## Overview
These rules allow authenticated admin users to upload, read, and delete product images in Firebase Storage.

## How to Update Storage Rules

1. Go to [Firebase Console](https://console.firebase.google.com/project/grahini-mart/storage)
2. Click on the **Rules** tab
3. Replace the existing rules with the rules below
4. Click **Publish**

## Storage Rules

```javascript
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    
    // Products folder - images for products
    match /products/{productId}/{allPaths=**} {
      // Allow read access to everyone (for displaying images on website)
      allow read: if true;
      
      // Allow write/delete access to authenticated users only (admin)
      allow write, delete: if request.auth != null;
    }
    
    // Categories folder (if needed in future)
    match /categories/{categoryId}/{allPaths=**} {
      allow read: if true;
      allow write, delete: if request.auth != null;
    }
    
    // Default: deny all other access
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

## Rule Explanation

### Products Folder Rules
```javascript
match /products/{productId}/{allPaths=**}
```
- Matches all files under `products/` folder
- `{productId}` is a wildcard for any product ID
- `{allPaths=**}` matches all nested files

**Read Access**:
```javascript
allow read: if true;
```
- Anyone can read/view images (needed for website visitors)
- No authentication required

**Write/Delete Access**:
```javascript
allow write, delete: if request.auth != null;
```
- Only authenticated users can upload/delete images
- Admin must be logged in to Firebase Auth
- Prevents unauthorized image uploads

### Categories Folder Rules
Same as products, prepared for future use if category images are needed.

### Default Deny Rule
```javascript
match /{allPaths=**} {
  allow read, write: if false;
}
```
- Denies all access to other folders
- Security best practice

## Testing Storage Rules

### Test Read Access (Should Work)
```javascript
// Anyone can view images
const imageUrl = 'https://firebasestorage.googleapis.com/.../products/prod-123/image.jpg'
// This should load in browser without authentication
```

### Test Write Access (Should Work When Authenticated)
```javascript
// Admin logged in
const storageRef = ref(storage, 'products/prod-123/image.jpg')
await uploadBytes(storageRef, file)
// Should succeed ✅
```

### Test Write Access (Should Fail When Not Authenticated)
```javascript
// No user logged in
const storageRef = ref(storage, 'products/prod-123/image.jpg')
await uploadBytes(storageRef, file)
// Should fail with permission-denied ❌
```

## Storage Structure

After implementing these rules, your storage will look like:

```
Firebase Storage (grahini-mart.firebasestorage.app)
└── products/
    ├── prod-abc123/
    │   ├── image-0-1234567890.jpg
    │   ├── image-1-1234567890.jpg
    │   └── image-2-1234567890.jpg
    ├── prod-def456/
    │   ├── image-0-1234567891.jpg
    │   └── image-1-1234567891.jpg
    └── prod-ghi789/
        └── image-0-1234567892.jpg
```

## Common Issues

### Issue: "Permission denied" when uploading
**Solution**: Make sure admin is logged in to Firebase Auth before uploading images.

### Issue: Images not loading on website
**Solution**: Check that `allow read: if true;` is set for the products folder.

### Issue: Old images not being deleted
**Solution**: 
1. Check that Storage rules allow delete for authenticated users
2. Verify admin is logged in when deleting products
3. Check browser console for error messages

## Security Best Practices

✅ **Public Read Access**: Images need to be publicly readable for website visitors
✅ **Authenticated Write**: Only logged-in admins can upload/delete
✅ **Organized Structure**: Each product has its own folder
✅ **Default Deny**: All other paths are blocked
✅ **No Anonymous Uploads**: Prevents spam and abuse

## Integration with Admin Panel

The admin panel automatically:
1. Logs in admin user via Firebase Auth
2. Uploads images to `products/{productId}/` folder
3. Stores image URLs in Firestore
4. Deletes old images when updating products
5. Deletes all images when deleting products

## Monitoring

You can monitor storage usage in Firebase Console:
- **Storage Usage**: Dashboard → Storage → Usage
- **File Browser**: Browse uploaded files
- **Activity Log**: See recent uploads/deletes

## Cost Optimization

Firebase Storage pricing:
- **Storage**: $0.026/GB per month
- **Download**: $0.12/GB
- **Upload**: Free

Tips to reduce costs:
1. Compress images before upload (use tools like TinyPNG)
2. Use appropriate image sizes (don't upload 4K images)
3. Delete unused images regularly
4. Consider using CDN for frequently accessed images

## Next Steps

1. ✅ Update Storage Rules in Firebase Console
2. ✅ Test image upload in admin panel
3. ✅ Test image display on website
4. ✅ Test image deletion
5. ✅ Monitor storage usage

## Related Files

- `src/lib/storage.ts` - Image upload/delete functions
- `src/lib/db/products.ts` - Product CRUD with image handling
- `src/components/admin/ProductForm.tsx` - Image upload UI
- `FIRESTORE_RULES_FIX.md` - Firestore security rules
- `DATABASE_IMPROVEMENTS.md` - Database improvements documentation
