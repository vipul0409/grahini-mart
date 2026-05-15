'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Home, RefreshCw, AlertTriangle } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to console
    console.error('Error occurred:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div>
          {/* Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-orange-100 rounded-full mb-4">
              <AlertTriangle className="w-12 h-12 text-orange-600" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Oops! Something went wrong
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 mb-2">
            कुछ गड़बड़ हो गई
          </p>

          <p className="text-lg text-gray-500 mb-8">
            Don't worry, we're working on it. Please try again.
          </p>

          {/* Error Message (Development only) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 text-left max-w-md mx-auto">
              <p className="text-sm font-mono text-red-800 break-all">
                {error.message}
              </p>
            </div>
          )}

          {/* Helpful Tips */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Try These Steps:
            </h3>
            <ul className="space-y-3 text-left">
              <li className="flex items-center gap-3 text-gray-700">
                <span className="text-2xl">🔄</span>
                <span>Refresh the page</span>
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="text-2xl">🏠</span>
                <span>Go back to home page</span>
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="text-2xl">🛍️</span>
                <span>Browse our products</span>
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="text-2xl">📞</span>
                <span>Contact us for help</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={reset}
              variant="primary" 
              size="lg" 
              className="w-full sm:w-auto"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Try Again
            </Button>
            <Link href="/">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Home className="w-5 h-5 mr-2" />
                Go to Home
              </Button>
            </Link>
          </div>

          {/* Contact Info */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-600 mb-3">
              Still having issues? Contact us:
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
