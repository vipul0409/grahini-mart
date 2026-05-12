import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
}

export default function Skeleton({
  className,
  variant = 'rectangular',
  width,
  height,
  ...props
}: SkeletonProps) {
  const variants = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  }

  return (
    <div
      className={cn(
        'animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:1000px_100%]',
        variants[variant],
        className
      )}
      style={{ width, height }}
      {...props}
    />
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <Skeleton variant="rectangular" className="w-full aspect-square mb-4" />
      <Skeleton variant="text" className="h-4 w-3/4 mb-2" />
      <Skeleton variant="text" className="h-3 w-1/2 mb-3" />
      <div className="flex items-center justify-between">
        <Skeleton variant="text" className="h-5 w-20" />
        <Skeleton variant="rectangular" className="h-9 w-24" />
      </div>
    </div>
  )
}
