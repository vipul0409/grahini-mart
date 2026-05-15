'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  ArrowLeft,
  Check,
  Truck,
  Shield,
  Package
} from 'lucide-react'
import { Product, ProductVariant } from '@/types'
import { getAllProducts } from '@/lib/productService'
import { formatPrice, calculateDiscount } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'
import { useUserStore } from '@/store/userStore'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import toast from 'react-hot-toast'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [product, setProduct] = useState<Product | null>(null)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  const addItem = useCartStore((state) => state.addItem)
  const { isInWishlist, addToWishlist, removeFromWishlist } = useUserStore()

  useEffect(() => {
    loadProduct()
  }, [slug])

  const loadProduct = async () => {
    try {
      setLoading(true)
      console.log('🔍 Loading product with slug:', slug)
      
      const products = await getAllProducts()
      console.log('📦 Total products loaded:', products.length)
      
      if (products.length > 0) {
        console.log('📋 Available slugs:', products.map(p => p.slug))
        console.log('📋 Available product names:', products.map(p => p.name))
      }
      
      // Try to find by slug first
      let foundProduct = products.find(p => p.slug === slug)
      
      // If not found by slug, try by ID (in case slug in URL is actually ID)
      if (!foundProduct) {
        console.log('⚠️ Not found by slug, trying by ID...')
        foundProduct = products.find(p => p.id === slug)
      }
      
      // If still not found, try by name (case-insensitive)
      if (!foundProduct) {
        console.log('⚠️ Not found by ID, trying by name...')
        const decodedSlug = decodeURIComponent(slug).toLowerCase()
        foundProduct = products.find(p => 
          p.name.toLowerCase() === decodedSlug ||
          p.slug.toLowerCase() === decodedSlug
        )
      }
      
      if (foundProduct) {
        console.log('✅ Product found:', foundProduct.name)
        console.log('📝 Product slug:', foundProduct.slug)
        console.log('🆔 Product ID:', foundProduct.id)
        setProduct(foundProduct)
        // Set default variant
        const defaultVar = foundProduct.variants.find(v => v.isDefault) || foundProduct.variants[0]
        setSelectedVariant(defaultVar)
      } else {
        console.error('❌ Product not found with slug:', slug)
        console.log('Available products:', products.map(p => ({ 
          id: p.id,
          name: p.name, 
          slug: p.slug 
        })))
        toast.error('Product not found. Redirecting to products page...')
        setTimeout(() => {
          router.push('/products')
        }, 2000)
      }
    } catch (error) {
      console.error('❌ Error loading product:', error)
      toast.error('Failed to load product. Redirecting...')
      setTimeout(() => {
        router.push('/products')
      }, 2000)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return
    addItem(product, selectedVariant, quantity)
    toast.success(`Added ${quantity} item(s) to cart!`)
  }

  const handleWishlistToggle = () => {
    if (!product) return
    const inWishlist = isInWishlist(product.id)
    
    if (inWishlist) {
      removeFromWishlist(product.id)
      toast.success('Removed from wishlist')
    } else {
      addToWishlist(product.id)
      toast.success('Added to wishlist')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    )
  }

  if (!product || !selectedVariant) {
    return null
  }

  const discount = calculateDiscount(selectedVariant.mrp, selectedVariant.price)
  const inWishlist = isInWishlist(product.id)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Desktop Back Button */}
        <button
          onClick={() => router.back()}
          className="hidden lg:flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Products</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-3 sm:space-y-4"
          >
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md sm:shadow-lg sticky top-20 lg:top-24">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              
              {/* Badges */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex flex-col gap-1.5 sm:gap-2">
                {product.isNew && (
                  <Badge variant="success" size="sm">New</Badge>
                )}
                {product.isBestSeller && (
                  <Badge variant="warning" size="sm">Bestseller</Badge>
                )}
                {discount > 0 && (
                  <Badge variant="danger" size="sm">{discount}% OFF</Badge>
                )}
              </div>

              {/* Wishlist Button - Desktop */}
              <button
                onClick={handleWishlistToggle}
                className="hidden sm:block absolute top-4 right-4 p-2.5 bg-white rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110"
              >
                <Heart
                  className={`w-5 h-5 ${
                    inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'
                  }`}
                />
              </button>
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-primary-500 shadow-md scale-105'
                        : 'border-gray-200 hover:border-gray-300 hover:scale-105'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Category */}
            <p className="text-sm text-primary-600 font-medium uppercase tracking-wide">
              {product.category}
            </p>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-medium text-gray-700">
                {product.rating}
              </span>
              <span className="text-gray-500">
                ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Short Description */}
            {product.shortDescription && (
              <p className="text-lg text-gray-600">
                {product.shortDescription}
              </p>
            )}

            {/* Price */}
            <div className="bg-gray-50 rounded-xl p-6 space-y-3">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-gray-900">
                  {formatPrice(selectedVariant.price)}
                </span>
                {selectedVariant.mrp > selectedVariant.price && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      {formatPrice(selectedVariant.mrp)}
                    </span>
                    <span className="text-lg font-semibold text-green-600">
                      Save {discount}%
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-600">Inclusive of all taxes</p>
            </div>

            {/* Variant Selection */}
            {product.variants.length > 1 ? (
              <div className="space-y-3">
                <label className="block text-lg font-semibold text-gray-900">
                  Select Size/Weight
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {product.variants.map((variant) => {
                    const variantDiscount = calculateDiscount(variant.mrp, variant.price)
                    return (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        className={`relative p-4 rounded-xl border-2 transition-all ${
                          selectedVariant.id === variant.id
                            ? 'border-primary-500 bg-primary-50 shadow-lg scale-105'
                            : 'border-gray-200 hover:border-primary-300 bg-white hover:shadow-md'
                        }`}
                      >
                        <div className="text-center space-y-2">
                          {/* Weight */}
                          <p className="text-xl font-bold text-gray-900">
                            {variant.weight}{variant.unit}
                          </p>
                          
                          {/* Price */}
                          <div>
                            <p className="text-lg font-bold text-primary-600">
                              {formatPrice(variant.price)}
                            </p>
                            {variant.mrp > variant.price && (
                              <p className="text-xs text-gray-500 line-through">
                                {formatPrice(variant.mrp)}
                              </p>
                            )}
                          </div>

                          {/* Discount Badge */}
                          {variantDiscount > 0 && (
                            <span className="inline-block px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded">
                              {variantDiscount}% OFF
                            </span>
                          )}
                        </div>
                        
                        {/* Selected Checkmark */}
                        {selectedVariant.id === variant.id && (
                          <div className="absolute top-2 right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
                <p className="text-sm text-gray-500 italic">
                  💡 Select your preferred weight to see the price
                </p>
              </div>
            ) : (
              /* Single Variant - Show as info */
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Available Size</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {selectedVariant.weight}{selectedVariant.unit}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Price</p>
                    <p className="text-2xl font-bold text-primary-600">
                      {formatPrice(selectedVariant.price)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-900">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-200 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 font-semibold border-x-2 border-gray-200">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-50 transition-colors"
                  >
                    +
                  </button>
                </div>
                <p className="text-sm text-gray-600">
                  Total: {formatPrice(selectedVariant.price * quantity)}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={handleAddToCart}
                variant="primary"
                size="lg"
                className="flex-1"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                onClick={handleWishlistToggle}
                variant="outline"
                size="lg"
                className="px-6"
              >
                <Heart
                  className={`w-5 h-5 ${
                    inWishlist ? 'fill-red-500 text-red-500' : ''
                  }`}
                />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <Truck className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Free Delivery</p>
                  <p className="text-xs text-gray-600">On orders above ₹100</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Quality Assured</p>
                  <p className="text-xs text-gray-600">Premium products</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Package className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Fresh Stock</p>
                  <p className="text-xs text-gray-600">Direct from source</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Product Description
          </h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
