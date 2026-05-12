'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { MapPin, CreditCard, Package } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useUserStore } from '@/store/userStore'
import { formatPrice, generateOrderNumber } from '@/lib/utils'
import { PAYMENT_METHODS } from '@/lib/constants'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import toast from 'react-hot-toast'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, deliveryCharge, discount, total, clearCart } =
    useCartStore()
  const user = useUserStore((state) => state.user)

  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('razorpay')

  // Address form
  const [address, setAddress] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
  })

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Your cart is empty
        </h2>
        <Button onClick={() => router.push('/products')} variant="primary">
          Continue Shopping
        </Button>
      </div>
    )
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)

    try {
      // Simulate order placement
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const orderNumber = generateOrderNumber()

      // Clear cart
      clearCart()

      // Show success
      toast.success('Order placed successfully!')

      // Redirect to order confirmation
      router.push(`/orders/${orderNumber}`)
    } catch (error) {
      toast.error('Failed to place order. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold text-gray-900 mb-8"
      >
        Checkout
      </motion.h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Delivery Address */}
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 1
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                1
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Delivery Address
                </h2>
                <p className="text-sm text-gray-600">
                  Where should we deliver your order?
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={address.name}
                onChange={(e) => setAddress({ ...address, name: e.target.value })}
                required
              />
              <Input
                label="Phone Number"
                type="tel"
                value={address.phone}
                onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                required
              />
              <Input
                label="Address Line 1"
                value={address.addressLine1}
                onChange={(e) =>
                  setAddress({ ...address, addressLine1: e.target.value })
                }
                className="md:col-span-2"
                required
              />
              <Input
                label="Address Line 2 (Optional)"
                value={address.addressLine2}
                onChange={(e) =>
                  setAddress({ ...address, addressLine2: e.target.value })
                }
                className="md:col-span-2"
              />
              <Input
                label="City"
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                required
              />
              <Input
                label="State"
                value={address.state}
                onChange={(e) => setAddress({ ...address, state: e.target.value })}
                required
              />
              <Input
                label="Pincode"
                value={address.pincode}
                onChange={(e) =>
                  setAddress({ ...address, pincode: e.target.value })
                }
                required
              />
            </div>

            <Button
              onClick={() => setStep(2)}
              variant="primary"
              className="mt-6"
              disabled={
                !address.name ||
                !address.phone ||
                !address.addressLine1 ||
                !address.city ||
                !address.state ||
                !address.pincode
              }
            >
              Continue to Payment
            </Button>
          </Card>

          {/* Step 2: Payment Method */}
          {step >= 2 && (
            <Card>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= 2
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  2
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Payment Method
                  </h2>
                  <p className="text-sm text-gray-600">
                    Choose your preferred payment method
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {PAYMENT_METHODS.map((method) => (
                  <label
                    key={method.id}
                    className="flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer hover:border-primary-500 transition-colors"
                    style={{
                      borderColor:
                        paymentMethod === method.id ? '#FF9933' : '#e5e7eb',
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-5 h-5 text-primary-500"
                    />
                    <span className="text-2xl">{method.icon}</span>
                    <span className="font-medium text-gray-900">
                      {method.name}
                    </span>
                  </label>
                ))}
              </div>

              <Button
                onClick={handlePlaceOrder}
                variant="primary"
                size="lg"
                fullWidth
                className="mt-6"
                isLoading={isProcessing}
              >
                Place Order
              </Button>
            </Card>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Order Summary
            </h3>

            {/* Items */}
            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.variantId}`}
                  className="flex justify-between text-sm"
                >
                  <span className="text-gray-600">
                    {item.product.name} x {item.quantity}
                  </span>
                  <span className="font-medium">
                    {formatPrice(item.variant.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-2 pt-4 border-t border-gray-200">
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
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span>
                  {deliveryCharge === 0 ? 'FREE' : formatPrice(deliveryCharge)}
                </span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
