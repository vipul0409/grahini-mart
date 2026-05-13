'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, ShoppingBag, Phone, Package } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getWhatsAppLink } from '@/lib/utils'
import { WHATSAPP_NUMBER } from '@/lib/constants'

export default function MobileNav() {
  const pathname = usePathname()

  const handleWhatsAppClick = () => {
    const message = 'Hi! I want to place an order.'
    window.open(getWhatsAppLink(WHATSAPP_NUMBER, message), '_blank')
  }

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/products', icon: ShoppingBag, label: 'Shop' },
    { type: 'button', icon: Phone, label: 'WhatsApp', onClick: handleWhatsAppClick },
    { href: '/products?category=pulses', icon: Package, label: 'Categories' },
  ]

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg">
      <div className="grid grid-cols-4">
        {navItems.map((item, index) => {
          const Icon = item.icon
          const isActive = item.href && pathname === item.href

          if (item.type === 'button') {
            return (
              <button
                key={index}
                onClick={item.onClick}
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
  )
}
