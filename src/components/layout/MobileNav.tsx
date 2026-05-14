'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, ShoppingBag, Phone, Package, MessageCircle, Instagram, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { PHONE_NUMBER, WHATSAPP_NUMBER, INSTAGRAM_URL } from '@/lib/constants'
import { getWhatsAppLink } from '@/lib/utils'

export default function MobileNav() {
  const pathname = usePathname()
  const [showContactMenu, setShowContactMenu] = useState(false)

  const handlePhoneCall = () => {
    window.location.href = `tel:+${PHONE_NUMBER}`
    setShowContactMenu(false)
  }

  const handleWhatsApp = () => {
    const message = 'Hi! I want to place an order.'
    window.open(getWhatsAppLink(WHATSAPP_NUMBER, message), '_blank')
    setShowContactMenu(false)
  }

  const handleInstagram = () => {
    window.open(INSTAGRAM_URL, '_blank')
    setShowContactMenu(false)
  }

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/products', icon: ShoppingBag, label: 'Shop' },
    { type: 'button', icon: Phone, label: 'Contact' },
    { href: '/products?category=pulses', icon: Package, label: 'Categories' },
  ]

  return (
    <>
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg">
        <div className="grid grid-cols-4">
          {navItems.map((item, index) => {
            const Icon = item.icon
            const isActive = item.href && pathname === item.href

            if (item.type === 'button') {
              return (
                <button
                  key={index}
                  onClick={() => setShowContactMenu(true)}
                  className="flex flex-col items-center justify-center py-3 text-gray-600 hover:text-primary-500 transition-colors"
                >
                  <Icon className="w-6 h-6 mb-1" />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              )
            }

            return (
              <Link
                key={item.href}
                href={item.href!}
                className={cn(
                  'flex flex-col items-center justify-center py-3 transition-colors',
                  isActive
                    ? 'text-primary-500'
                    : 'text-gray-600 hover:text-primary-500'
                )}
              >
                <Icon className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Contact Options Modal */}
      <AnimatePresence mode="wait">
        {showContactMenu && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setShowContactMenu(false)}
              className="fixed inset-0 bg-black/50 z-[100]"
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.2 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-[101] pb-safe"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">Contact Us</h3>
                <button
                  onClick={() => setShowContactMenu(false)}
                  className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Contact Options */}
              <div className="p-3 sm:p-4 space-y-2 sm:space-y-3 pb-20 sm:pb-24">
                {/* Phone Call */}
                <button
                  onClick={handlePhoneCall}
                  className="w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-blue-50 hover:bg-blue-100 active:bg-blue-100 rounded-lg sm:rounded-xl transition-colors active:scale-95"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">Phone Call</p>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">+91 {PHONE_NUMBER.slice(2)}</p>
                  </div>
                </button>

                {/* WhatsApp */}
                <button
                  onClick={handleWhatsApp}
                  className="w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-green-50 hover:bg-green-100 active:bg-green-100 rounded-lg sm:rounded-xl transition-colors active:scale-95"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">WhatsApp</p>
                    <p className="text-xs sm:text-sm text-gray-600">Chat with us</p>
                  </div>
                </button>

                {/* Instagram */}
                <button
                  onClick={handleInstagram}
                  className="w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-pink-50 hover:bg-pink-100 active:bg-pink-100 rounded-lg sm:rounded-xl transition-colors active:scale-95"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">Instagram</p>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">@Grahini_Mart7</p>
                  </div>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
