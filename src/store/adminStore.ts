import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '@/types'
import { Category } from '@/types/category'

interface AdminStore {
  products: Product[]
  categories: Category[]
  isAuthenticated: boolean
  setProducts: (products: Product[]) => void
  addProduct: (product: Product) => void
  updateProduct: (id: string, product: Partial<Product>) => void
  deleteProduct: (id: string) => void
  setCategories: (categories: Category[]) => void
  addCategory: (category: Category) => void
  updateCategory: (id: string, category: Partial<Category>) => void
  deleteCategory: (id: string) => void
  setAuthenticated: (value: boolean) => void
}

// Default categories
const defaultCategories: Category[] = [
  {
    id: 'cat-1',
    name: 'Pulses',
    slug: 'pulses',
    description: 'Fresh and nutritious pulses and lentils',
    icon: '🌾',
    isActive: true,
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'cat-2',
    name: 'Dry Fruits',
    slug: 'dry-fruits',
    description: 'Premium quality dry fruits and nuts',
    icon: '🥜',
    isActive: true,
    order: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'cat-3',
    name: 'Masala',
    slug: 'masala',
    description: 'Aromatic spices and masala powders',
    icon: '🌶️',
    isActive: true,
    order: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'cat-4',
    name: 'Rice',
    slug: 'rice',
    description: 'Premium basmati and regular rice',
    icon: '🍚',
    isActive: true,
    order: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'cat-5',
    name: 'Flour',
    slug: 'flour',
    description: 'Fresh wheat flour and other flours',
    icon: '🌾',
    isActive: true,
    order: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      products: [],
      categories: defaultCategories,
      isAuthenticated: false,
      
      setProducts: (products) => set({ products }),
      
      addProduct: (product) =>
        set((state) => ({
          products: [...state.products, product],
        })),
      
      updateProduct: (id, updatedProduct) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updatedProduct } : p
          ),
        })),
      
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
      
      setCategories: (categories) => set({ categories }),
      
      addCategory: (category) =>
        set((state) => ({
          categories: [...state.categories, category],
        })),
      
      updateCategory: (id, updatedCategory) =>
        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === id ? { ...c, ...updatedCategory, updatedAt: new Date() } : c
          ),
        })),
      
      deleteCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id),
        })),
      
      setAuthenticated: (value) => set({ isAuthenticated: value }),
    }),
    {
      name: 'admin-storage',
    }
  )
)
