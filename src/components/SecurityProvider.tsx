'use client'

import { useEffect } from 'react'
import { initSecurity } from '@/lib/security'

export default function SecurityProvider() {
  useEffect(() => {
    // Initialize security measures
    initSecurity()
  }, [])

  return null
}
