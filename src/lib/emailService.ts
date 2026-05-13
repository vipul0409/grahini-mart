import { EMAIL } from './constants'

export interface OrderEmailData {
  orderId: string
  customer: {
    name: string
    phone: string
    email?: string
  }
  deliveryAddress: {
    address: string
    city: string
    state: string
    pincode: string
    landmark?: string
  }
  items: Array<{
    name: string
    variant: {
      weight: string
      unit: string
      price: number
    }
    quantity: number
    total: number
  }>
  subtotal: number
  deliveryCharge: number
  total: number
  paymentMethod: string
  orderNotes?: string
  createdAt: string
}

export const sendOrderEmailToAdmin = (orderData: OrderEmailData) => {
  const subject = `New Order Received - ${orderData.orderId}`
  
  const body = `
🛒 NEW ORDER RECEIVED - ${orderData.orderId}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 ORDER DETAILS:
Order ID: ${orderData.orderId}
Order Date: ${new Date(orderData.createdAt).toLocaleString('en-IN')}
Payment Method: ${orderData.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Online Payment'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 CUSTOMER INFORMATION:
Name: ${orderData.customer.name}
Phone: ${orderData.customer.phone}
Email: ${orderData.customer.email || 'Not provided'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📍 DELIVERY ADDRESS:
${orderData.deliveryAddress.address}
${orderData.deliveryAddress.landmark ? `Landmark: ${orderData.deliveryAddress.landmark}` : ''}
${orderData.deliveryAddress.city}, ${orderData.deliveryAddress.state} - ${orderData.deliveryAddress.pincode}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🛍️ ORDER ITEMS:
${orderData.items.map((item, index) => 
  `${index + 1}. ${item.name} (${item.variant.weight}${item.variant.unit})
   Quantity: ${item.quantity}
   Price: ₹${item.variant.price}
   Total: ₹${item.total}`
).join('\n\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💰 PAYMENT SUMMARY:
Subtotal: ₹${orderData.subtotal}
Delivery Charge: ${orderData.deliveryCharge === 0 ? 'FREE' : `₹${orderData.deliveryCharge}`}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOTAL AMOUNT: ₹${orderData.total}

${orderData.orderNotes ? `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n📝 CUSTOMER NOTES:\n${orderData.orderNotes}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚡ ACTION REQUIRED:
Please process this order and contact the customer to confirm delivery details.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This is an automated notification from Grahini Mart.
  `.trim()

  // Open default email client with pre-filled content
  const mailtoLink = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  
  // Try to open email client
  try {
    window.open(mailtoLink, '_blank')
    return true
  } catch (error) {
    console.error('Failed to open email client:', error)
    return false
  }
}

// Alternative: Copy email content to clipboard
export const copyOrderEmailToClipboard = async (orderData: OrderEmailData): Promise<boolean> => {
  const emailContent = `
To: ${EMAIL}
Subject: New Order Received - ${orderData.orderId}

🛒 NEW ORDER RECEIVED - ${orderData.orderId}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 ORDER DETAILS:
Order ID: ${orderData.orderId}
Order Date: ${new Date(orderData.createdAt).toLocaleString('en-IN')}
Payment Method: ${orderData.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Online Payment'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 CUSTOMER INFORMATION:
Name: ${orderData.customer.name}
Phone: ${orderData.customer.phone}
Email: ${orderData.customer.email || 'Not provided'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📍 DELIVERY ADDRESS:
${orderData.deliveryAddress.address}
${orderData.deliveryAddress.landmark ? `Landmark: ${orderData.deliveryAddress.landmark}` : ''}
${orderData.deliveryAddress.city}, ${orderData.deliveryAddress.state} - ${orderData.deliveryAddress.pincode}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🛍️ ORDER ITEMS:
${orderData.items.map((item, index) => 
  `${index + 1}. ${item.name} (${item.variant.weight}${item.variant.unit})
   Quantity: ${item.quantity}
   Price: ₹${item.variant.price}
   Total: ₹${item.total}`
).join('\n\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💰 PAYMENT SUMMARY:
Subtotal: ₹${orderData.subtotal}
Delivery Charge: ${orderData.deliveryCharge === 0 ? 'FREE' : `₹${orderData.deliveryCharge}`}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOTAL AMOUNT: ₹${orderData.total}

${orderData.orderNotes ? `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n📝 CUSTOMER NOTES:\n${orderData.orderNotes}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚡ ACTION REQUIRED:
Please process this order and contact the customer to confirm delivery details.
  `.trim()

  try {
    await navigator.clipboard.writeText(emailContent)
    return true
  } catch (error) {
    console.error('Failed to copy to clipboard:', error)
    return false
  }
}
