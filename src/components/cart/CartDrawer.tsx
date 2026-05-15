'use client'

import { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'
import { formatPrice } from '@/lib/utils'
import Button from '@/components/ui/Button'

export default function CartDrawer() {
  const { isCartOpen, toggleCart } = useUIStore()
  const { items, subtotal, deliveryCharge, discount, total, updateQuantity, removeItem } =
    useCartStore()

  return (
    <AnimatePresence>
      {isCartOpen && (
        <Fragment>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-primary-500" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Cart ({items.length})
                </h2>
              </div>
              <button
                onClick={toggleCart}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="text-6xl mb-4">🛒</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Add some products to get started
                  </p>
                  <Button onClick={toggleCart} variant="primary">
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={`${item.productId}-${item.variantId}`}
                      className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                    >
                      {/* Image */}
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1 truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {item.variant.weight}
                          {item.variant.unit}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-primary-600">
                            {formatPrice(item.variant.price)}
                          </span>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.variantId,
                                  item.quantity - 1
                                )
                              }
                              className="p-1 hover:bg-white rounded transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.variantId,
                                  item.quantity + 1
                                )
                              }
                              className="p-1 hover:bg-white rounded transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.productId, item.variantId)}
                        className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors self-start"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 p-6 space-y-4">
                {/* Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  {subtotal < 100 && (
                    <p className="text-xs text-gray-500 mt-2">
                      💡 Add ₹{100 - subtotal} more for free delivery!
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <Link href="/checkout" onClick={toggleCart}>
                    <Button variant="primary" size="lg" fullWidth>
                      Proceed to Checkout
                    </Button>
                  </Link>
                  <Button
                    onClick={toggleCart}
                    variant="outline"
                    size="lg"
                    fullWidth
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </Fragment>
      )}
    </AnimatePresence>
  )
}
