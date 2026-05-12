'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  Heart,
  Phone,
} from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useUserStore } from '@/store/userStore'
import { useUIStore } from '@/store/uiStore'
import { SITE_NAME, WHATSAPP_NUMBER } from '@/lib/constants'
import { getWhatsAppLink } from '@/lib/utils'
import Button from '@/components/ui/Button'

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const cartItems = useCartStore((state) => state.items)
  const user = useUserStore((state) => state.user)
  const { toggleCart, toggleMobileMenu, toggleAuthModal } = useUIStore()

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const handleWhatsAppClick = () => {
    const message = 'Hi! I want to place an order.'
    window.open(getWhatsAppLink(WHATSAPP_NUMBER, message), '_blank')
  }

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2 text-sm">
            <p className="hidden md:block">
              🎉 Free delivery on orders above ₹500
            </p>
            <p className="md:hidden">Free delivery above ₹500</p>
            <button
              onClick={handleWhatsAppClick}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">Order on WhatsApp</span>
              <span className="sm:hidden">WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-3xl">🛒</div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                {SITE_NAME}
              </h1>
              <p className="text-xs text-gray-600">थोक दाम में किराना</p>
            </div>
          </Link>

          {/* Search Bar (Desktop) */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for pulses, spices, dry fruits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search (Mobile) */}
            <button className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
              <Search className="w-6 h-6" />
            </button>

            {/* Wishlist */}
            {user && (
              <Link
                href="/wishlist"
                className="hidden md:flex p-2 hover:bg-gray-100 rounded-lg relative"
              >
                <Heart className="w-6 h-6" />
                {user.wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {user.wishlist.length}
                  </span>
                )}
              </Link>
            )}

            {/* Cart */}
            <button
              onClick={toggleCart}
              className="p-2 hover:bg-gray-100 rounded-lg relative"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold"
                >
                  {cartItemCount}
                </motion.span>
              )}
            </button>

            {/* User */}
            {user ? (
              <Link
                href="/account"
                className="hidden md:flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg"
              >
                <User className="w-6 h-6" />
                <span className="hidden lg:inline text-sm font-medium">
                  {user.name}
                </span>
              </Link>
            ) : (
              <Link href="/auth">
                <Button variant="primary" size="sm" className="hidden md:flex">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Search Bar (Mobile) */}
        <div className="lg:hidden pb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  )
}
