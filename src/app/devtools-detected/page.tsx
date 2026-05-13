'use client'

import { useRouter } from 'next/navigation'
import { AlertTriangle, Home } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function DevToolsDetectedPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
          <AlertTriangle className="w-10 h-10 text-red-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Security Alert
        </h1>

        <p className="text-gray-600 mb-6">
          Developer tools have been detected. For security reasons and to prevent fraud, 
          we do not allow modifications to our website.
        </p>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-800">
            <strong>Warning:</strong> Any attempt to manipulate prices or product information 
            will be logged and may result in legal action.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => router.push('/')}
          className="w-full flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5" />
          Return to Home
        </Button>

        <p className="text-xs text-gray-500 mt-4">
          If you believe this is an error, please contact support.
        </p>
      </div>
    </div>
  )
}
