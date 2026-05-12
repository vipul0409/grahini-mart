'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Filter, Grid, List } from 'lucide-react'
import ProductGrid from '@/components/products/ProductGrid'
import ProductFilters from '@/components/products/ProductFilters'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import { sampleProducts } from '@/lib/sampleData'
import { Product } from '@/types'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(sampleProducts)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isLoading, setIsLoading] = useState(false)

  const handleFilterChange = (filters: any) => {
    setIsLoading(true)
    
    // Simulate filtering
    setTimeout(() => {
      let filtered = [...sampleProducts]

      // Filter by categories
      if (filters.categories?.length > 0) {
        filtered = filtered.filter((p) =>
          filters.categories.includes(p.category)
        )
      }

      // Filter by price range
      if (filters.priceRange) {
        filtered = filtered.filter((p) => {
          const price = p.variants[0].price
          return price >= filters.priceRange[0] && price <= filters.priceRange[1]
        })
      }

      // Sort
      if (filters.sortBy) {
        switch (filters.sortBy) {
          case 'price-low':
            filtered.sort((a, b) => a.variants[0].price - b.variants[0].price)
            break
          case 'price-high':
            filtered.sort((a, b) => b.variants[0].price - a.variants[0].price)
            break
          case 'rating':
            filtered.sort((a, b) => b.rating - a.rating)
            break
          case 'newest':
            filtered.sort(
              (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
            )
            break
        }
      }

      setProducts(filtered)
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-2"
        >
          All Products
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600"
        >
          Showing {products.length} products
        </motion.p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6">
        <Button
          onClick={() => setIsFilterOpen(true)}
          variant="outline"
          className="lg:hidden"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>

        <div className="hidden lg:block text-sm text-gray-600">
          {products.length} products found
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${
              viewMode === 'grid'
                ? 'bg-primary-100 text-primary-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${
              viewMode === 'list'
                ? 'bg-primary-100 text-primary-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex gap-8">
        {/* Filters Sidebar (Desktop) */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <ProductFilters onFilterChange={handleFilterChange} />
          </div>
        </aside>

        {/* Products */}
        <div className="flex-1">
          <ProductGrid products={products} isLoading={isLoading} />
        </div>
      </div>

      {/* Mobile Filter Modal */}
      <Modal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        size="full"
        showCloseButton={false}
      >
        <ProductFilters
          onFilterChange={handleFilterChange}
          isMobile
          onClose={() => setIsFilterOpen(false)}
        />
      </Modal>
    </div>
  )
}
