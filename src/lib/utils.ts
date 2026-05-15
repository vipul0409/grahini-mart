import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export function calculateDiscount(mrp: number, price: number): number {
  return Math.round(((mrp - price) / mrp) * 100)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim()
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `ORD-${timestamp}-${random}`
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

export function getWhatsAppLink(phone: string, message: string): string {
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${phone}?text=${encodedMessage}`
}

export function validatePincode(pincode: string): boolean {
  return /^[1-9][0-9]{5}$/.test(pincode)
}

export function validatePhone(phone: string): boolean {
  return /^[6-9]\d{9}$/.test(phone)
}

export function getDeliveryCharge(subtotal: number): number {
  // Free delivery for orders above ₹100
  if (subtotal >= 100) return 0
  // ₹40 delivery charge for orders below ₹100
  return 40
}

export function getEstimatedDelivery(): Date {
  const date = new Date()
  date.setDate(date.getDate() + 3) // 3 days delivery
  return date
}

export function getImageUrl(path: string): string {
  if (path.startsWith('http')) return path
  return `/images/${path}`
}

export function shareProduct(product: { name: string; slug: string }): void {
  const url = `${window.location.origin}/products/${product.slug}`
  const text = `Check out ${product.name} on Spice & Grain`
  
  if (navigator.share) {
    navigator.share({ title: product.name, text, url })
  } else {
    navigator.clipboard.writeText(url)
  }
}
