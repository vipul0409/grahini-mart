'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { Product } from '@/types'
import { formatPrice, calculateDiscount } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'
import { useUserStore } from '@/store/userStore'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import toast from 'react-hot-toast'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const addItem = useCartStore((state) => state.addItem)
  const { isInWishlist, addToWishlist, removeFromWishlist } = useUserStore()
  const inWishlist = isInWishlist(product.id)

  const defaultVariant = product.variants.find((v) => v.isDefault) || product.variants[0]
  const discount = calculateDiscount(defaultVariant.mrp, defaultVariant.price)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product, defaultVariant)
    toast.success('Added to cart!')
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    if (inWishlist) {
      removeFromWishlist(product.id)
      toast.success('Removed from wishlist')
    } else {
      addToWishlist(product.id)
      toast.success('Added to wishlist')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/products/${product.slug}`}>
        <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-gray-100">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className={`object-cover transition-all duration-500 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.isNew && (
                <Badge variant="success" size="sm">
                  New
                </Badge>
              )}
              {product.isBestSeller && (
                <Badge variant="warning" size="sm">
                  Bestseller
                </Badge>
              )}
              {discount > 0 && (
                <Badge variant="danger" size="sm">
                  {discount}% OFF
                </Badge>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={handleWishlistToggle}
              className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-50"
            >
              <Heart
                className={`w-5 h-5 ${
                  inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'
                }`}
              />
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Category */}
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              {product.category}
            </p>

            {/* Title */}
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-gray-700">
                {product.rating}
              </span>
              <span className="text-xs text-gray-500">
                ({product.reviewCount})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-xl font-bold text-gray-900">
                {formatPrice(defaultVariant.price)}
              </span>
              {defaultVariant.mrp > defaultVariant.price && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(defaultVariant.mrp)}
                </span>
              )}
            </div>

            {/* Weight */}
            <p className="text-sm text-gray-600 mb-3">
              {defaultVariant.weight}
              {defaultVariant.unit}
            </p>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              variant="primary"
              size="sm"
              fullWidth
              className="group-hover:shadow-glow"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
