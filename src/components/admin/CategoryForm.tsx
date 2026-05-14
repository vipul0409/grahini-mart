'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useAdminStore } from '@/store/adminStore'
import { Category } from '@/types/category'

interface CategoryFormProps {
  category: Category | null
  onClose: () => void
}

// Common emoji icons for categories
const ICON_OPTIONS = [
  '🌾', '🥜', '🌶️', '🍚', '🌰', '🫘', '🧄', '🧅', 
  '🥔', '🥕', '🌽', '🫑', '🥦', '🥬', '🍞', '🧈',
  '🍯', '🫙', '🧂', '☕', '🍵', '🥤', '🧃', '🥛'
]

export default function CategoryForm({ category, onClose }: CategoryFormProps) {
  const { addCategory, updateCategory, categories } = useAdminStore()

  const [formData, setFormData] = useState({
    name: category?.name || '',
    slug: category?.slug || '',
    description: category?.description || '',
    icon: category?.icon || '🌾',
    isActive: category?.isActive ?? true,
    order: category?.order || categories.length + 1,
  })

  const [showIconPicker, setShowIconPicker] = useState(false)

  // Auto-generate slug from name
  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.name || !formData.slug || !formData.description) {
      toast.error('Please fill in all required fields')
      return
    }

    // Check for duplicate name or slug
    const { checkCategoryExists } = await import('@/lib/db/categories')
    const { nameExists, slugExists } = await checkCategoryExists(
      formData.name,
      formData.slug,
      category?.id
    )

    if (nameExists) {
      toast.error('A category with this name already exists')
      return
    }

    if (slugExists) {
      toast.error('A category with this slug already exists')
      return
    }

    // Don't include 'id' in the data - Firestore will generate it
    const categoryData: Omit<Category, 'id'> = {
      name: formData.name,
      slug: formData.slug,
      description: formData.description,
      icon: formData.icon,
      isActive: formData.isActive,
      order: formData.order,
      createdAt: category?.createdAt || new Date(),
      updatedAt: new Date(),
    }

    try {
      if (category) {
        // Pass the old slug so products can be updated
        await updateCategory(category.id, categoryData, category.slug)
        toast.success('Category updated successfully! Products also updated.')
      } else {
        await addCategory(categoryData)
        toast.success('Category added successfully!')
      }
      onClose()
    } catch (error: any) {
      toast.error(error.message || 'Failed to save category')
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-xl sm:rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              {category ? 'Edit Category' : 'Add New Category'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Icon Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Icon *
              </label>
              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={() => setShowIconPicker(!showIconPicker)}
                  className="w-16 h-16 sm:w-20 sm:h-20 bg-primary-50 rounded-lg flex items-center justify-center text-3xl sm:text-4xl hover:bg-primary-100 transition-colors border-2 border-primary-200"
                >
                  {formData.icon}
                </button>
                <div className="flex-1">
                  <p className="text-xs sm:text-sm text-gray-600">
                    Click to select an icon for this category
                  </p>
                </div>
              </div>

              {/* Icon Picker */}
              {showIconPicker && (
                <div className="mt-4 p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-xs sm:text-sm font-medium text-gray-700 mb-3">Select Icon:</p>
                  <div className="grid grid-cols-6 sm:grid-cols-8 gap-1 sm:gap-2">
                    {ICON_OPTIONS.map((icon) => (
                      <button
                        key={icon}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, icon })
                          setShowIconPicker(false)
                        }}
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center text-xl sm:text-2xl hover:bg-white transition-colors ${
                          formData.icon === icon
                            ? 'bg-primary-100 border-2 border-primary-500'
                            : 'bg-white border border-gray-200'
                        }`}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Category Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Name *
              </label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g., Organic Products"
                required
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug * (URL-friendly name)
              </label>
              <Input
                type="text"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    slug: e.target.value.toLowerCase().replace(/\s+/g, '-'),
                  })
                }
                placeholder="e.g., organic-products"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Used in URLs: /products?category={formData.slug || 'slug'}
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of this category"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            {/* Order */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Display Order
              </label>
              <Input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                placeholder="1"
                min="1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Lower numbers appear first
              </p>
            </div>

            {/* Active Status */}
            <div>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <div>
                  <span className="text-sm font-medium text-gray-700">Active Category</span>
                  <p className="text-xs text-gray-500">
                    Inactive categories won't be shown to customers
                  </p>
                </div>
              </label>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="flex-1"
              >
                {category ? 'Update Category' : 'Add Category'}
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
