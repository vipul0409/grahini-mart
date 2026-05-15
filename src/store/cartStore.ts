import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Cart, CartItem, Product, ProductVariant } from '@/types'
import { getDeliveryCharge } from '@/lib/utils'

// SECURITY NOTE: Prices are validated on checkout submission
// Any manipulation of cart prices will be detected and rejected
// The checkout process recalculates all prices from the source product data

interface CartStore extends Cart {
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void
  removeItem: (productId: string, variantId: string) => void
  updateQuantity: (productId: string, variantId: string, quantity: number) => void
  clearCart: () => void
  applyCoupon: (code: string, discount: number) => void
  removeCoupon: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      subtotal: 0,
      discount: 0,
      deliveryCharge: 0,
      total: 0,
      couponCode: undefined,

      addItem: (product, variant, quantity = 1) => {
        const items = get().items
        const existingItem = items.find(
          (item) => item.productId === product.id && item.variantId === variant.id
        )

        let newItems: CartItem[]
        if (existingItem) {
          newItems = items.map((item) =>
            item.productId === product.id && item.variantId === variant.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        } else {
          newItems = [
            ...items,
            {
              productId: product.id,
              variantId: variant.id,
              quantity,
              product,
              variant,
            },
          ]
        }

        const subtotal = newItems.reduce(
          (sum, item) => sum + item.variant.price * item.quantity,
          0
        )
        // Don't add delivery charge to cart total - only show on checkout
        const total = subtotal - get().discount

        set({ items: newItems, subtotal, deliveryCharge: 0, total })
      },

      removeItem: (productId, variantId) => {
        const items = get().items.filter(
          (item) => !(item.productId === productId && item.variantId === variantId)
        )

        const subtotal = items.reduce(
          (sum, item) => sum + item.variant.price * item.quantity,
          0
        )
        // Don't add delivery charge to cart total - only show on checkout
        const total = subtotal - get().discount

        set({ items, subtotal, deliveryCharge: 0, total })
      },

      updateQuantity: (productId, variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantId)
          return
        }

        const items = get().items.map((item) =>
          item.productId === productId && item.variantId === variantId
            ? { ...item, quantity }
            : item
        )

        const subtotal = items.reduce(
          (sum, item) => sum + item.variant.price * item.quantity,
          0
        )
        // Don't add delivery charge to cart total - only show on checkout
        const total = subtotal - get().discount

        set({ items, subtotal, deliveryCharge: 0, total })
      },

      clearCart: () => {
        set({
          items: [],
          subtotal: 0,
          discount: 0,
          deliveryCharge: 0,
          total: 0,
          couponCode: undefined,
        })
      },

      applyCoupon: (code, discount) => {
        const subtotal = get().subtotal
        // Don't add delivery charge to cart total - only show on checkout
        const total = subtotal - discount

        set({ couponCode: code, discount, deliveryCharge: 0, total })
      },

      removeCoupon: () => {
        const subtotal = get().subtotal
        // Don't add delivery charge to cart total - only show on checkout
        const total = subtotal

        set({ couponCode: undefined, discount: 0, deliveryCharge: 0, total })
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)
