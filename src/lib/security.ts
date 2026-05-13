// Security utilities to prevent price manipulation and fraud

// Disable DevTools detection
export const detectDevTools = () => {
  if (typeof window === 'undefined') return

  const threshold = 160
  let devtoolsOpen = false

  const checkDevTools = () => {
    const widthThreshold = window.outerWidth - window.innerWidth > threshold
    const heightThreshold = window.outerHeight - window.innerHeight > threshold
    
    if (widthThreshold || heightThreshold) {
      if (!devtoolsOpen) {
        devtoolsOpen = true
        // Redirect or show warning
        window.location.href = '/devtools-detected'
      }
    } else {
      devtoolsOpen = false
    }
  }

  // Check periodically
  setInterval(checkDevTools, 1000)

  // Detect debugger
  setInterval(() => {
    const start = performance.now()
    debugger
    const end = performance.now()
    if (end - start > 100) {
      window.location.href = '/devtools-detected'
    }
  }, 1000)
}

// Disable right-click context menu
export const disableRightClick = () => {
  if (typeof window === 'undefined') return

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    return false
  })
}

// Disable keyboard shortcuts for DevTools
export const disableDevToolsShortcuts = () => {
  if (typeof window === 'undefined') return

  document.addEventListener('keydown', (e) => {
    // F12
    if (e.keyCode === 123) {
      e.preventDefault()
      return false
    }
    
    // Ctrl+Shift+I
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
      e.preventDefault()
      return false
    }
    
    // Ctrl+Shift+J
    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
      e.preventDefault()
      return false
    }
    
    // Ctrl+U (view source)
    if (e.ctrlKey && e.keyCode === 85) {
      e.preventDefault()
      return false
    }
    
    // Ctrl+Shift+C
    if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
      e.preventDefault()
      return false
    }
  })
}

// Disable text selection and copy
export const disableSelection = () => {
  if (typeof window === 'undefined') return

  document.addEventListener('selectstart', (e) => {
    e.preventDefault()
    return false
  })

  document.addEventListener('copy', (e) => {
    e.preventDefault()
    return false
  })
}

// Price integrity check - generate hash for price verification
export const generatePriceHash = (productId: string, variantId: string, price: number): string => {
  const secret = 'GRAHINI_MART_SECRET_2024' // In production, use env variable
  const data = `${productId}-${variantId}-${price}-${secret}`
  
  // Simple hash function (in production, use crypto library)
  let hash = 0
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(36)
}

// Verify price integrity
export const verifyPriceHash = (productId: string, variantId: string, price: number, hash: string): boolean => {
  const expectedHash = generatePriceHash(productId, variantId, price)
  return expectedHash === hash
}

// Initialize all security measures
export const initSecurity = () => {
  if (typeof window === 'undefined') return

  // Only enable in production
  if (process.env.NODE_ENV === 'production') {
    disableRightClick()
    disableDevToolsShortcuts()
    detectDevTools()
    // disableSelection() // Uncomment if you want to disable text selection
  }
}

// Validate order prices on submission
export const validateOrderPrices = (items: any[], products: any[]): boolean => {
  for (const item of items) {
    const product = products.find(p => p.id === item.productId)
    if (!product) return false

    const variant = product.variants.find((v: any) => v.id === item.variantId)
    if (!variant) return false

    // Check if price matches
    if (item.variant.price !== variant.price) {
      console.error('Price mismatch detected!', {
        expected: variant.price,
        received: item.variant.price
      })
      return false
    }

    // Check if total is correct
    const expectedTotal = variant.price * item.quantity
    if (item.total !== expectedTotal) {
      console.error('Total mismatch detected!', {
        expected: expectedTotal,
        received: item.total
      })
      return false
    }
  }

  return true
}

// Recalculate order total from scratch
export const recalculateOrderTotal = (items: any[], products: any[]): number => {
  let total = 0

  for (const item of items) {
    const product = products.find(p => p.id === item.productId)
    if (!product) continue

    const variant = product.variants.find((v: any) => v.id === item.variantId)
    if (!variant) continue

    // Use actual price from product data, not from cart
    total += variant.price * item.quantity
  }

  return total
}
