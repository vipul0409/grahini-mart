import { NextRequest, NextResponse } from 'next/server'
import { generateOrderEmailHTML, generateOrderEmailText } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { order } = await request.json()

    if (!order) {
      return NextResponse.json({ error: 'Order data is required' }, { status: 400 })
    }

    // Generate email content
    const htmlContent = generateOrderEmailHTML(order)
    const textContent = generateOrderEmailText(order)

    // Send email using Resend API
    const resendApiKey = process.env.RESEND_API_KEY

    if (!resendApiKey) {
      console.warn('⚠️ RESEND_API_KEY not configured, skipping email')
      return NextResponse.json({ 
        success: false, 
        message: 'Email service not configured' 
      })
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'Grahini Mart <orders@grahinimart.com>',
        to: ['grahinimart7@gmail.com'],
        subject: `🛒 New Order #${order.id.slice(-8)} - ₹${order.total}`,
        html: htmlContent,
        text: textContent,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('❌ Resend API error:', error)
      throw new Error('Failed to send email via Resend')
    }

    const data = await response.json()
    console.log('✅ Order notification email sent:', data.id)

    return NextResponse.json({ 
      success: true, 
      emailId: data.id,
      message: 'Email sent successfully' 
    })
  } catch (error: any) {
    console.error('❌ Error in send-order-email API:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to send email' },
      { status: 500 }
    )
  }
}
