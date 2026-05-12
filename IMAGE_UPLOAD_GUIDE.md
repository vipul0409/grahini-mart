# 🖼️ Complete Image Upload Guide for Grahini Mart

## 📋 What You Need to Upload

You need to upload **12 images total**:
- **6 Product Images** (for product cards)
- **6 Banner Images** (for homepage slider)

---

## 📦 PART 1: Product Images

### Folder Location
```
D:\Grahini\public\products\
```

### Required Files (6 images)
1. `toor-dal.jpg` - Toor Dal product image
2. `cashews.jpg` - Cashews (Kaju) product image
3. `almonds.jpg` - Almonds (Badam) product image
4. `red-chilli-powder.jpg` - Red Chilli Powder product image
5. `turmeric-powder.jpg` - Turmeric Powder product image
6. `garam-masala.jpg` - Garam Masala product image

### Image Specs
- **Size:** 800x800px (square)
- **Format:** JPG or PNG
- **Background:** Clean, white or light colored
- **Quality:** High resolution, clear product

---

## 🎨 PART 2: Banner Images (Hero Slider)

### Folder Location
```
D:\Grahini\public\banners\
```

### Required Files (6 images)

#### Desktop Banners (3 images)
1. `dry-fruits-banner.jpg` - Dry fruits promotional banner (1200x500px)
2. `masala-banner.jpg` - Masala powders promotional banner (1200x500px)
3. `pulses-banner.jpg` - Pulses/Dal promotional banner (1200x500px)

#### Mobile Banners (3 images)
4. `dry-fruits-banner-mobile.jpg` - Dry fruits mobile banner (800x600px)
5. `masala-banner-mobile.jpg` - Masala mobile banner (800x600px)
6. `pulses-banner-mobile.jpg` - Pulses mobile banner (800x600px)

### Image Specs
- **Desktop:** 1200x500px (wide landscape)
- **Mobile:** 800x600px (more square/portrait)
- **Format:** JPG or PNG
- **Style:** Colorful, promotional, eye-catching

---

## 🚀 Step-by-Step Upload Process

### Step 1: Create Folders (if not exist)
```bash
# In your project root D:\Grahini\
mkdir public\products
mkdir public\banners
```

### Step 2: Prepare Your Images
- Download or create 12 images
- Rename them to match the exact filenames above
- Make sure they meet the size requirements

### Step 3: Copy Images to Folders
```
D:\Grahini\public\products\
  ├── toor-dal.jpg
  ├── cashews.jpg
  ├── almonds.jpg
  ├── red-chilli-powder.jpg
  ├── turmeric-powder.jpg
  └── garam-masala.jpg

D:\Grahini\public\banners\
  ├── dry-fruits-banner.jpg
  ├── dry-fruits-banner-mobile.jpg
  ├── masala-banner.jpg
  ├── masala-banner-mobile.jpg
  ├── pulses-banner.jpg
  └── pulses-banner-mobile.jpg
```

### Step 4: Restart Development Server
```bash
npm run dev
```

### Step 5: Check Your Website
Open: http://localhost:3000
- Homepage slider should show your banner images
- Product cards should show your product images

---

## ✅ Quick Checklist

### Product Images
- [ ] toor-dal.jpg uploaded
- [ ] cashews.jpg uploaded
- [ ] almonds.jpg uploaded
- [ ] red-chilli-powder.jpg uploaded
- [ ] turmeric-powder.jpg uploaded
- [ ] garam-masala.jpg uploaded

### Banner Images - Desktop
- [ ] dry-fruits-banner.jpg uploaded
- [ ] masala-banner.jpg uploaded
- [ ] pulses-banner.jpg uploaded

### Banner Images - Mobile
- [ ] dry-fruits-banner-mobile.jpg uploaded
- [ ] masala-banner-mobile.jpg uploaded
- [ ] pulses-banner-mobile.jpg uploaded

### Final Steps
- [ ] All 12 images in correct folders
- [ ] Filenames match exactly (case-sensitive)
- [ ] Server restarted
- [ ] Website checked and working

---

## 💡 Pro Tips

### Don't Have Mobile Banners?
Just copy your desktop banners and rename them:
```bash
copy dry-fruits-banner.jpg dry-fruits-banner-mobile.jpg
copy masala-banner.jpg masala-banner-mobile.jpg
copy pulses-banner.jpg pulses-banner-mobile.jpg
```

### Where to Get Images?
- **Google Images**: Search "product name + product"
- **Unsplash**: https://unsplash.com/ (free stock photos)
- **Pexels**: https://pexels.com/ (free stock photos)
- **Your own photos**: Take pictures of actual products

### Image Quality Tips
- ✅ Use high resolution images
- ✅ Good lighting
- ✅ Clear product visibility
- ✅ Professional look
- ❌ Avoid blurry or pixelated images
- ❌ Avoid watermarked images

---

## 🆘 Troubleshooting

### Images Not Showing?
1. Check filenames match exactly (case-sensitive)
2. Check images are in correct folders
3. Restart dev server: `npm run dev`
4. Clear browser cache (Ctrl + Shift + R)

### Wrong Images Showing?
1. Make sure you replaced the correct file
2. Check filename spelling
3. Restart server

### Images Too Large/Small?
- Resize images to recommended dimensions
- Use online tools like: https://www.iloveimg.com/resize-image

---

## 📞 All Set!

Once you upload all 12 images and restart the server, your Grahini Mart website will have:
- ✅ Beautiful product images on all product cards
- ✅ Eye-catching banner slider on homepage
- ✅ Professional look throughout the site

**Happy uploading! 🎉**

---

## 📄 Additional Help Files

- `public/products/README.md` - Product images guide
- `public/banners/README.md` - Banner images guide
- `HOW_TO_ADD_IMAGES.md` - Detailed image guide
