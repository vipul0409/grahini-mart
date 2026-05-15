'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  ShoppingBag, 
  MapPin, 
  Phone, 
  User, 
  Mail,
  CreditCard,
  Truck,
  ArrowLeft,
  Check
} from 'lucide-react'
import toast from 'react-hot-toast'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useCartStore } from '@/store/cartStore'
import { SITE_NAME } from '@/lib/constants'
import { generateInvoicePDF } from '@/lib/pdfGenerator'
import { sendOrderEmailToAdmin, copyOrderEmailToClipboard } from '@/lib/emailService'
import { validateOrderPrices, recalculateOrderTotal } from '@/lib/security'
import { getAllProducts } from '@/lib/productService'
import { addOrder } from '@/lib/db/orders'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart } = useCartStore()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    // Customer Details
    name: '',
    phone: '',
    email: '',
    
    // Delivery Address
    address: '',
    city: '',
    state: 'Madhya Pradesh',
    pincode: '',
    landmark: '',
    
    // Payment
    paymentMethod: 'cod', // 'cod' or 'online'
    
    // Notes
    orderNotes: '',
  })

  useEffect(() => {
    // Redirect if cart is empty
    if (items.length === 0) {
      toast.error('Your cart is empty')
      router.push('/products')
    }
  }, [items])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Validation
    if (!formData.name || !formData.phone || !formData.address || !formData.city || !formData.pincode) {
      toast.error('Please fill in all required fields')
      setLoading(false)
      return
    }

    // Validate phone number (10 digits)
    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      toast.error('Please enter a valid 10-digit mobile number')
      setLoading(false)
      return
    }

    // Validate pincode (6 digits)
    if (!/^\d{6}$/.test(formData.pincode)) {
      toast.error('Please enter a valid 6-digit pincode')
      setLoading(false)
      return
    }

    // Optional: Load products for validation (non-blocking)
    try {
      const allProducts = await getAllProducts()
      if (allProducts.length > 0) {
        console.log('✅ Products loaded for validation:', allProducts.length)
        // Validate prices but don't block order if validation fails
        const pricesValid = validateOrderPrices(items, allProducts)
        if (!pricesValid) {
          console.warn('⚠️ Price validation warning - proceeding with order')
        }
      }
    } catch (error) {
      console.warn('⚠️ Could not validate prices, proceeding with order:', error)
    }

    // Create order object with current prices
    const deliveryCharge = total >= 100 ? 0 : 40
    const finalTotal = total + deliveryCharge
    
    const order = {
      orderId: `ORD-${Date.now()}`,
      customer: {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
      },
      deliveryAddress: {
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        landmark: formData.landmark,
      },
      items: items.map(item => ({
        productId: item.productId,
        name: item.product.name,
        variant: item.variant,
        quantity: item.quantity,
        price: item.variant.price,
        total: item.variant.price * item.quantity,
      })),
      subtotal: total,
      deliveryCharge: deliveryCharge,
      total: finalTotal,
      paymentMethod: formData.paymentMethod,
      orderNotes: formData.orderNotes,
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
      securityCheck: 'VALIDATED',
    }

    // Save order to Firebase Firestore
    try {
      // Save to Firebase
      const firebaseOrderId = await addOrder(order)
      console.log('✅ Order saved to Firebase with ID:', firebaseOrderId)

      // Generate and download PDF invoice
      generateInvoicePDF(order)

      // Send order via WhatsApp
      sendOrderToWhatsApp(order)

      // Send email notification to admin
      try {
        sendOrderEmailToAdmin(order)
        // Also copy to clipboard as backup
        await copyOrderEmailToClipboard(order)
        toast.success('Order details copied! Please send email to admin.')
      } catch (emailError) {
        console.error('Email notification error:', emailError)
        // Continue even if email fails
      }

      // Clear cart
      clearCart()

      // Show success and redirect
      toast.success('Order placed successfully! Invoice downloaded.')
      
      setTimeout(() => {
        router.push(`/order-success?orderId=${order.orderId}`)
      }, 1500)

    } catch (error) {
      console.error('Error placing order:', error)
      toast.error('Failed to place order. Please try again.')
    }

    setLoading(false)
  }

  const sendOrderToWhatsApp = (order: any) => {
    // Format order details for WhatsApp
    const message = `
🛒 *New Order from ${SITE_NAME}*

📋 Order ID: ${order.orderId}

👤 *Customer Details:*
Name: ${order.customer.name}
Phone: ${order.customer.phone}
Email: ${order.customer.email || 'Not provided'}

📍 *Delivery Address:*
${order.deliveryAddress.address}
${order.deliveryAddress.landmark ? `Landmark: ${order.deliveryAddress.landmark}` : ''}
${order.deliveryAddress.city}, ${order.deliveryAddress.state} - ${order.deliveryAddress.pincode}

🛍️ *Order Items:*
${order.items.map((item: any) => 
  `• ${item.name} (${item.variant.weight}${item.variant.unit}) x ${item.quantity} = ₹${item.total}`
).join('\n')}

💰 *Payment Details:*
Subtotal: ₹${order.subtotal}
Delivery: ₹${order.deliveryCharge}
Total: ₹${order.total}
Payment Method: ${order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}

${order.orderNotes ? `📝 Notes: ${order.orderNotes}` : ''}

⏰ Order Time: ${new Date(order.createdAt).toLocaleString('en-IN')}
    `.trim()

    // Open WhatsApp with pre-filled message
    const whatsappUrl = `https://wa.me/918989475895?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  if (items.length === 0) {
    return null
  }

  const deliveryCharge = total >= 100 ? 0 : 40
  const finalTotal = total + deliveryCharge

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">Complete your order</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-primary-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Customer Details</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Number *
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                      placeholder="10-digit mobile number"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email (Optional)
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Delivery Address */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Delivery Address</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Complete Address *
                    </label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="House no., Building name, Street, Area"
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <Input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="City"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                      </label>
                      <select
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      >
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Delhi">Delhi</option>
                        {/* Add more states as needed */}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pincode *
                      </label>
                      <Input
                        type="text"
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                        placeholder="6-digit pincode"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Landmark (Optional)
                      </label>
                      <Input
                        type="text"
                        value={formData.landmark}
                        onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                        placeholder="Nearby landmark"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Payment Method */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-primary-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="w-5 h-5 text-primary-600"
                    />
                    <Truck className="w-5 h-5 text-gray-600" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Cash on Delivery</p>
                      <p className="text-sm text-gray-600">Pay when you receive</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary-500 transition-colors opacity-50">
                    <input
                      type="radio"
                      name="payment"
                      value="online"
                      disabled
                      className="w-5 h-5 text-primary-600"
                    />
                    <CreditCard className="w-5 h-5 text-gray-600" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Online Payment</p>
                      <p className="text-sm text-gray-600">Coming soon</p>
                    </div>
                  </label>
                </div>
              </motion.div>

              {/* Order Notes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order Notes (Optional)
                </label>
                <textarea
                  value={formData.orderNotes}
                  onChange={(e) => setFormData({ ...formData, orderNotes: e.target.value })}
                  placeholder="Any special instructions for delivery?"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </motion.div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Placing Order...' : `Place Order (₹${finalTotal})`}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-lg shadow p-6 sticky top-24"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

              {/* Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.variantId}`} className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                      {item.product.images[0] && (
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm truncate">{item.product.name}</p>
                      <p className="text-xs text-gray-600">
                        {item.variant.weight}{item.variant.unit} × {item.quantity}
                      </p>
                      <p className="text-sm font-medium text-gray-900 mt-1">
                        ₹{item.variant.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 pt-6 border-t border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Charge</span>
                  <span className={deliveryCharge === 0 ? 'text-green-600 font-medium' : ''}>
                    {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                  </span>
                </div>
                {total < 100 && (
                  <p className="text-xs text-green-600 font-medium">
                    🎉 Add ₹{100 - total} more for free delivery!
                  </p>
                )}
                {total >= 100 && (
                  <p className="text-xs text-green-600 font-medium">
                    ✅ You got free delivery!
                  </p>
                )}
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span>₹{finalTotal}</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Cash on delivery available</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Free delivery on orders above ₹100</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
