export const SITE_NAME = 'Grahini Mart'
export const SITE_DESCRIPTION = 'थोक दाम में किराना, अब आपके दरवाजे पर - Premium quality pulses, dry fruits, spices at wholesale rates'
export const SITE_TAGLINE = 'थोक दाम में किराना, अब आपके दरवाजे पर'
export const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
export const WHATSAPP_NUMBER = '918989475895'
export const PHONE_NUMBER = '918989475895' // For phone calls
export const INSTAGRAM_HANDLE = 'Grahini_Mart7'
export const INSTAGRAM_URL = 'https://www.instagram.com/Grahini_Mart7'
export const FACEBOOK_PAGE = 'Grahini Mart'
export const EMAIL = 'grahinimart7@gmail.com'
export const ADDRESS = 'Gwalior, MP (474001)'

export const CATEGORIES = [
  {
    id: 'pulses',
    name: 'Pulses & Dals',
    slug: 'pulses',
    icon: '🫘',
    description: 'Premium quality pulses and dals',
  },
  {
    id: 'dry-fruits',
    name: 'Dry Fruits',
    slug: 'dry-fruits',
    icon: '🥜',
    description: 'Fresh and nutritious dry fruits',
  },
  {
    id: 'spices',
    name: 'Whole Spices',
    slug: 'spices',
    icon: '🌶️',
    description: 'Aromatic whole spices',
  },
  {
    id: 'masala',
    name: 'Masala Powders',
    slug: 'masala',
    icon: '🧂',
    description: 'Freshly ground masala powders',
  },
  {
    id: 'rice',
    name: 'Rice & Grains',
    slug: 'rice',
    icon: '🌾',
    description: 'Premium rice varieties',
  },
  {
    id: 'flour',
    name: 'Flour & Atta',
    slug: 'flour',
    icon: '🌾',
    description: 'Fresh milled flour',
  },
]

export const WEIGHT_OPTIONS = [
  { value: '250g', label: '250g' },
  { value: '500g', label: '500g' },
  { value: '1kg', label: '1 kg' },
  { value: '2kg', label: '2 kg' },
  { value: '5kg', label: '5 kg' },
]

export const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'newest', label: 'Newest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
]

export const ORDER_STATUS_LABELS = {
  pending: 'Order Placed',
  confirmed: 'Confirmed',
  processing: 'Processing',
  packed: 'Packed',
  shipped: 'Shipped',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
  refunded: 'Refunded',
}

export const PAYMENT_METHODS = [
  { id: 'razorpay', name: 'UPI / Card / Netbanking', icon: '💳' },
  { id: 'cod', name: 'Cash on Delivery', icon: '💵' },
]

export const DELIVERY_SLOTS = [
  { id: '1', label: 'Morning (8 AM - 12 PM)' },
  { id: '2', label: 'Afternoon (12 PM - 4 PM)' },
  { id: '3', label: 'Evening (4 PM - 8 PM)' },
]

export const FREE_DELIVERY_THRESHOLD = 500
export const MIN_ORDER_VALUE = 100
export const MAX_CART_QUANTITY = 10

export const TESTIMONIALS = [
  {
    id: '1',
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    comment: 'Best quality pulses and spices! Fresh products and quick delivery.',
    image: '/testimonials/user1.jpg',
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    location: 'Delhi',
    rating: 5,
    comment: 'Excellent service and premium quality dry fruits. Highly recommended!',
    image: '/testimonials/user2.jpg',
  },
  {
    id: '3',
    name: 'Anita Patel',
    location: 'Ahmedabad',
    rating: 5,
    comment: 'Love the masala powders! Authentic taste and great packaging.',
    image: '/testimonials/user3.jpg',
  },
]

export const WHY_CHOOSE_US = [
  {
    icon: '❤️',
    title: 'Premium Quality',
    description: 'Fresh & handpicked products with trusted quality',
  },
  {
    icon: '💰',
    title: 'Wholesale Rates',
    description: 'Quality bhi aur bachat bhi - best prices guaranteed',
  },
  {
    icon: '🚚',
    title: 'Free Delivery',
    description: 'Free delivery within 24hrs in Gwalior',
  },
  {
    icon: '📦',
    title: 'Flexible Quantity',
    description: 'Zarurat ke hisaab se quantity available',
  },
]

export const ABOUT_US = {
  title: 'Grahini Mart',
  subtitle: 'Premium Grocery, Wholesale Rates Mein',
  description: `Grahini Mart sirf ek grocery store nahi, har ghar ki smart shopping partner hai.

Yahan milti hai premium quality daal, masale, dry fruits aur daily essentials – woh bhi wholesale rates mein, bina quality compromise kiye.

Humara goal simple hai:
"Har grahini ko mile quality bhi ❤️ aur bachat bhi 💰"

✔️ Fresh & handpicked products
✔️ Pure masale aur trusted quality
✔️ Zarurat ke hisaab se quantity available
✔️ Free delivery within 24hrs 🚚
✔️ Direct WhatsApp ordering for easy shopping

Ghar ki rasoi ka bharosa, ab online ✨`,
  tagline: 'Grahini Mart – Premium Grocery, Wholesale Rates Mein',
}
