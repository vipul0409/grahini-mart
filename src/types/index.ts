export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  category: string
  subcategory?: string
  images: string[]
  variants: ProductVariant[]
  nutrition?: NutritionInfo
  features: string[]
  tags: string[]
  rating: number
  reviewCount: number
  isFeatured: boolean
  isNew: boolean
  isBestSeller: boolean
  stock: number
  createdAt: Date
  updatedAt: Date
}

export interface ProductVariant {
  id: string
  weight: string
  unit: 'g' | 'kg'
  price: number
  mrp: number
  discount: number
  sku: string
  stock: number
  isDefault?: boolean
}

export interface NutritionInfo {
  servingSize: string
  calories: number
  protein: string
  carbs: string
  fat: string
  fiber: string
  [key: string]: string | number
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  image: string
  icon?: string
  productCount: number
  order: number
  isActive: boolean
}

export interface CartItem {
  productId: string
  variantId: string
  quantity: number
  product: Product
  variant: ProductVariant
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  discount: number
  deliveryCharge: number
  total: number
  couponCode?: string
}

export interface Address {
  id: string
  userId: string
  name: string
  phone: string
  addressLine1: string
  addressLine2?: string
  landmark?: string
  city: string
  state: string
  pincode: string
  isDefault: boolean
  type: 'home' | 'work' | 'other'
}

export interface User {
  id: string
  email: string
  phone: string
  name: string
  photoURL?: string
  addresses: Address[]
  wishlist: string[]
  loyaltyPoints: number
  createdAt: Date
  lastLogin: Date
}

export interface Order {
  id: string
  userId: string
  orderNumber: string
  items: OrderItem[]
  subtotal: number
  discount: number
  deliveryCharge: number
  total: number
  couponCode?: string
  couponDiscount: number
  paymentMethod: 'razorpay' | 'cod'
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  paymentId?: string
  orderStatus: OrderStatus
  shippingAddress: Address
  trackingNumber?: string
  estimatedDelivery?: Date
  deliveredAt?: Date
  createdAt: Date
  updatedAt: Date
  notes?: string
}

export interface OrderItem {
  productId: string
  variantId: string
  name: string
  image: string
  weight: string
  price: number
  quantity: number
  total: number
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'packed'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'refunded'

export interface Coupon {
  id: string
  code: string
  description: string
  type: 'percentage' | 'fixed'
  value: number
  minOrderValue: number
  maxDiscount?: number
  usageLimit: number
  usedCount: number
  validFrom: Date
  validTo: Date
  isActive: boolean
}

export interface Banner {
  id: string
  title: string
  subtitle?: string
  image: string
  mobileImage?: string
  link?: string
  buttonText?: string
  order: number
  isActive: boolean
}

export interface Review {
  id: string
  productId: string
  userId: string
  userName: string
  userPhoto?: string
  rating: number
  title: string
  comment: string
  images?: string[]
  isVerified: boolean
  helpful: number
  createdAt: Date
}

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: 'order' | 'offer' | 'general'
  isRead: boolean
  link?: string
  createdAt: Date
}

export interface FilterOptions {
  categories: string[]
  priceRange: [number, number]
  weights: string[]
  sortBy: 'popular' | 'price-low' | 'price-high' | 'newest' | 'rating'
  inStock: boolean
}
