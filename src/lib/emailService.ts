import { EMAIL } from './constants'
import { sendOrderNotificationEmail } from './email'

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

export const sendOrderEmailToAdmin = async (orderData: OrderEmailData) => {
  try {
    // Convert OrderEmailData to Order format for email template
    const order = {
      id: orderData.orderId,
      customerInfo: {
        name: orderData.customer.name,
        phone: orderData.customer.phone,
        email: orderData.customer.email || '',
        address: orderData.deliveryAddress.address,
        city: orderData.deliveryAddress.city,
        state: orderData.deliveryAddress.state,
        pincode: orderData.deliveryAddress.pincode,
        landmark: orderData.deliveryAddress.landmark,
      },
      items: orderData.items.map(item => ({
        id: '',
        name: item.name,
        slug: '',
        category: '',
        images: [],
        selectedVariant: {
          id: '',
          weight: item.variant.weight,
          unit: item.variant.unit,
          price: item.variant.price,
          mrp: item.variant.price,
          discount: 0,
          sku: '',
          stock: 0,
          isDefault: true,
        },
        quantity: item.quantity,
      })),
      subtotal: orderData.subtotal,
      deliveryCharges: orderData.deliveryCharge,
      discount: 0,
      total: orderData.total,
      paymentMethod: orderData.paymentMethod,
      paymentStatus: orderData.paymentMethod === 'cod' ? 'pending' : 'paid',
      status: 'pending',
      notes: orderData.orderNotes,
      deliverySlot: undefined,
      createdAt: orderData.createdAt,
      updatedAt: orderData.createdAt,
    }

    // Send email via API
    await sendOrderNotificationEmail(order as any)
    console.log('✅ Order notification email sent to admin')
    return true
  } catch (error) {
    console.error('❌ Failed to send order email:', error)
    
    // Fallback: Open mailto link
    const subject = `New Order Received - ${orderData.orderId}`
    const body = generateEmailBody(orderData)
    const mailtoLink = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    
    try {
      window.open(mailtoLink, '_blank')
    } catch (mailtoError) {
      console.error('Failed to open email client:', mailtoError)
    }
    
    return false
  }
}

// Generate email body text
const generateEmailBody = (orderData: OrderEmailData): string => {
  return `
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
