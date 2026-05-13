'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, Package, Phone, Home, Download } from 'lucide-react'
import Button from '@/components/ui/Button'
import { SITE_NAME } from '@/lib/constants'
import { generateInvoicePDF } from '@/lib/pdfGenerator'
import toast from 'react-hot-toast'
import { getAllOrders } from '@/lib/db/orders'
import type { Order } from '@/lib/db/orders'

function OrderSuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (orderId) {
      // Get order from Firebase
      loadOrder(orderId)
    }
  }, [orderId])

  const loadOrder = async (orderId: string) => {
    try {
      const orders = await getAllOrders()
      const foundOrder = orders.find((o) => o.orderId === orderId)
      setOrder(foundOrder || null)
    } catch (error) {
      console.error('Error loading order:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    )
  }

  const handleDownloadInvoice = () => {
    generateInvoicePDF(order)
    toast.success('Invoice downloaded successfully!')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600">
            Thank you for your order. We'll contact you shortly.
          </p>
        </motion.div>

        {/* Order Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow p-6 mb-6"
        >
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
            <Package className="w-6 h-6 text-primary-600" />
            <div>
              <p className="text-sm text-gray-600">Order ID</p>
              <p className="font-bold text-gray-900">{order.orderId}</p>
            </div>
          </div>

          {/* Customer Info */}
          <div className="space-y-4 mb-6">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Customer Details</p>
              <p className="text-gray-900">{order.customer.name}</p>
              <p className="text-gray-600">{order.customer.phone}</p>
              {order.customer.email && (
                <p className="text-gray-600">{order.customer.email}</p>
              )}
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Delivery Address</p>
              <p className="text-gray-900">{order.deliveryAddress.address}</p>
              {order.deliveryAddress.landmark && (
                <p className="text-gray-600">Landmark: {order.deliveryAddress.landmark}</p>
              )}
              <p className="text-gray-600">
                {order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.pincode}
              </p>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-3">Order Items</p>
            <div className="space-y-3">
              {order.items.map((item: any, index: number) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-900">
                    {item.name} ({item.variant.weight}{item.variant.unit}) × {item.quantity}
                  </span>
                  <span className="font-medium text-gray-900">₹{item.total}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="space-y-2 pt-4 border-t border-gray-200">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>₹{order.subtotal}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Delivery Charge</span>
              <span className={order.deliveryCharge === 0 ? 'text-green-600 font-medium' : ''}>
                {order.deliveryCharge === 0 ? 'FREE' : `₹${order.deliveryCharge}`}
              </span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
              <span>Total</span>
              <span>₹{order.total}</span>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm font-medium text-gray-700 mb-1">Payment Method</p>
            <p className="text-gray-900">
              {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
            </p>
          </div>
        </motion.div>

        {/* What's Next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6"
        >
          <h3 className="font-bold text-blue-900 mb-3">What happens next?</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">1.</span>
              <span>We'll call you to confirm your order</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">2.</span>
              <span>Your order will be prepared and packed</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">3.</span>
              <span>We'll deliver to your doorstep</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">4.</span>
              <span>Pay cash on delivery (if selected)</span>
            </li>
          </ul>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow p-6 mb-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Phone className="w-5 h-5 text-primary-600" />
            <h3 className="font-bold text-gray-900">Need Help?</h3>
          </div>
          <p className="text-gray-600 mb-4">
            For any queries about your order, contact us:
          </p>
          <div className="space-y-2 text-sm">
            <p className="text-gray-900">
              <span className="font-medium">WhatsApp:</span> +91 8989475895
            </p>
            <p className="text-gray-900">
              <span className="font-medium">Email:</span> grahinimart7@gmail.com
            </p>
          </div>
        </motion.div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={handleDownloadInvoice}
            className="flex-1 flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download Invoice
          </Button>
          <Button
            variant="primary"
            onClick={() => router.push('/')}
            className="flex-1 flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push('/products')}
            className="flex-1 flex items-center justify-center gap-2"
          >
            <Package className="w-5 h-5" />
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  )
}
