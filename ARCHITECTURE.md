# 🏗️ Architecture Documentation

## Project Structure

```
spice-and-grain/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   ├── globals.css        # Global styles
│   │   ├── products/          # Products pages
│   │   ├── checkout/          # Checkout flow
│   │   ├── account/           # User account
│   │   └── admin/             # Admin dashboard
│   │
│   ├── components/            # React components
│   │   ├── ui/               # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Badge.tsx
│   │   │   └── Skeleton.tsx
│   │   │
│   │   ├── layout/           # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MobileNav.tsx
│   │   │
│   │   ├── home/             # Home page components
│   │   │   ├── HeroSlider.tsx
│   │   │   ├── CategorySection.tsx
│   │   │   ├── FeaturedProducts.tsx
│   │   │   ├── WhyChooseUs.tsx
│   │   │   └── Testimonials.tsx
│   │   │
│   │   ├── products/         # Product components
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   └── ProductFilters.tsx
│   │   │
│   │   └── cart/             # Cart components
│   │       └── CartDrawer.tsx
│   │
│   ├── lib/                   # Utilities and config
│   │   ├── firebase.ts       # Firebase configuration
│   │   ├── constants.ts      # App constants
│   │   ├── utils.ts          # Helper functions
│   │   └── sampleData.ts     # Sample data
│   │
│   ├── store/                 # State management
│   │   ├── cartStore.ts      # Cart state
│   │   ├── userStore.ts      # User state
│   │   └── uiStore.ts        # UI state
│   │
│   ├── types/                 # TypeScript types
│   │   └── index.ts          # Type definitions
│   │
│   └── hooks/                 # Custom React hooks
│       ├── useAuth.ts
│       ├── useProducts.ts
│       └── useOrders.ts
│
├── public/                    # Static assets
│   ├── images/
│   ├── icons/
│   ├── manifest.json
│   └── favicon.ico
│
├── firebase/                  # Firebase config
│   └── firestore.rules
│
├── .env.example              # Environment variables template
├── .gitignore
├── next.config.js            # Next.js configuration
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
├── package.json
└── README.md
```

## Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **State**: Zustand
- **Language**: TypeScript

### Backend
- **Authentication**: Firebase Auth
- **Database**: Firestore
- **Storage**: Firebase Storage
- **Functions**: Firebase Cloud Functions (optional)

### Payments
- **Gateway**: Razorpay
- **Methods**: UPI, Cards, Net Banking, Wallets, COD

### Deployment
- **Hosting**: Vercel
- **CDN**: Vercel Edge Network
- **Analytics**: Vercel Analytics + Firebase Analytics

## Data Models

### User
```typescript
{
  id: string
  email: string
  phone: string
  name: string
  photoURL?: string
  addresses: Address[]
  wishlist: string[]
  loyaltyPoints: number
  createdAt: Date
  lastLogin: Date
}
```

### Product
```typescript
{
  id: string
  name: string
  slug: string
  description: string
  category: string
  images: string[]
  variants: ProductVariant[]
  nutrition?: NutritionInfo
  features: string[]
  tags: string[]
  rating: number
  reviewCount: number
  isFeatured: boolean
  isNew: boolean
  isBestSeller: boolean
  stock: number
  createdAt: Date
  updatedAt: Date
}
```

### Order
```typescript
{
  id: string
  userId: string
  orderNumber: string
  items: OrderItem[]
  subtotal: number
  discount: number
  deliveryCharge: number
  total: number
  paymentMethod: 'razorpay' | 'cod'
  paymentStatus: 'pending' | 'paid' | 'failed'
  orderStatus: OrderStatus
  shippingAddress: Address
  trackingNumber?: string
  createdAt: Date
  updatedAt: Date
}
```

## State Management

### Cart Store (Zustand)
- Items management
- Quantity updates
- Coupon application
- Price calculations
- Persistent storage

### User Store (Zustand)
- User profile
- Authentication state
- Wishlist management
- Address management
- Persistent storage

### UI Store (Zustand)
- Modal states
- Drawer states
- Loading states
- Toast notifications

## API Routes

### Products
- `GET /api/products` - List products
- `GET /api/products/:id` - Get product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `GET /api/orders` - List orders
- `GET /api/orders/:id` - Get order
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order status (admin)

### Users
- `GET /api/users/:id` - Get user
- `PUT /api/users/:id` - Update user
- `POST /api/users/:id/addresses` - Add address
- `DELETE /api/users/:id/addresses/:addressId` - Delete address

### Payments
- `POST /api/payments/create-order` - Create Razorpay order
- `POST /api/payments/verify` - Verify payment
- `POST /api/payments/webhook` - Payment webhook

## Security

### Authentication
- Firebase Authentication
- JWT tokens
- Secure HTTP-only cookies
- Session management

### Authorization
- Role-based access control (RBAC)
- Admin vs Customer roles
- Protected routes
- API middleware

### Data Protection
- Input validation (Zod)
- XSS prevention
- CSRF protection
- SQL injection prevention
- Rate limiting

### Firebase Security Rules
- User data isolation
- Admin-only write access
- Read access control
- Field-level security

## Performance Optimization

### Code Splitting
- Route-based splitting
- Component lazy loading
- Dynamic imports

### Image Optimization
- Next.js Image component
- WebP format
- Responsive images
- Lazy loading

### Caching
- Static page caching
- API response caching
- Browser caching
- CDN caching

### Bundle Optimization
- Tree shaking
- Minification
- Compression (gzip/brotli)
- Code splitting

## SEO Strategy

### On-Page SEO
- Meta tags
- Structured data (JSON-LD)
- Semantic HTML
- Alt text for images
- Internal linking

### Technical SEO
- XML sitemap
- Robots.txt
- Canonical URLs
- Mobile-friendly
- Fast loading

### Content SEO
- Product descriptions
- Category pages
- Blog content
- FAQ pages

## Monitoring & Analytics

### Performance Monitoring
- Vercel Analytics
- Core Web Vitals
- Page load times
- API response times

### User Analytics
- Firebase Analytics
- User behavior tracking
- Conversion tracking
- Funnel analysis

### Error Tracking
- Error boundaries
- Console error logging
- API error tracking
- User feedback

## Scalability

### Horizontal Scaling
- Serverless functions
- CDN distribution
- Database sharding
- Load balancing

### Vertical Scaling
- Database optimization
- Query optimization
- Caching strategies
- Resource allocation

## Testing Strategy

### Unit Tests
- Component testing
- Utility function testing
- Store testing

### Integration Tests
- API testing
- Database testing
- Payment flow testing

### E2E Tests
- User flows
- Checkout process
- Admin operations

## CI/CD Pipeline

### Development
1. Local development
2. Git commit
3. Push to GitHub
4. Automated tests
5. Preview deployment

### Production
1. Merge to main
2. Automated tests
3. Build process
4. Deploy to Vercel
5. Post-deployment tests

## Backup & Recovery

### Database Backups
- Daily automated backups
- Point-in-time recovery
- Backup retention policy

### Code Backups
- Git version control
- GitHub repository
- Multiple branches

### Disaster Recovery
- Backup restoration process
- Failover strategy
- Data recovery plan
