// Firebase Firestore Database Service for Categories
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query,
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
    const categoryData = {
      ...category,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    const docRef = await addDoc(collection(db, CATEGORIES_COLLECTION), categoryData)
    console.log('✅ Category added with ID:', docRef.id)
    return docRef.id
  } catch (error) {
    console.error('❌ Error adding category:', error)
    throw new Error('Failed to add category')
  }
}

/**
 * Update an existing category
 */
export const updateCategory = async (id: string, updates: Partial<Category>): Promise<void> => {
  try {
    const categoryRef = doc(db, CATEGORIES_COLLECTION, id)
    
    const updateData = {
      ...updates,
      updatedAt: serverTimestamp(),
    }

    await updateDoc(categoryRef, updateData)
    console.log('✅ Category updated:', id)
  } catch (error) {
    console.error('❌ Error updating category:', error)
    throw new Error('Failed to update category')
  }
}

/**
 * Delete a category
 */
export const deleteCategory = async (id: string): Promise<void> => {
  try {
    const categoryRef = doc(db, CATEGORIES_COLLECTION, id)
    await deleteDoc(categoryRef)
    console.log('✅ Category deleted:', id)
  } catch (error) {
    console.error('❌ Error deleting category:', error)
    throw new Error('Failed to delete category')
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
