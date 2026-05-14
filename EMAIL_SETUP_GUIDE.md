# Email Notification Setup Guide

## Overview

When a customer places an order, an automated email is sent to **grahinimart7@gmail.com** with complete order details, customer information, and a beautiful HTML invoice.

## Features

✅ **Automated Email Notifications** - Sent immediately when order is placed
✅ **Beautiful HTML Template** - Professional invoice design
✅ **Complete Order Details** - Items, prices, customer info, delivery address
✅ **Action Buttons** - Direct links to Firebase and call customer
✅ **Fallback Support** - Opens mailto if email service not configured

## Email Template Includes

- 🛒 Order ID and date
- 👤 Customer name, phone, email
- 📍 Complete delivery address
- 🛍️ All ordered items with quantities and prices
- 💰 Payment summary (subtotal, delivery, discount, total)
- 💳 Payment method and status
- 🚚 Preferred delivery slot (if selected)
- 📝 Customer notes (if provided)
- 🔗 Quick action buttons

## Setup Instructions

### Step 1: Get Resend API Key (Free)

1. Go to: https://resend.com/signup
2. Sign up with your email
3. Verify your email
4. Go to: https://resend.com/api-keys
5. Click "Create API Key"
6. Copy the API key (starts with `re_`)

### Step 2: Add Domain (Optional but Recommended)

1. Go to: https://resend.com/domains
2. Click "Add Domain"
3. Add your domain (e.g., `grahinimart.com`)
4. Follow DNS setup instructions
5. Verify domain

**Note**: Without domain verification, emails will be sent from `onboarding@resend.dev`

### Step 3: Add Environment Variable

#### For Local Development (.env.local)

Add this line to your `.env.local` file:
```bash
RESEND_API_KEY=re_your_actual_api_key_here
```

#### For Production (Vercel)

1. Go to: Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add new variable:
   - **Name**: `RESEND_API_KEY`
   - **Value**: `re_your_actual_api_key_here`
   - **Environment**: Production, Preview, Development
3. Click "Save"
4. Redeploy your project

### Step 4: Test Email

1. Place a test order on your site
2. Check your email: **grahinimart7@gmail.com**
3. You should receive a beautiful HTML email with order details

## Email Preview

### Subject Line
```
🛒 New Order #12345678 - ₹450
```

### Email Content
- Professional header with Grahini Mart branding
- Order details in organized sections
- Customer information clearly displayed
- Itemized list of products
- Payment summary with totals
- Action buttons for quick response
- Professional footer

## Resend Free Tier

✅ **100 emails/day** - More than enough for small business
✅ **3,000 emails/month** - Free forever
✅ **No credit card required** - Start immediately
✅ **Professional templates** - HTML and plain text
✅ **Delivery tracking** - See if emails are opened

## Fallback Behavior

If Resend API key is not configured:
1. Email service will log a warning
2. Order will still be created successfully
3. mailto link will open as fallback
4. You can manually send email

## Files Created

1. **`src/lib/email.ts`** - Email template generator
   - `generateOrderEmailHTML()` - Beautiful HTML template
   - `generateOrderEmailText()` - Plain text version
   - `sendOrderNotificationEmail()` - Send email via API

2. **`src/app/api/send-order-email/route.ts`** - API endpoint
   - Handles email sending via Resend
   - Error handling and logging
   - Fallback support

3. **`src/lib/emailService.ts`** - Updated service
   - Integrates with new email system
   - Converts order data to email format
   - Fallback to mailto if needed

## Testing Checklist

- [ ] Resend account created
- [ ] API key obtained
- [ ] Environment variable added (local)
- [ ] Environment variable added (Vercel)
- [ ] Test order placed
- [ ] Email received at grahinimart7@gmail.com
- [ ] Email looks good (HTML formatting)
- [ ] All order details are correct
- [ ] Action buttons work

## Troubleshooting

### Email Not Received

**Check 1**: Verify API key is set
```bash
# In Vercel, check Environment Variables
# Should see: RESEND_API_KEY = re_...
```

**Check 2**: Check spam folder
- Emails might go to spam initially
- Mark as "Not Spam" to train Gmail

**Check 3**: Check Resend dashboard
- Go to: https://resend.com/emails
- See if email was sent
- Check delivery status

**Check 4**: Check browser console
```
✅ Order notification email sent to admin  ← Good!
⚠️ RESEND_API_KEY not configured          ← Need to add API key
❌ Failed to send email                    ← Check API key or Resend status
```

### Email Goes to Spam

**Solution 1**: Add domain verification
- Verify your domain in Resend
- Emails from verified domains rarely go to spam

**Solution 2**: Mark as not spam
- Open email in Gmail
- Click "Not Spam"
- Future emails will go to inbox

**Solution 3**: Add to contacts
- Add orders@grahinimart.com to Gmail contacts
- Emails from contacts never go to spam

### API Key Not Working

**Check 1**: Correct format
- Should start with `re_`
- No extra spaces or quotes
- Example: `re_abc123xyz789`

**Check 2**: Key is active
- Go to Resend dashboard
- Check if key is still active
- Create new key if needed

**Check 3**: Redeploy
- After adding environment variable
- Redeploy in Vercel
- Wait 2-3 minutes

## Email Customization

### Change "From" Email

Edit `src/app/api/send-order-email/route.ts`:
```typescript
from: 'Grahini Mart <orders@yourdomain.com>',
```

### Change Admin Email

Edit `src/app/api/send-order-email/route.ts`:
```typescript
to: ['grahinimart7@gmail.com'],
```

Or add multiple recipients:
```typescript
to: ['grahinimart7@gmail.com', 'backup@gmail.com'],
```

### Customize Email Template

Edit `src/lib/email.ts`:
- Change colors in `generateOrderEmailHTML()`
- Modify layout and sections
- Add/remove information
- Change button styles

## Cost Estimate

### Resend Pricing
- **Free**: 100 emails/day, 3,000/month
- **Pro**: $20/month for 50,000 emails

### For Your Business
Assuming 10 orders/day:
- **Daily**: 10 emails
- **Monthly**: 300 emails
- **Cost**: **FREE** ✅

You'd need 100+ orders/day to exceed free tier!

## Benefits

✅ **Instant Notifications** - Know immediately when order placed
✅ **Professional Look** - Beautiful HTML emails
✅ **All Details** - Everything you need to process order
✅ **Quick Actions** - Call customer or view in Firebase with one click
✅ **Reliable** - 99.9% delivery rate
✅ **Free** - No cost for small businesses

## Next Steps

1. ✅ Sign up for Resend (free)
2. ✅ Get API key
3. ✅ Add to environment variables
4. ✅ Deploy to production
5. ✅ Test with real order
6. ✅ Check email received

---

**Admin Email**: grahinimart7@gmail.com

**Support**: If you need help setting up, check Resend documentation at https://resend.com/docs
