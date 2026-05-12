import HeroSlider from '@/components/home/HeroSlider'
import CategorySection from '@/components/home/CategorySection'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import Testimonials from '@/components/home/Testimonials'
import { sampleProducts, sampleBanners } from '@/lib/sampleData'

export default function HomePage() {
  const featuredProducts = sampleProducts.filter((p) => p.isFeatured)
  const bestSellers = sampleProducts.filter((p) => p.isBestSeller)
  const newArrivals = sampleProducts.filter((p) => p.isNew)

  return (
    <div>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-6">
        <HeroSlider banners={sampleBanners} />
      </section>

      {/* Categories */}
      <CategorySection />

      {/* Featured Products */}
      <FeaturedProducts
        products={featuredProducts}
        title="Featured Products"
        subtitle="Handpicked premium quality products"
      />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Best Sellers */}
      {bestSellers.length > 0 && (
        <FeaturedProducts
          products={bestSellers}
          title="Best Sellers"
          subtitle="Most loved by our customers"
        />
      )}

      {/* Testimonials */}
      <Testimonials />

      {/* New Arrivals */}
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
