'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import { Category } from '@/types/category'
import { getActiveCategories } from '@/lib/db/categories'

export default function CategorySection() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load categories from Firebase
    const loadCategories = async () => {
      try {
        const cats = await getActiveCategories()
        setCategories(cats)
      } catch (error) {
        console.error('Error loading categories:', error)
      } finally {
        setLoading(false)
      }
    }

    loadCategories()
  }, [])

  if (loading) {
    return (
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Shop by Category
            </h2>
            <p className="text-gray-600 text-lg">
              Explore our wide range of premium products
            </p>
          </div>
          <div className="text-center text-gray-500">Loading categories...</div>
        </div>
      </section>
    )
  }

  if (categories.length === 0) {
    return null // Don't show section if no categories
  }

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Shop by Category
          </h2>
          <p className="text-gray-600 text-lg">
            Explore our wide range of premium products
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/products?category=${category.slug}`}>
                <Card
                  hover
                  className="text-center cursor-pointer group"
                  padding="lg"
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
