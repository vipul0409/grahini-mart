// Firebase Firestore Database Service for Products
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  getDoc,
  query,
  where,
  orderBy,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Product } from '@/types'

const PRODUCTS_COLLECTION = 'products'

/**
 * Add a new product to Firestore
 */
export const addProduct = async (product: Omit<Product, 'id'>): Promise<string> => {
  try {
    // Remove createdAt and updatedAt if they exist (we'll use serverTimestamp)
    const { createdAt, updatedAt, ...productData } = product as any
    
    const dataToSave = {
      ...productData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), dataToSave)
    console.log('✅ Product added with ID:', docRef.id)
    return docRef.id
  } catch (error: any) {
    console.error('❌ Error adding product:', error)
    console.error('Error code:', error?.code)
    console.error('Error message:', error?.message)
    
    if (error?.code === 'permission-denied') {
      throw new Error('Permission denied. Please update Firestore security rules.')
    } else {
      throw new Error(`Failed to add product: ${error?.message || 'Unknown error'}`)
    }
  }
}

/**
 * Update an existing product in Firestore
 */
export const updateProduct = async (id: string, updates: Partial<Product>): Promise<void> => {
  try {
    console.log('📝 Attempting to update product:', id)
    
    // First check if product exists
    const productRef = doc(db, PRODUCTS_COLLECTION, id)
    const productSnap = await getDoc(productRef)
    
    if (!productSnap.exists()) {
      console.error('❌ Product not found in Firestore:', id)
      throw new Error(`Product with ID "${id}" does not exist in database. Please refresh the page and try again.`)
    }
    
    // Remove fields that shouldn't be updated
    const { id: _, createdAt, updatedAt, ...updateFields } = updates as any
    
    const updateData = {
      ...updateFields,
      updatedAt: serverTimestamp(),
    }

    await updateDoc(productRef, updateData)
    console.log('✅ Product updated:', id)
  } catch (error: any) {
    console.error('❌ Error updating product:', error)
    console.error('Error code:', error?.code)
    console.error('Error message:', error?.message)
    
    if (error?.code === 'permission-denied') {
      throw new Error('Permission denied. Please update Firestore security rules.')
    } else if (error?.code === 'not-found') {
      throw new Error('Product not found in database. Please refresh the page.')
    } else {
      throw error
    }
  }
}

/**
 * Delete a product from Firestore
 */
export const deleteProduct = async (id: string): Promise<void> => {
  try {
    console.log('🗑️ Attempting to delete product:', id)
    const productRef = doc(db, PRODUCTS_COLLECTION, id)
    await deleteDoc(productRef)
    console.log('✅ Product deleted:', id)
  } catch (error: any) {
    console.error('❌ Error deleting product:', error)
    console.error('Error code:', error?.code)
    console.error('Error message:', error?.message)
    
    // Provide more specific error messages
    if (error?.code === 'permission-denied') {
      throw new Error('Permission denied. Please update Firestore security rules.')
    } else if (error?.code === 'not-found') {
      throw new Error('Product not found in database.')
    } else {
      throw new Error(`Failed to delete product: ${error?.message || 'Unknown error'}`)
    }
  }
}

/**
 * Get a single product by ID
 */
export const getProduct = async (id: string): Promise<Product | null> => {
  try {
    const productRef = doc(db, PRODUCTS_COLLECTION, id)
    const productSnap = await getDoc(productRef)

    if (productSnap.exists()) {
      return {
        id: productSnap.id,
        ...productSnap.data(),
        createdAt: productSnap.data().createdAt?.toDate() || new Date(),
        updatedAt: productSnap.data().updatedAt?.toDate() || new Date(),
      } as Product
    }

    return null
  } catch (error) {
    console.error('❌ Error getting product:', error)
    throw new Error('Failed to get product')
  }
}

/**
 * Get all products from Firestore
 */
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const productsRef = collection(db, PRODUCTS_COLLECTION)
    const q = query(productsRef, orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)

    const products: Product[] = []
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      } as Product)
    })

    console.log(`✅ Fetched ${products.length} products from Firestore`)
    return products
  } catch (error) {
    console.error('❌ Error getting products:', error)
    throw new Error('Failed to get products')
  }
}

/**
 * Get products by category
 */
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const productsRef = collection(db, PRODUCTS_COLLECTION)
    const q = query(
      productsRef, 
      where('category', '==', category),
      orderBy('createdAt', 'desc')
    )
    const querySnapshot = await getDocs(q)

    const products: Product[] = []
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      } as Product)
    })

    return products
  } catch (error) {
    console.error('❌ Error getting products by category:', error)
    throw new Error('Failed to get products by category')
  }
}

/**
 * Get featured products
 */
export const getFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const productsRef = collection(db, PRODUCTS_COLLECTION)
    const q = query(
      productsRef,
      where('isFeatured', '==', true),
      orderBy('createdAt', 'desc')
    )
    const querySnapshot = await getDocs(q)

    const products: Product[] = []
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      } as Product)
    })

    return products
  } catch (error) {
    console.error('❌ Error getting featured products:', error)
    return []
  }
}

/**
 * Get best seller products
 */
export const getBestSellers = async (): Promise<Product[]> => {
  try {
    const productsRef = collection(db, PRODUCTS_COLLECTION)
    const q = query(
      productsRef,
      where('isBestSeller', '==', true),
      orderBy('createdAt', 'desc')
    )
    const querySnapshot = await getDocs(q)

    const products: Product[] = []
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      } as Product)
    })

    return products
  } catch (error) {
    console.error('❌ Error getting best sellers:', error)
    return []
  }
}

/**
 * Get new arrival products
 */
export const getNewArrivals = async (): Promise<Product[]> => {
  try {
    const productsRef = collection(db, PRODUCTS_COLLECTION)
    const q = query(
      productsRef,
      where('isNew', '==', true),
      orderBy('createdAt', 'desc')
    )
    const querySnapshot = await getDocs(q)

    const products: Product[] = []
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      } as Product)
    })

    return products
  } catch (error) {
    console.error('❌ Error getting new arrivals:', error)
    return []
  }
}
