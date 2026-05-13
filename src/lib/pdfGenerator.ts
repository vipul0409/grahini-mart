import jsPDF from 'jspdf'
import { SITE_NAME, WHATSAPP_NUMBER, EMAIL, ADDRESS } from './constants'

export interface InvoiceData {
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

export const generateInvoicePDF = (data: InvoiceData) => {
  const doc = new jsPDF()
  
  let yPos = 20
  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 20
  const contentWidth = pageWidth - (margin * 2)

  // Header - Company Name
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.text(SITE_NAME, margin, yPos)
  
  yPos += 8
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text('थोक दाम में किराना, अब आपके दरवाजे पर', margin, yPos)
  
  yPos += 6
  doc.setFontSize(9)
  doc.text(`${ADDRESS}`, margin, yPos)
  yPos += 5
  doc.text(`Phone: ${WHATSAPP_NUMBER} | Email: ${EMAIL}`, margin, yPos)
  
  // Invoice Title
  yPos += 15
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.text('TAX INVOICE', pageWidth / 2, yPos, { align: 'center' })
  
  // Order Details Box
  yPos += 10
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  
  // Left side - Order Info
  doc.setFont('helvetica', 'bold')
  doc.text('Order ID:', margin, yPos)
  doc.setFont('helvetica', 'normal')
  doc.text(data.orderId, margin + 25, yPos)
  
  yPos += 6
  doc.setFont('helvetica', 'bold')
  doc.text('Order Date:', margin, yPos)
  doc.setFont('helvetica', 'normal')
  doc.text(new Date(data.createdAt).toLocaleString('en-IN'), margin + 25, yPos)
  
  yPos += 6
  doc.setFont('helvetica', 'bold')
  doc.text('Payment:', margin, yPos)
  doc.setFont('helvetica', 'normal')
  doc.text(data.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment', margin + 25, yPos)
  
  // Customer Details
  yPos += 12
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('BILL TO:', margin, yPos)
  
  yPos += 6
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text(data.customer.name, margin, yPos)
  
  yPos += 5
  doc.text(data.customer.phone, margin, yPos)
  
  if (data.customer.email) {
    yPos += 5
    doc.text(data.customer.email, margin, yPos)
  }
  
  // Delivery Address
  yPos += 10
  doc.setFont('helvetica', 'bold')
  doc.text('SHIP TO:', margin, yPos)
  
  yPos += 6
  doc.setFont('helvetica', 'normal')
  const addressLines = doc.splitTextToSize(data.deliveryAddress.address, contentWidth / 2)
  addressLines.forEach((line: string) => {
    doc.text(line, margin, yPos)
    yPos += 5
  })
  
  if (data.deliveryAddress.landmark) {
    doc.text(`Landmark: ${data.deliveryAddress.landmark}`, margin, yPos)
    yPos += 5
  }
  
  doc.text(`${data.deliveryAddress.city}, ${data.deliveryAddress.state} - ${data.deliveryAddress.pincode}`, margin, yPos)
  
  // Items Table
  yPos += 15
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.text('ORDER ITEMS', margin, yPos)
  
  yPos += 8
  
  // Table Header
  doc.setFillColor(240, 240, 240)
  doc.rect(margin, yPos - 5, contentWidth, 8, 'F')
  
  doc.setFontSize(9)
  doc.text('Item', margin + 2, yPos)
  doc.text('Qty', pageWidth - margin - 60, yPos)
  doc.text('Price', pageWidth - margin - 40, yPos)
  doc.text('Total', pageWidth - margin - 15, yPos, { align: 'right' })
  
  yPos += 8
  doc.setFont('helvetica', 'normal')
  
  // Table Rows
  data.items.forEach((item, index) => {
    if (yPos > 270) {
      doc.addPage()
      yPos = 20
    }
    
    const itemName = `${item.name} (${item.variant.weight}${item.variant.unit})`
    const itemLines = doc.splitTextToSize(itemName, 100)
    
    itemLines.forEach((line: string, lineIndex: number) => {
      doc.text(line, margin + 2, yPos)
      if (lineIndex === 0) {
        doc.text(item.quantity.toString(), pageWidth - margin - 60, yPos)
        doc.text(`₹${item.variant.price}`, pageWidth - margin - 40, yPos)
        doc.text(`₹${item.total}`, pageWidth - margin - 15, yPos, { align: 'right' })
      }
      yPos += 5
    })
    
    yPos += 2
  })
  
  // Totals
  yPos += 5
  doc.setDrawColor(200, 200, 200)
  doc.line(margin, yPos, pageWidth - margin, yPos)
  
  yPos += 8
  doc.setFont('helvetica', 'normal')
  doc.text('Subtotal:', pageWidth - margin - 60, yPos)
  doc.text(`₹${data.subtotal}`, pageWidth - margin - 15, yPos, { align: 'right' })
  
  yPos += 6
  doc.text('Delivery Charge:', pageWidth - margin - 60, yPos)
  doc.text(data.deliveryCharge === 0 ? 'FREE' : `₹${data.deliveryCharge}`, pageWidth - margin - 15, yPos, { align: 'right' })
  
  yPos += 8
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.text('TOTAL:', pageWidth - margin - 60, yPos)
  doc.text(`₹${data.total}`, pageWidth - margin - 15, yPos, { align: 'right' })
  
  // Order Notes
  if (data.orderNotes) {
    yPos += 15
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text('Notes:', margin, yPos)
    yPos += 6
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    const notesLines = doc.splitTextToSize(data.orderNotes, contentWidth)
    notesLines.forEach((line: string) => {
      if (yPos > 270) {
        doc.addPage()
        yPos = 20
      }
      doc.text(line, margin, yPos)
      yPos += 5
    })
  }
  
  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 20
  doc.setFontSize(8)
  doc.setFont('helvetica', 'italic')
  doc.setTextColor(100, 100, 100)
  doc.text('Thank you for shopping with us!', pageWidth / 2, footerY, { align: 'center' })
  doc.text(`For any queries, contact us at ${WHATSAPP_NUMBER} or ${EMAIL}`, pageWidth / 2, footerY + 4, { align: 'center' })
  
  // Save PDF
  doc.save(`Invoice-${data.orderId}.pdf`)
}
