// Firebase Firestore Database Service for Categories
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query,
  where,
  orderBy,
  serverTimestamp
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Category } from '@/types/category'

const CATEGORIES_COLLECTION = 'categories'

/**
 * Add a new category to Firestore
 */
export const addCategory = async (category: Omit<Category, 'id'>): Promise<string> => {
  try {
    // Remove createdAt and updatedAt if they exist (we'll use serverTimestamp)
    const { createdAt, updatedAt, ...categoryData } = category as any
    
    const dataToSave = {
      ...categoryData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    const docRef = await addDoc(collection(db, CATEGORIES_COLLECTION), dataToSave)
    console.log('✅ Category added with ID:', docRef.id)
    return docRef.id
  } catch (error: any) {
    console.error('❌ Error adding category:', error)
    console.error('Error code:', error?.code)
    console.error('Error message:', error?.message)
    
    if (error?.code === 'permission-denied') {
      throw new Error('Permission denied. Please update Firestore security rules.')
    } else {
      throw new Error(`Failed to add category: ${error?.message || 'Unknown error'}`)
    }
  }
}

/**
 * Update an existing category
 * Also updates all products that belong to this category if the slug changes
 */
export const updateCategory = async (id: string, updates: Partial<Category>, oldSlug?: string): Promise<void> => {
  try {
    console.log('📝 Attempting to update category:', id)
    const categoryRef = doc(db, CATEGORIES_COLLECTION, id)
    
    // Remove fields that shouldn't be updated
    const { id: _, createdAt, updatedAt, ...updateFields } = updates as any
    
    const updateData = {
      ...updateFields,
      updatedAt: serverTimestamp(),
    }

    await updateDoc(categoryRef, updateData)
    console.log('✅ Category updated:', id)

    // If slug changed, update all products with the old slug
    if (oldSlug && updates.slug && oldSlug !== updates.slug) {
      console.log(`🔄 Updating products from category "${oldSlug}" to "${updates.slug}"`)
      await updateProductsCategory(oldSlug, updates.slug)
    }
  } catch (error: any) {
    console.error('❌ Error updating category:', error)
    console.error('Error code:', error?.code)
    console.error('Error message:', error?.message)
    
    if (error?.code === 'permission-denied') {
      throw new Error('Permission denied. Please update Firestore security rules.')
    } else if (error?.code === 'not-found') {
      throw new Error('Category not found in database.')
    } else {
      throw new Error(`Failed to update category: ${error?.message || 'Unknown error'}`)
    }
  }
}

/**
 * Update all products that belong to a category when category slug changes
 */
const updateProductsCategory = async (oldSlug: string, newSlug: string): Promise<void> => {
  try {
    const productsRef = collection(db, 'products')
    const q = query(productsRef, where('category', '==', oldSlug))
    const querySnapshot = await getDocs(q)

    const updatePromises: Promise<void>[] = []
    
    querySnapshot.forEach((docSnapshot) => {
      const productRef = doc(db, 'products', docSnapshot.id)
      updatePromises.push(
        updateDoc(productRef, {
          category: newSlug,
          updatedAt: serverTimestamp(),
        })
      )
    })

    await Promise.all(updatePromises)
    console.log(`✅ Updated ${updatePromises.length} products to new category: ${newSlug}`)
  } catch (error) {
    console.error('❌ Error updating products category:', error)
    throw new Error('Failed to update products category')
  }
}

/**
 * Check if a category name or slug already exists
 */
export const checkCategoryExists = async (name: string, slug: string, excludeId?: string): Promise<{ nameExists: boolean; slugExists: boolean }> => {
  try {
    const categoriesRef = collection(db, CATEGORIES_COLLECTION)
    const querySnapshot = await getDocs(categoriesRef)

    let nameExists = false
    let slugExists = false

    querySnapshot.forEach((doc) => {
      // Skip the current category if we're editing
      if (excludeId && doc.id === excludeId) return

      const data = doc.data()
      if (data.name.toLowerCase() === name.toLowerCase()) {
        nameExists = true
      }
      if (data.slug.toLowerCase() === slug.toLowerCase()) {
        slugExists = true
      }
    })

    return { nameExists, slugExists }
  } catch (error) {
    console.error('❌ Error checking category existence:', error)
    return { nameExists: false, slugExists: false }
  }
}

/**
 * Delete a category
 */
export const deleteCategory = async (id: string): Promise<void> => {
  try {
    console.log('🗑️ Attempting to delete category:', id)
    const categoryRef = doc(db, CATEGORIES_COLLECTION, id)
    await deleteDoc(categoryRef)
    console.log('✅ Category deleted:', id)
  } catch (error: any) {
    console.error('❌ Error deleting category:', error)
    console.error('Error code:', error?.code)
    console.error('Error message:', error?.message)
    
    // Provide more specific error messages
    if (error?.code === 'permission-denied') {
      throw new Error('Permission denied. Please update Firestore security rules.')
    } else if (error?.code === 'not-found') {
      throw new Error('Category not found in database.')
    } else {
      throw new Error(`Failed to delete category: ${error?.message || 'Unknown error'}`)
    }
  }
}

/**
 * Get all categories
 */
export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const categoriesRef = collection(db, CATEGORIES_COLLECTION)
    const q = query(categoriesRef, orderBy('order', 'asc'))
    const querySnapshot = await getDocs(q)

    const categories: Category[] = []
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      // Remove the 'id' field from data to avoid conflict with doc.id
      const { id: _, ...categoryData } = data
      
      categories.push({
        id: doc.id, // Use Firestore document ID
        ...categoryData,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Category)
    })

    console.log(`✅ Fetched ${categories.length} categories from Firestore`)
    return categories
  } catch (error) {
    console.error('❌ Error getting categories:', error)
    throw new Error('Failed to get categories')
  }
}

/**
 * Get active categories only
 */
export const getActiveCategories = async (): Promise<Category[]> => {
  try {
    const categories = await getAllCategories()
    return categories.filter(cat => cat.isActive)
  } catch (error) {
    console.error('❌ Error getting active categories:', error)
    return []
  }
}
