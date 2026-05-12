# 📸 Current Product Images

## 🖼️ Images Currently Used

### 1. Premium Toor Dal
**Current Image:** 
```
https://5.imimg.com/data5/SELLER/Default/2023/8/334896088/HL/XT/NN/4752055/unpolished-toor-dal.jpg
```
**Shows:** Unpolished toor dal (yellow lentils)
**Source:** Trade India

---

### 2. Premium Cashews (Kaju)
**Current Image:**
```
https://5.imimg.com/data5/SELLER/Default/2022/8/YL/DP/HZ/21992262/cashew-nuts.jpg
```
**Shows:** Whole cashew nuts
**Source:** IndiaMART

---

### 3. Organic Turmeric Powder
**Current Image:**
```
https://images.unsplash.com/photo-1615485500834-bc10199bc727?w=800
```
**Shows:** Turmeric powder and root
**Source:** Unsplash

---

### 4. Kashmiri Red Chilli Powder
**Current Image:**
```
https://5.imimg.com/data5/SELLER/Default/2022/9/TP/FS/IG/21992262/kashmiri-red-chilli-powder.jpg
```
**Shows:** Red chilli powder
**Source:** IndiaMART

---

### 5. Premium Almonds (Badam)
**Current Image:**
```
https://images.immediate.co.uk/production/volatile/sites/30/2020/02/Almonds-9e25ce7.jpg
```
**Shows:** Brown almonds
**Source:** BBC Good Food

---

### 6. Garam Masala Powder
**Current Image:**
```
https://images.unsplash.com/photo-1596040033229-a0b3b83a6c8c?w=800
```
**Shows:** Mixed spices
**Source:** Unsplash

---

## 🔄 How to Change Images

### Option 1: Use Your Own Images (Recommended)

1. **Prepare images** (JPG or PNG, 800x800px minimum)
2. **Create folder:** `public/products/`
3. **Copy images** to that folder
4. **Update** `src/lib/sampleData.ts`:

```typescript
images: [
  '/products/your-image.jpg',
  '/products/your-image.jpg',
],
```

### Option 2: Use Different Online Images

1. **Find image** on Google/Amazon/BigBasket
2. **Copy image URL**
3. **Add hostname** to `next.config.js`:

```javascript
{
  protocol: 'https',
  hostname: 'your-site.com',
}
```

4. **Update** `src/lib/sampleData.ts` with new URL

---

## 📝 Image Requirements

### Technical:
- ✅ Format: JPG or PNG
- ✅ Size: Minimum 800x800px
- ✅ Max file size: 500KB recommended
- ✅ Aspect ratio: Square (1:1) preferred

### Quality:
- ✅ Clear and sharp
- ✅ Good lighting
- ✅ Clean background
- ✅ Product clearly visible
- ✅ Professional appearance

---

## 🎯 Recommended Image Sources

### Free Stock Photos:
1. **Unsplash** - https://unsplash.com/s/photos/indian-spices
2. **Pexels** - https://pexels.com/search/indian-grocery
3. **Pixabay** - https://pixabay.com/images/search/spices

### Product Photos:
1. **Amazon India** - Search product, right-click image
2. **BigBasket** - Product images
3. **Flipkart** - Product images
4. **IndiaMART** - Wholesale product images

---

## 🚀 Quick Replace Guide

Want to replace all images quickly?

1. Download 6 product images
2. Rename them:
   - `toor-dal.jpg`
   - `cashews.jpg`
   - `turmeric.jpg`
   - `red-chilli.jpg`
   - `almonds.jpg`
   - `garam-masala.jpg`

3. Put in `public/products/` folder

4. I'll update the code for you!

---

## 📞 Need Help?

Tell me:
1. Do you have images ready? (Yes/No)
2. Are they local files or online URLs?
3. What are the filenames/URLs?

I'll update the code immediately! 🚀
