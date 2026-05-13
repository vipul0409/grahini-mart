'use client'

import { useEffect, useState } from 'react'
import HeroSlider from '@/components/home/HeroSlider'
import CategorySection from '@/components/home/CategorySection'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import { sampleBanners } from '@/lib/sampleData'
import { getFeaturedProducts, getBestSellers, getNewArrivals } from '@/lib/productService'
import { Product } from '@/types'

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [bestSellers, setBestSellers] = useState<Product[]>([])
  const [newArrivals, setNewArrivals] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load products from Firebase based on flags
    const loadProducts = async () => {
      try {
        const [featured, sellers, arrivals] = await Promise.all([
          getFeaturedProducts(),
          getBestSellers(),
          getNewArrivals(),
        ])
        
        setFeaturedProducts(featured)
        setBestSellers(sellers)
        setNewArrivals(arrivals)
      } catch (error) {
        console.error('Error loading products:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-6">
        <HeroSlider banners={sampleBanners} />
      </section>

      {/* Categories */}
      <CategorySection />

      {/* Featured Products - Only if "Featured Product" checkbox is checked */}
      {featuredProducts.length > 0 && (
        <FeaturedProducts
          products={featuredProducts}
          title="Featured Products"
          subtitle="Handpicked premium quality products"
        />
      )}

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Best Sellers - Only if "Best Seller" checkbox is checked */}
      {bestSellers.length > 0 && (
        <FeaturedProducts
          products={bestSellers}
          title="Best Sellers"
          subtitle="Most loved by our customers"
        />
      )}

      {/* New Arrivals - Only if "New Arrival" checkbox is checked */}
      {newArrivals.length > 0 && (
        <FeaturedProducts
          products={newArrivals}
          title="New Arrivals"
          subtitle="Fresh additions to our collection"
        />
      )}
    </div>
  )
}
