'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, X } from 'lucide-react'
import { WEIGHT_OPTIONS, SORT_OPTIONS } from '@/lib/constants'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { Category } from '@/types/category'
import { getActiveCategories } from '@/lib/db/categories'

interface ProductFiltersProps {
  onFilterChange: (filters: any) => void
  isMobile?: boolean
  onClose?: () => void
}

export default function ProductFilters({
  onFilterChange,
  isMobile = false,
  onClose,
}: ProductFiltersProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedWeights, setSelectedWeights] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000])
  const [sortBy, setSortBy] = useState('popular')
  const [expandedSections, setExpandedSections] = useState<string[]>([
    'category',
    'price',
    'weight',
  ])

  // Load categories from Firebase
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await getActiveCategories()
        setCategories(cats)
      } catch (error) {
        console.error('Error loading categories:', error)
      }
    }

    loadCategories()
  }, [])

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    )
  }

  const handleCategoryToggle = (categorySlug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categorySlug)
        ? prev.filter((slug) => slug !== categorySlug)
        : [...prev, categorySlug]
    )
  }

  const handleWeightToggle = (weight: string) => {
    setSelectedWeights((prev) =>
      prev.includes(weight)
        ? prev.filter((w) => w !== weight)
        : [...prev, weight]
    )
  }

  const handleApplyFilters = () => {
    onFilterChange({
      categories: selectedCategories,
      weights: selectedWeights,
      priceRange,
      sortBy,
    })
    onClose?.()
  }

  const handleClearFilters = () => {
    setSelectedCategories([])
    setSelectedWeights([])
    setPriceRange([0, 2000])
    setSortBy('popular')
    onFilterChange({
      categories: [],
      weights: [],
      priceRange: [0, 2000],
      sortBy: 'popular',
    })
  }

  const FilterSection = ({
    title,
    id,
    children,
  }: {
    title: string
    id: string
    children: React.ReactNode
  }) => {
    const isExpanded = expandedSections.includes(id)

    return (
      <div className="border-b border-gray-200 pb-4">
        <button
          onClick={() => toggleSection(id)}
          className="flex items-center justify-between w-full py-3 text-left"
        >
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <ChevronDown
            className={cn(
              'w-5 h-5 text-gray-500 transition-transform',
              isExpanded && 'rotate-180'
            )}
          />
        </button>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div className={cn('bg-white', isMobile && 'h-full overflow-y-auto')}>
      {/* Header (Mobile) */}
      {isMobile && (
        <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-gray-900">Filters</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      <div className="p-4 space-y-4">
        {/* Sort By */}
        <FilterSection title="Sort By" id="sort">
          <div className="space-y-2">
            {SORT_OPTIONS.map((option) => (
              <label key={option.value} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="sort"
                  value={option.value}
                  checked={sortBy === option.value}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-4 h-4 text-primary-500 focus:ring-primary-500"
                />
                <span className="ml-3 text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Categories */}
        <FilterSection title="Categories" id="category">
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category.id} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.slug)}
                  onChange={() => handleCategoryToggle(category.slug)}
                  className="w-4 h-4 text-primary-500 rounded focus:ring-primary-500"
                />
                <span className="ml-3 text-sm text-gray-700">
                  {category.icon} {category.name}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Price Range */}
        <FilterSection title="Price Range" id="price">
          <div className="space-y-4">
            <input
              type="range"
              min="0"
              max="2000"
              step="50"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>₹{priceRange[0]}</span>
              <span>₹{priceRange[1]}</span>
            </div>
          </div>
        </FilterSection>

        {/* Weight */}
        <FilterSection title="Weight" id="weight">
          <div className="space-y-2">
            {WEIGHT_OPTIONS.map((option) => (
              <label key={option.value} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedWeights.includes(option.value)}
                  onChange={() => handleWeightToggle(option.value)}
                  className="w-4 h-4 text-primary-500 rounded focus:ring-primary-500"
                />
                <span className="ml-3 text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-gray-200 space-y-2 sticky bottom-0 bg-white">
        <Button onClick={handleApplyFilters} variant="primary" fullWidth>
          Apply Filters
        </Button>
        <Button onClick={handleClearFilters} variant="outline" fullWidth>
          Clear All
        </Button>
      </div>
    </div>
  )
}
