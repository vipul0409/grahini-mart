# 📸 How to Add Your Own Images

## 🎯 Two Types of Images Needed

### 1. Product Images (6 images)
Small square images for individual products

### 2. Banner Images (6 images)
Large wide images for the homepage slider

---

## 📦 PRODUCT IMAGES

### Step 1: Prepare Product Images
Rename your images to these exact names:
- `toor-dal.jpg`
- `cashews.jpg`
- `almonds.jpg`
- `red-chilli-powder.jpg`
- `turmeric-powder.jpg`
- `garam-masala.jpg`

### Step 2: Add to Folder
Copy all 6 images to: `D:\Grahini\public\products\`

### Step 3: Restart Server
```bash
npm run dev
```

**✅ Product images are already configured in the code!**

---

## 🎨 BANNER IMAGES (Hero Slider)

### Step 1: Prepare Banner Images

You need **6 banner images** (3 for desktop + 3 for mobile):

#### Desktop Banners (Wide - 1200x500px)
1. `dry-fruits-banner.jpg` - Show cashews, almonds, dry fruits
2. `masala-banner.jpg` - Show colorful spice powders
3. `pulses-banner.jpg` - Show dal, pulses, lentils

#### Mobile Banners (Square - 800x600px)
4. `dry-fruits-banner-mobile.jpg` - Same as desktop but cropped for mobile
5. `masala-banner-mobile.jpg` - Same as desktop but cropped for mobile
6. `pulses-banner-mobile.jpg` - Same as desktop but cropped for mobile

### Step 2: Add to Folder
Copy all 6 images to: `D:\Grahini\public\banners\`

### Step 3: Restart Server
```bash
npm run dev
```

**✅ Banner images are already configured in the code!**

---

## 📁 Final Folder Structure

```
D:\Grahini\
  public\
    products\
      ├── toor-dal.jpg
      ├── cashews.jpg
      ├── almonds.jpg
      ├── red-chilli-powder.jpg
      ├── turmeric-powder.jpg
      └── garam-masala.jpg
    banners\
      ├── dry-fruits-banner.jpg
      ├── dry-fruits-banner-mobile.jpg
      ├── masala-banner.jpg
      ├── masala-banner-mobile.jpg
      ├── pulses-banner.jpg
      └── pulses-banner-mobile.jpg
```

---

## 💡 Image Requirements

### Product Images
- **Size:** 800x800px (square)
- **Format:** JPG or PNG
- **Style:** Clean, white/light background, product clearly visible

### Banner Images
- **Desktop:** 1200x500px (wide landscape)
- **Mobile:** 800x600px (more square)
- **Format:** JPG or PNG
- **Style:** Colorful, eye-catching, promotional

---

## 🔍 Where to Find Images

### Free Stock Photos:
- **Unsplash**: https://unsplash.com/
- **Pexels**: https://pexels.com/
- **Pixabay**: https://pixabay.com/

### Product Images:
- **Google Images**: Search "product name + product"
- **Amazon India**: Product images
- **BigBasket**: Product images

---

## 📋 Complete Checklist

### Product Images (6)
- [ ] toor-dal.jpg
- [ ] cashews.jpg
- [ ] almonds.jpg
- [ ] red-chilli-powder.jpg
- [ ] turmeric-powder.jpg
- [ ] garam-masala.jpg

### Banner Images (6)
- [ ] dry-fruits-banner.jpg
- [ ] dry-fruits-banner-mobile.jpg
- [ ] masala-banner.jpg
- [ ] masala-banner-mobile.jpg
- [ ] pulses-banner.jpg
- [ ] pulses-banner-mobile.jpg

### After Adding All Images
- [ ] All 12 images in correct folders
- [ ] Filenames match exactly
- [ ] Server restarted with `npm run dev`
- [ ] Homepage checked - slider working
- [ ] Products page checked - images showing

---

## 🆘 Quick Tip

**Don't have separate mobile banners?**
Just copy your desktop banner images and rename them:
- Copy `dry-fruits-banner.jpg` → `dry-fruits-banner-mobile.jpg`
- Copy `masala-banner.jpg` → `masala-banner-mobile.jpg`
- Copy `pulses-banner.jpg` → `pulses-banner-mobile.jpg`

The app will automatically use the right size!

---

## 🚀 You're All Set!

Once you add all images:
1. Put them in the correct folders
2. Restart server: `npm run dev`
3. Open http://localhost:3000
4. See your images live! 🎉

---

**Need help? Check the README files in each folder for more details!**
