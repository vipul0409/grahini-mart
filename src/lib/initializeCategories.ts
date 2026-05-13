// Initialize default categories in Firebase (run once)
import { addCategory, getAllCategories } from '@/lib/db/categories'
import { Category } from '@/types/category'

const DEFAULT_CATEGORIES: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: 'Pulses',
    slug: 'pulses',
    description: 'Dal & Lentils',
    icon: '🫘',
    order: 1,
    isActive: true,
  },
  {
    name: 'Dry Fruits',
    slug: 'dry-fruits',
    description: 'Nuts & Dried Fruits',
    icon: '🌰',
    order: 2,
    isActive: true,
  },
  {
    name: 'Masala',
    slug: 'masala',
    description: 'Spices & Seasonings',
    icon: '🌶️',
    order: 3,
    isActive: true,
  },
  {
    name: 'Rice',
    slug: 'rice',
    description: 'Basmati & More',
    icon: '🍚',
    order: 4,
    isActive: true,
  },
  {
    name: 'Flour',
    slug: 'flour',
    description: 'Atta & Maida',
    icon: '🌾',
    order: 5,
    isActive: true,
  },
]

/**
 * Initialize default categories in Firebase if they don't exist
 */
export const initializeDefaultCategories = async (): Promise<void> => {
  try {
    // Check if categories already exist
    const existingCategories = await getAllCategories()
    
    if (existingCategories.length > 0) {
      console.log('✅ Categories already exist, skipping initialization')
      return
    }

    console.log('🔄 Initializing default categories...')

    // Add default categories
    for (const category of DEFAULT_CATEGORIES) {
      await addCategory(category)
    }

    console.log('✅ Default categories initialized successfully!')
  } catch (error) {
    console.error('❌ Error initializing categories:', error)
  }
}
