'use client'

import { useState, useEffect } from 'react'
import { Phone, MessageCircle, Instagram, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { PHONE_NUMBER, WHATSAPP_NUMBER, INSTAGRAM_URL } from '@/lib/constants'
import { getWhatsAppLink } from '@/lib/utils'

export default function ContactMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Prevent hydration issues
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handlePhoneCall = () => {
    window.location.href = `tel:+${PHONE_NUMBER}`
    setIsOpen(false)
  }

  const handleWhatsApp = () => {
    const message = 'Hi! I want to place an order.'
    window.open(getWhatsAppLink(WHATSAPP_NUMBER, message), '_blank')
    setIsOpen(false)
  }

  const handleInstagram = () => {
    window.open(INSTAGRAM_URL, '_blank')
    setIsOpen(false)
  }

  // Don't render modal until mounted (prevents hydration issues)
  if (!isMounted) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        <Phone className="w-4 h-4" />
        <span className="hidden sm:inline">Contact Us</span>
        <span className="sm:hidden">Contact</span>
      </button>
    )
  }

  return (
    <>
      {/* Main Contact Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        <Phone className="w-4 h-4" />
        <span className="hidden sm:inline">Contact Us</span>
        <span className="sm:hidden">Contact</span>
      </button>

      {/* Contact Options Menu */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-[100]"
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed top-4 left-1/2 -translate-x-1/2 bg-white rounded-xl sm:rounded-2xl shadow-2xl z-[101] w-[95%] sm:w-[90%] max-w-sm"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">Contact Us</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Contact Options */}
              <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                {/* Phone Call */}
                <button
                  onClick={handlePhoneCall}
                  className="w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-blue-50 hover:bg-blue-100 active:bg-blue-100 rounded-lg sm:rounded-xl transition-colors group"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
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
                  className="w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-green-50 hover:bg-green-100 active:bg-green-100 rounded-lg sm:rounded-xl transition-colors group"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
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
                  className="w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-pink-50 hover:bg-pink-100 active:bg-pink-100 rounded-lg sm:rounded-xl transition-colors group"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
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
