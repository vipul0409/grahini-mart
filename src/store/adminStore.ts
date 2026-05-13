import { create } from 'zustand'
import { Product } from '@/types'
import { Category } from '@/types/category'
import * as ProductDB from '@/lib/db/products'
import * as CategoryDB from '@/lib/db/categories'
import { initializeDefaultCategories } from '@/lib/initializeCategories'
import toast from 'react-hot-toast'

interface AdminStore {
  products: Product[]
  categories: Category[]
  isLoading: boolean
  isAuthenticated: boolean
  categoriesInitialized: boolean
  
  // Product actions
  loadProducts: () => Promise<void>
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>
  deleteProduct: (id: string) => Promise<void>
  
  // Category actions
  loadCategories: () => Promise<void>
  addCategory: (category: Omit<Category, 'id'>) => Promise<void>
  updateCategory: (id: string, category: Partial<Category>) => Promise<void>
  deleteCategory: (id: string) => Promise<void>
  
  // Auth
  setAuthenticated: (value: boolean) => void
}

export const useAdminStore = create<AdminStore>((set, get) => ({
  products: [],
  categories: [],
  isLoading: false,
  isAuthenticated: false,
  categoriesInitialized: false,

  // Load products from Firebase
  loadProducts: async () => {
    set({ isLoading: true })
    try {
      const products = await ProductDB.getAllProducts()
      set({ products, isLoading: false })
    } catch (error) {
      console.error('Error loading products:', error)
      toast.error('Failed to load products')
      set({ isLoading: false })
    }
  },

  // Add product to Firebase
  addProduct: async (product) => {
    set({ isLoading: true })
    try {
      const id = await ProductDB.addProduct(product)
      const newProduct = { ...product, id } as Product
      set((state) => ({
        products: [newProduct, ...state.products],
        isLoading: false,
      }))
      toast.success('Product added successfully!')
    } catch (error) {
      console.error('Error adding product:', error)
      toast.error('Failed to add product')
      set({ isLoading: false })
      throw error
    }
  },

  // Update product in Firebase
  updateProduct: async (id, updates) => {
    set({ isLoading: true })
    try {
      await ProductDB.updateProduct(id, updates)
      set((state) => ({
        products: state.products.map((p) =>
          p.id === id ? { ...p, ...updates } : p
        ),
        isLoading: false,
      }))
      toast.success('Product updated successfully!')
    } catch (error) {
      console.error('Error updating product:', error)
      toast.error('Failed to update product')
      set({ isLoading: false })
      throw error
    }
  },

  // Delete product from Firebase
  deleteProduct: async (id) => {
    set({ isLoading: true })
    try {
      await ProductDB.deleteProduct(id)
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
        isLoading: false,
      }))
      toast.success('Product deleted successfully!')
    } catch (error) {
      console.error('Error deleting product:', error)
      toast.error('Failed to delete product')
      set({ isLoading: false })
      throw error
    }
  },

  // Load categories from Firebase
  loadCategories: async () => {
    set({ isLoading: true })
    try {
      // Initialize default categories if needed
      if (!get().categoriesInitialized) {
        await initializeDefaultCategories()
        set({ categoriesInitialized: true })
      }

      const categories = await CategoryDB.getAllCategories()
      set({ categories, isLoading: false })
    } catch (error) {
      console.error('Error loading categories:', error)
      toast.error('Failed to load categories')
      set({ isLoading: false })
    }
  },

  // Add category to Firebase
  addCategory: async (category) => {
    set({ isLoading: true })
    try {
      const id = await CategoryDB.addCategory(category)
      const newCategory = { ...category, id } as Category
      set((state) => ({
        categories: [...state.categories, newCategory],
        isLoading: false,
      }))
      toast.success('Category added successfully!')
    } catch (error) {
      console.error('Error adding category:', error)
      toast.error('Failed to add category')
      set({ isLoading: false })
      throw error
    }
  },

  // Update category in Firebase
  updateCategory: async (id, updates) => {
    set({ isLoading: true })
    try {
      await CategoryDB.updateCategory(id, updates)
      set((state) => ({
        categories: state.categories.map((c) =>
          c.id === id ? { ...c, ...updates, updatedAt: new Date() } : c
        ),
        isLoading: false,
      }))
      toast.success('Category updated successfully!')
    } catch (error) {
      console.error('Error updating category:', error)
      toast.error('Failed to update category')
      set({ isLoading: false })
      throw error
    }
  },

  // Delete category from Firebase
  deleteCategory: async (id) => {
    set({ isLoading: true })
    try {
      await CategoryDB.deleteCategory(id)
      set((state) => ({
        categories: state.categories.filter((c) => c.id !== id),
        isLoading: false,
      }))
      toast.success('Category deleted successfully!')
    } catch (error) {
      console.error('Error deleting category:', error)
      toast.error('Failed to delete category')
      set({ isLoading: false })
      throw error
    }
  },

  setAuthenticated: (value) => set({ isAuthenticated: value }),
}))
