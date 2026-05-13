// Firebase Firestore Database Service for Orders
import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  getDocs, 
  getDoc,
  query,
  orderBy,
  where,
  serverTimestamp
} from 'firebase/firestore'
import { db } from '@/lib/firebase'

const ORDERS_COLLECTION = 'orders'

export interface Order {
  id?: string
  orderId: string
  customer: {
    name: string
    phone: string
    email?: string
  }
  deliveryAddress: {
    address: string
    city: string
    state: string
    pincode: string
    landmark?: string
  }
  items: Array<{
    productId: string
    name: string
    variant: any
    quantity: number
    price: number
    total: number
  }>
  subtotal: number
  deliveryCharge: number
  total: number
  paymentMethod: string
  orderNotes?: string
  status: 'pending' | 'completed' | 'cancelled'
  securityCheck?: string
  createdAt: any
  updatedAt?: any
}

/**
 * Add a new order to Firestore
 */
export const addOrder = async (order: Omit<Order, 'id'>): Promise<string> => {
  try {
    const orderData = {
      ...order,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    const docRef = await addDoc(collection(db, ORDERS_COLLECTION), orderData)
    console.log('✅ Order added with ID:', docRef.id)
    return docRef.id
  } catch (error) {
    console.error('❌ Error adding order:', error)
    throw new Error('Failed to add order')
  }
}

/**
 * Update order status
 */
export const updateOrderStatus = async (id: string, status: 'pending' | 'completed' | 'cancelled'): Promise<void> => {
  try {
    const orderRef = doc(db, ORDERS_COLLECTION, id)
    await updateDoc(orderRef, {
      status,
      updatedAt: serverTimestamp(),
    })
    console.log('✅ Order status updated:', id, status)
  } catch (error) {
    console.error('❌ Error updating order status:', error)
    throw new Error('Failed to update order status')
  }
}

/**
 * Get all orders
 */
export const getAllOrders = async (): Promise<Order[]> => {
  try {
    const ordersRef = collection(db, ORDERS_COLLECTION)
    const q = query(ordersRef, orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)

    const orders: Order[] = []
    querySnapshot.forEach((doc) => {
      orders.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()?.toISOString() || new Date().toISOString(),
        updatedAt: doc.data().updatedAt?.toDate()?.toISOString(),
      } as Order)
    })

    console.log(`✅ Fetched ${orders.length} orders from Firestore`)
    return orders
  } catch (error) {
    console.error('❌ Error getting orders:', error)
    throw new Error('Failed to get orders')
  }
}

/**
 * Get orders by status
 */
export const getOrdersByStatus = async (status: 'pending' | 'completed' | 'cancelled'): Promise<Order[]> => {
  try {
    const ordersRef = collection(db, ORDERS_COLLECTION)
    const q = query(
      ordersRef,
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    )
    const querySnapshot = await getDocs(q)

    const orders: Order[]= []
    querySnapshot.forEach((doc) => {
      orders.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()?.toISOString() || new Date().toISOString(),
        updatedAt: doc.data().updatedAt?.toDate()?.toISOString(),
      } as Order)
    })

    return orders
  } catch (error) {
    console.error('❌ Error getting orders by status:', error)
    throw new Error('Failed to get orders by status')
  }
}

/**
 * Get single order by ID
 */
export const getOrder = async (id: string): Promise<Order | null> => {
  try {
    const orderRef = doc(db, ORDERS_COLLECTION, id)
    const orderSnap = await getDoc(orderRef)

    if (orderSnap.exists()) {
      return {
        id: orderSnap.id,
        ...orderSnap.data(),
        createdAt: orderSnap.data().createdAt?.toDate()?.toISOString() || new Date().toISOString(),
        updatedAt: orderSnap.data().updatedAt?.toDate()?.toISOString(),
      } as Order
    }

    return null
  } catch (error) {
    console.error('❌ Error getting order:', error)
    throw new Error('Failed to get order')
  }
}
