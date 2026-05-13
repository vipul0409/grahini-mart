// Unified product service that fetches from Firebase Firestore

import { Product } from '@/types'
import * as ProductDB from '@/lib/db/products'

/**
 * Get all products from Firebase
 */
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    return await ProductDB.getAllProducts()
  } catch (error) {
    console.error('Error loading products:', error)
    return []
  }
}

/**
 * Get a single product by ID
 */
export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    return await ProductDB.getProduct(id)
  } catch (error) {
    console.error('Error loading product:', error)
    return null
  }
}

/**
 * Get products by category
 */
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    return await ProductDB.getProductsByCategory(category)
  } catch (error) {
    console.error('Error loading products by category:', error)
    return []
  }
}

/**
 * Get featured products
 */
export const getFeaturedProducts = async (): Promise<Product[]> => {
  try {
    return await ProductDB.getFeaturedProducts()
  } catch (error) {
    console.error('Error loading featured products:', error)
    return []
  }
}

/**
 * Get best seller products
 */
export const getBestSellers = async (): Promise<Product[]> => {
  try {
    return await ProductDB.getBestSellers()
  } catch (error) {
    console.error('Error loading best sellers:', error)
    return []
  }
}

/**
 * Get new arrival products
 */
export const getNewArrivals = async (): Promise<Product[]> => {
  try {
    return await ProductDB.getNewArrivals()
  } catch (error) {
    console.error('Error loading new arrivals:', error)
    return []
  }
}

/**
 * Search products by name or description
 */
export const searchProducts = async (query: string): Promise<Product[]> => {
  try {
    const allProducts = await getAllProducts()
    const lowerQuery = query.toLowerCase()
    
    return allProducts.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    )
  } catch (error) {
    console.error('Error searching products:', error)
    return []
  }
}

