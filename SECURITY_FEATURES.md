# 🔒 Security Features - Grahini Mart

## Overview
This document outlines the security measures implemented to prevent price manipulation and fraud through browser DevTools or inspect element.

---

## 🛡️ Security Layers Implemented

### 1. **DevTools Detection & Prevention**

#### Disabled Features:
- ✅ **Right-click context menu** - Prevents "Inspect Element"
- ✅ **F12 key** - Blocks DevTools shortcut
- ✅ **Ctrl+Shift+I** - Blocks DevTools shortcut
- ✅ **Ctrl+Shift+J** - Blocks Console shortcut
- ✅ **Ctrl+Shift+C** - Blocks Element picker
- ✅ **Ctrl+U** - Blocks View Source

#### Active Detection:
- 🔍 **Window size monitoring** - Detects when DevTools is opened
- 🔍 **Debugger detection** - Detects debugging attempts
- 🔍 **Performance monitoring** - Detects unusual execution patterns

#### Response:
- When DevTools is detected → Redirects to `/devtools-detected` warning page
- Shows security alert with warning about legal consequences
- Logs the attempt (can be extended to send to backend)

---

### 2. **Price Validation System**

#### Client-Side Protection:
```typescript
// Cart prices are stored but NOT trusted
// All prices are re-validated on checkout
```

#### Server-Side Validation (Checkout):
1. **Price Verification**
   - Compares cart prices with actual product prices
   - Rejects order if ANY price mismatch is detected
   
2. **Total Recalculation**
   - Recalculates entire order from scratch
   - Uses source product data (sampleProducts)
   - Ignores cart totals completely
   
3. **Integrity Check**
   - Validates each item's price
   - Validates each item's total (price × quantity)
   - Validates subtotal
   - Validates delivery charges
   - Validates final total

#### Validation Flow:
```
Customer clicks "Place Order"
    ↓
Validate all prices against source data
    ↓
If mismatch detected:
    - Show error message
    - Clear cart
    - Redirect to home
    ↓
If valid:
    - Use RECALCULATED prices (not cart prices)
    - Create order with validated data
    - Mark order as "VALIDATED"
```

---

### 3. **Order Security Markers**

Every order includes:
```javascript
{
  ...orderData,
  securityCheck: 'VALIDATED', // Confirms price validation passed
  createdAt: timestamp,        // Prevents replay attacks
}
```

---

### 4. **What Happens if Someone Tries to Manipulate?**

#### Scenario 1: User edits price in DevTools
```
1. User opens DevTools (detected)
2. Redirected to warning page
3. Cannot proceed with order
```

#### Scenario 2: User bypasses DevTools detection
```
1. User somehow edits cart price
2. Proceeds to checkout
3. Checkout validates prices
4. Mismatch detected
5. Order rejected with error
6. Cart cleared
7. Redirected to home
```

#### Scenario 3: User edits localStorage directly
```
1. User modifies cart in localStorage
2. Proceeds to checkout
3. Price validation runs
4. Recalculates from source data
5. Uses CORRECT prices (not manipulated ones)
6. Order created with VALIDATED prices
```

---

## 🎯 Key Security Functions

### `validateOrderPrices(items, products)`
- Validates each item's price against source data
- Returns `false` if ANY mismatch detected

### `recalculateOrderTotal(items, products)`
- Recalculates total from scratch
- Uses source product data only
- Ignores cart prices completely

### `initSecurity()`
- Initializes all security measures
- Only runs in production mode
- Disables DevTools shortcuts
- Starts detection monitoring

---

## 📋 Security Checklist

- ✅ Right-click disabled
- ✅ DevTools shortcuts blocked
- ✅ DevTools detection active
- ✅ Price validation on checkout
- ✅ Total recalculation from source
- ✅ Security markers on orders
- ✅ Warning page for violations
- ✅ Cart clearing on fraud detection
- ✅ Source data protection

---

## 🚨 Important Notes

### For Production:
1. **Environment Variable**: Move the secret key to `.env.local`
   ```
   NEXT_PUBLIC_PRICE_SECRET=your-secret-key-here
   ```

2. **Backend Integration**: When you add a backend:
   - Move price validation to server-side API
   - Never trust client-side data
   - Always recalculate prices on server
   - Log all validation failures

3. **Database**: When using MongoDB:
   - Store product prices in database
   - Validate against database prices
   - Log suspicious activities
   - Track user IPs for fraud attempts

### Current Limitations:
- Security runs only in production mode (`NODE_ENV=production`)
- In development mode, DevTools work normally for debugging
- Price validation uses `sampleProducts` (will use database in production)

---

## 🔐 How to Test Security

### Test DevTools Detection:
1. Build for production: `npm run build`
2. Start production server: `npm start`
3. Try to open DevTools (F12)
4. Should redirect to warning page

### Test Price Validation:
1. Add items to cart
2. Open browser console (before security loads)
3. Try to modify cart prices in localStorage
4. Proceed to checkout
5. Order should be rejected or prices corrected

---

## 📞 Support

If legitimate users encounter security warnings:
- Contact: grahinimart7@gmail.com
- WhatsApp: +91 8989475895

---

## ⚖️ Legal Notice

The warning page includes:
> "Any attempt to manipulate prices or product information will be logged and may result in legal action."

This serves as a deterrent for potential fraudsters.

---

## 🔄 Future Enhancements

1. **IP Logging**: Track IPs of fraud attempts
2. **Rate Limiting**: Limit order attempts per IP
3. **Email Alerts**: Notify admin of validation failures
4. **Blacklist**: Block repeat offenders
5. **Captcha**: Add captcha for suspicious activities
6. **Backend API**: Move all validation to secure backend
7. **Encryption**: Encrypt sensitive cart data
8. **Session Tokens**: Add session-based validation

---

**Last Updated**: December 2024
**Security Level**: Medium-High (Client-side + Validation)
**Recommended**: Add backend validation for production
