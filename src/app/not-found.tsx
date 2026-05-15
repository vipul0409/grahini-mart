import Link from 'next/link'
import { Home, ShoppingBag } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div>
          {/* Animated Icon */}
          <div className="mb-8">
            <div className="inline-block text-8xl mb-4">
              🚧
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Work in Progress
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 mb-2">
            हम इस पेज पर काम कर रहे हैं
          </p>

          <p className="text-lg text-gray-500 mb-8">
            This page is under construction. Please check back soon!
          </p>

          {/* Features Coming Soon */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Coming Soon ✨
            </h3>
            <ul className="space-y-3 text-left">
              <li className="flex items-center gap-3 text-gray-700">
                <span className="text-2xl">🛍️</span>
                <span>More Products & Categories</span>
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="text-2xl">🎁</span>
                <span>Special Offers & Deals</span>
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="text-2xl">⚡</span>
                <span>Faster Delivery Options</span>
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="text-2xl">💳</span>
                <span>Multiple Payment Methods</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                <Home className="w-5 h-5 mr-2" />
                Go to Home
              </Button>
            </Link>
            <Link href="/products">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Browse Products
              </Button>
            </Link>
          </div>

          {/* Contact Info */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-600 mb-3">
              Need help? Contact us:
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a
                href="https://wa.me/918989475895"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
              >
                <span className="text-xl">📱</span>
                WhatsApp: 8989475895
              </a>
              <a
                href="mailto:grahinimart7@gmail.com"
                className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
              >
                <span className="text-xl">📧</span>
                grahinimart7@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
