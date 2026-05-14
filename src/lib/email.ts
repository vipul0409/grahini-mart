// Email Service for Order Notifications
import { Order } from '@/types'

/**
 * Send order notification email to admin
 */
export const sendOrderNotificationEmail = async (order: Order): Promise<void> => {
  try {
    const response = await fetch('/api/send-order-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ order }),
    })

    if (!response.ok) {
      throw new Error('Failed to send email')
    }

    console.log('✅ Order notification email sent to admin')
  } catch (error) {
    console.error('❌ Error sending order email:', error)
    // Don't throw error - order should still be created even if email fails
  }
}

/**
 * Generate HTML email template for order
 */
export const generateOrderEmailHTML = (order: Order): string => {
  const itemsHTML = order.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
        <div style="font-weight: 600; color: #111827;">${item.name}</div>
        <div style="font-size: 14px; color: #6b7280;">
          ${item.weight} × ${item.quantity}
        </div>
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">
        ₹${item.price} × ${item.quantity}
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 600;">
        ₹${item.total}
      </td>
    </tr>
  `
    )
    .join('')

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Order - ${order.id}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                🛒 New Order Received!
              </h1>
              <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px; opacity: 0.9;">
                Grahini Mart
              </p>
            </td>
          </tr>

          <!-- Order Info -->
          <tr>
            <td style="padding: 30px;">
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin-bottom: 24px; border-radius: 4px;">
                <p style="margin: 0; font-size: 14px; color: #92400e;">
                  <strong>⚡ Action Required:</strong> A new order has been placed and needs your attention!
                </p>
              </div>

              <h2 style="margin: 0 0 20px 0; color: #111827; font-size: 20px;">
                Order Details
              </h2>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Order ID:</td>
                  <td style="padding: 8px 0; color: #111827; font-weight: 600; text-align: right;">${order.id}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Order Date:</td>
                  <td style="padding: 8px 0; color: #111827; font-weight: 600; text-align: right;">
                    ${new Date(order.createdAt).toLocaleString('en-IN', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Payment Method:</td>
                  <td style="padding: 8px 0; color: #111827; font-weight: 600; text-align: right;">
                    ${order.paymentMethod === 'cod' ? '💵 Cash on Delivery' : '💳 Online Payment'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Payment Status:</td>
                  <td style="padding: 8px 0; text-align: right;">
                    <span style="background-color: ${
                      order.paymentStatus === 'paid' ? '#d1fae5' : '#fef3c7'
                    }; color: ${
    order.paymentStatus === 'paid' ? '#065f46' : '#92400e'
  }; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600;">
                      ${order.paymentStatus === 'paid' ? '✓ Paid' : '⏳ Pending'}
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Customer Details -->
              <h2 style="margin: 30px 0 20px 0; color: #111827; font-size: 20px;">
                Customer Information
              </h2>

              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
                <tr>
                  <td>
                    <p style="margin: 0 0 8px 0; color: #111827; font-weight: 600; font-size: 16px;">
                      ${order.shippingAddress.name}
                    </p>
                    <p style="margin: 0 0 4px 0; color: #6b7280; font-size: 14px;">
                      📞 ${order.shippingAddress.phone}
                    </p>
                    <p style="margin: 8px 0 0 0; color: #6b7280; font-size: 14px; line-height: 1.5;">
                      📍 ${order.shippingAddress.addressLine1}${order.shippingAddress.addressLine2 ? ', ' + order.shippingAddress.addressLine2 : ''}${order.shippingAddress.landmark ? ', ' + order.shippingAddress.landmark : ''}, ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Order Items -->
              <h2 style="margin: 30px 0 20px 0; color: #111827; font-size: 20px;">
                Order Items
              </h2>

              <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; margin-bottom: 24px;">
                <thead>
                  <tr style="background-color: #f9fafb;">
                    <th style="padding: 12px; text-align: left; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase;">Product</th>
                    <th style="padding: 12px; text-align: right; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase;">Price</th>
                    <th style="padding: 12px; text-align: right; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHTML}
                </tbody>
              </table>

              <!-- Order Summary -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Subtotal:</td>
                  <td style="padding: 8px 0; color: #111827; text-align: right;">₹${order.subtotal}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Delivery Charges:</td>
                  <td style="padding: 8px 0; color: #111827; text-align: right;">
                    ${order.deliveryCharge === 0 ? 'FREE' : `₹${order.deliveryCharge}`}
                  </td>
                </tr>
                ${
                  order.discount > 0
                    ? `
                <tr>
                  <td style="padding: 8px 0; color: #059669; font-size: 14px;">Discount:</td>
                  <td style="padding: 8px 0; color: #059669; text-align: right;">-₹${order.discount}</td>
                </tr>
                `
                    : ''
                }
                <tr style="border-top: 2px solid #e5e7eb;">
                  <td style="padding: 16px 0 0 0; color: #111827; font-size: 18px; font-weight: bold;">Total Amount:</td>
                  <td style="padding: 16px 0 0 0; color: #f97316; font-size: 24px; font-weight: bold; text-align: right;">₹${order.total}</td>
                </tr>
              </table>

              <!-- Delivery Info -->
              ${
                order.notes
                  ? `
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin-bottom: 24px; border-radius: 4px;">
                <p style="margin: 0 0 4px 0; font-size: 12px; color: #92400e; font-weight: 600; text-transform: uppercase;">Customer Notes:</p>
                <p style="margin: 0; font-size: 14px; color: #78350f;">${order.notes}</p>
              </div>
              `
                  : ''
              }

              <!-- Action Buttons -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px;">
                <tr>
                  <td align="center">
                    <a href="https://console.firebase.google.com/project/grahini-mart/firestore/data/~2Forders~2F${
                      order.id
                    }" 
                       style="display: inline-block; background-color: #f97316; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; margin: 0 8px;">
                      View in Firebase
                    </a>
                    <a href="tel:${order.shippingAddress.phone}" 
                       style="display: inline-block; background-color: #10b981; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; margin: 0 8px;">
                      📞 Call Customer
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">
                This is an automated notification from Grahini Mart
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                © ${new Date().getFullYear()} Grahini Mart. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}

/**
 * Generate plain text version of order email
 */
export const generateOrderEmailText = (order: Order): string => {
  const items = order.items
    .map(
      (item) =>
        `- ${item.name} (${item.weight}) × ${item.quantity} = ₹${item.total}`
    )
    .join('\n')

  return `
NEW ORDER RECEIVED - Grahini Mart

Order ID: ${order.id}
Order Date: ${new Date(order.createdAt).toLocaleString('en-IN')}
Payment Method: ${order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
Payment Status: ${order.paymentStatus}

CUSTOMER INFORMATION:
Name: ${order.shippingAddress.name}
Phone: ${order.shippingAddress.phone}
Address: ${order.shippingAddress.addressLine1}${order.shippingAddress.addressLine2 ? ', ' + order.shippingAddress.addressLine2 : ''}${order.shippingAddress.landmark ? ', Landmark: ' + order.shippingAddress.landmark : ''}, ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}

ORDER ITEMS:
${items}

ORDER SUMMARY:
Subtotal: ₹${order.subtotal}
Delivery Charges: ${order.deliveryCharge === 0 ? 'FREE' : `₹${order.deliveryCharge}`}
${order.discount > 0 ? `Discount: -₹${order.discount}` : ''}
Total Amount: ₹${order.total}

${order.notes ? `Customer Notes: ${order.notes}` : ''}

View order in Firebase: https://console.firebase.google.com/project/grahini-mart/firestore/data/~2Forders~2F${order.id}

---
This is an automated notification from Grahini Mart
  `.trim()
}
