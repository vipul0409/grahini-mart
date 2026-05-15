import Image from 'next/image'
import Link from 'next/link'
import { SITE_NAME } from '@/lib/constants'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  className?: string
}

export default function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const sizes = {
    sm: { width: 32, height: 32, text: 'text-lg' },
    md: { width: 48, height: 48, text: 'text-2xl' },
    lg: { width: 64, height: 64, text: 'text-3xl' },
  }

  const { width, height, text } = sizes[size]

  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <div className="relative" style={{ width, height }}>
        <Image
          src="/images/grahini-mart-logo.png"
          alt={SITE_NAME}
          fill
          className="object-contain"
          priority
        />
      </div>
      {showText && (
        <div className="hidden sm:block">
          <h1 className={`${text} font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent`}>
            {SITE_NAME}
          </h1>
          <p className="text-xs text-gray-600">Premium Grocery, Wholesale Rates</p>
        </div>
      )}
    </Link>
  )
}
