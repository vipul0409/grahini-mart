'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Package, 
  ArrowLeft,
  Search,
  Phone,
  MapPin,
  Calendar,
  Eye,
  Download,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { generateInvoicePDF } from '@/lib/pdfGenerator'

export default function AdminOrdersPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'completed'>('all')

  useEffect(() => {
    // Check authentication
    const isAuth = localStorage.getItem('adminAuth')
    if (!isAuth) {
      router.push('/admin')
      return
    }

    // Load orders from localStorage
    loadOrders()
  }, [])

  const loadOrders = () => {
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]')
    // Sort by date (newest first)
    const sortedOrders = storedOrders.sort((a: any, b: any) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    setOrders(sortedOrders)
  }

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    const updatedOrders = orders.map(order => 
      order.orderId === orderId 
        ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
        : order
    )
    
    // Save to localStorage
    localStorage.setItem('orders', JSON.stringify(updatedOrders))
    
    // Update state
    setOrders(updatedOrders)
    
    // Show success message
    toast.success(`Order ${orderId} marked as ${newStatus}`)
    
    // Close modal if open
    if (selectedOrder?.orderId === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus })
    }
  }

  const filteredOrders = orders.filter((order) => {
    // Filter by search query
    const matchesSearch = order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.phone.includes(searchQuery)
    
    // Filter by status
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus
    
    return matchesSearch && matchesStatus
  })

  const downloadOrderDetails = (order: any) => {
    // Generate PDF invoice instead of text file
    generateInvoicePDF(order)
    toast.success('Invoice downloaded successfully!')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <Package className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" />
              <div>
                <h1 className="text-base sm:text-xl font-bold text-gray-900">Orders</h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Manage customer orders</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow p-4 sm:p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{orders.length}</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow p-4 sm:p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  ₹{orders.reduce((sum, order) => sum + order.total, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow p-4 sm:p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Orders</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {orders.filter(o => o.status === 'pending').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'all'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Orders ({orders.length})
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'pending'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Clock className="w-4 h-4 inline mr-1" />
              Pending ({orders.filter(o => o.status === 'pending').length})
            </button>
            <button
              onClick={() => setFilterStatus('completed')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'completed'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <CheckCircle className="w-4 h-4 inline mr-1" />
              Completed ({orders.filter(o => o.status === 'completed').length})
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by order ID, customer name, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No orders found</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <motion.div
                key={order.orderId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <div className="p-4 sm:p-6">
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <p className="font-bold text-gray-900 text-lg">{order.orderId}</p>
                      <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(order.createdAt).toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                        order.status === 'completed' 
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'cancelled'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status === 'completed' ? '✓ Completed' : order.status === 'cancelled' ? '✗ Cancelled' : '⏳ Pending'}
                      </span>
                      <span className="px-3 py-1 text-sm font-medium rounded-full bg-primary-100 text-primary-800">
                        {order.paymentMethod === 'cod' ? 'COD' : 'Online'}
                      </span>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">{order.customer.name}</p>
                        <p className="text-sm text-gray-600">{order.customer.phone}</p>
                        {order.customer.email && (
                          <p className="text-sm text-gray-600">{order.customer.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-900">{order.deliveryAddress.address}</p>
                        <p className="text-sm text-gray-600">
                          {order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.pincode}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Order Items Summary */}
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      {order.items.length} item(s)
                    </p>
                    <div className="space-y-1">
                      {order.items.slice(0, 2).map((item: any, index: number) => (
                        <p key={index} className="text-sm text-gray-600">
                          • {item.name} ({item.variant.weight}{item.variant.unit}) × {item.quantity}
                        </p>
                      ))}
                      {order.items.length > 2 && (
                        <p className="text-sm text-gray-500">
                          +{order.items.length - 2} more item(s)
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Total and Actions */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Total Amount</p>
                      <p className="text-2xl font-bold text-gray-900">₹{order.total}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedOrder(order)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadOrderDetails(order)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Invoice
                      </Button>
                      {order.status === 'pending' && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => updateOrderStatus(order.orderId, 'completed')}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Complete
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedOrder(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
                <span className={`px-4 py-2 text-sm font-medium rounded-full ${
                  selectedOrder.status === 'completed' 
                    ? 'bg-green-100 text-green-800'
                    : selectedOrder.status === 'cancelled'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {selectedOrder.status === 'completed' ? '✓ Completed' : selectedOrder.status === 'cancelled' ? '✗ Cancelled' : '⏳ Pending'}
                </span>
              </div>
              
              {/* Full order details here - similar to order success page */}
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Order ID</p>
                  <p className="text-gray-900">{selectedOrder.orderId}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Customer</p>
                  <p className="text-gray-900">{selectedOrder.customer.name}</p>
                  <p className="text-gray-600">{selectedOrder.customer.phone}</p>
                  {selectedOrder.customer.email && (
                    <p className="text-gray-600">{selectedOrder.customer.email}</p>
                  )}
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Delivery Address</p>
                  <p className="text-gray-900">{selectedOrder.deliveryAddress.address}</p>
                  {selectedOrder.deliveryAddress.landmark && (
                    <p className="text-gray-600">Landmark: {selectedOrder.deliveryAddress.landmark}</p>
                  )}
                  <p className="text-gray-600">
                    {selectedOrder.deliveryAddress.city}, {selectedOrder.deliveryAddress.state} - {selectedOrder.deliveryAddress.pincode}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">Order Items</p>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-900">
                          {item.name} ({item.variant.weight}{item.variant.unit}) × {item.quantity}
                        </span>
                        <span className="font-medium text-gray-900">₹{item.total}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Subtotal</span>
                      <span>₹{selectedOrder.subtotal}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Delivery</span>
                      <span>{selectedOrder.deliveryCharge === 0 ? 'FREE' : `₹${selectedOrder.deliveryCharge}`}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                      <span>Total</span>
                      <span>₹{selectedOrder.total}</span>
                    </div>
                  </div>
                </div>

                {selectedOrder.orderNotes && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Order Notes</p>
                    <p className="text-gray-900">{selectedOrder.orderNotes}</p>
                  </div>
                )}
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  onClick={() => setSelectedOrder(null)}
                  className="flex-1"
                >
                  Close
                </Button>
                <Button
                  variant="outline"
                  onClick={() => downloadOrderDetails(selectedOrder)}
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Invoice
                </Button>
                {selectedOrder.status === 'pending' && (
                  <>
                    <Button
                      variant="primary"
                      onClick={() => {
                        updateOrderStatus(selectedOrder.orderId, 'completed')
                      }}
                      className="flex-1 flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark Complete
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        if (confirm('Are you sure you want to cancel this order?')) {
                          updateOrderStatus(selectedOrder.orderId, 'cancelled')
                        }
                      }}
                      className="flex-1 flex items-center justify-center gap-2 text-red-600 hover:bg-red-50"
                    >
                      <XCircle className="w-4 h-4" />
                      Cancel Order
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
