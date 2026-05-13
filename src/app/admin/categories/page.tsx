'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Tag, 
  Plus, 
  Edit, 
  Trash2, 
  ArrowLeft,
  Search,
  Eye,
  EyeOff
} from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import CategoryForm from '@/components/admin/CategoryForm'
import { useAdminStore } from '@/store/adminStore'
import { Category } from '@/types/category'

export default function CategoriesPage() {
  const router = useRouter()
  const { categories, deleteCategory, updateCategory } = useAdminStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  useEffect(() => {
    // Check authentication
    const isAuth = localStorage.getItem('adminAuth')
    if (!isAuth) {
      router.push('/admin')
    }
  }, [])

  const handleDelete = (id: string) => {
    // Check if any products use this category
    const { products } = useAdminStore.getState()
    const categoryInUse = products.some(p => p.category === categories.find(c => c.id === id)?.slug)
    
    if (categoryInUse) {
      toast.error('Cannot delete category that has products. Please reassign products first.')
      return
    }

    if (confirm('Are you sure you want to delete this category?')) {
      deleteCategory(id)
      toast.success('Category deleted successfully')
    }
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setShowAddModal(true)
  }

  const toggleActive = (category: Category) => {
    updateCategory(category.id, { isActive: !category.isActive })
    toast.success(`Category ${category.isActive ? 'deactivated' : 'activated'}`)
  }

  const filteredCategories = categories
    .filter((category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.order - b.order)

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
              <Tag className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" />
              <div>
                <h1 className="text-base sm:text-xl font-bold text-gray-900">Categories</h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Manage product categories</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Categories</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{categories.length}</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <Tag className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Categories</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {categories.filter(c => c.isActive).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Inactive Categories</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {categories.filter(c => !c.isActive).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <EyeOff className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Actions Bar */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
            </div>

            <Button
              variant="primary"
              onClick={() => {
                setEditingCategory(null)
                setShowAddModal(true)
              }}
              className="flex items-center gap-2 w-full md:w-auto"
            >
              <Plus className="w-5 h-5" />
              Add Category
            </Button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredCategories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="p-4 sm:p-6">
                {/* Icon and Status */}
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-50 rounded-lg flex items-center justify-center text-2xl sm:text-3xl">
                    {category.icon}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleActive(category)}
                      className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
                        category.isActive
                          ? 'bg-green-100 text-green-600 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      title={category.isActive ? 'Active' : 'Inactive'}
                    >
                      {category.isActive ? (
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                      ) : (
                        <EyeOff className="w-3 h-3 sm:w-4 sm:h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Category Info */}
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2">
                  {category.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-3 sm:gap-4 text-xs text-gray-500 mb-3 sm:mb-4">
                  <span>Order: {category.order}</span>
                  <span className="truncate">Slug: {category.slug}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-3 sm:pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleEdit(category)}
                    className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm font-medium">Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm font-medium">Delete</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <Tag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No categories found</p>
          </div>
        )}
      </div>

      {/* Add/Edit Category Modal */}
      {showAddModal && (
        <CategoryForm
          category={editingCategory}
          onClose={() => {
            setShowAddModal(false)
            setEditingCategory(null)
          }}
        />
      )}
    </div>
  )
}
