'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  ShoppingBag, 
  Heart, 
  Gift, 
  LogOut,
  ChevronRight 
} from 'lucide-react'
import { useUserStore } from '@/store/userStore'
import { useCartStore } from '@/store/cartStore'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import toast from 'react-hot-toast'

export default function AccountPage() {
  const router = useRouter()
  const user = useUserStore((state) => state.user)
  const logout = useUserStore((state) => state.logout)
  const clearCart = useCartStore((state) => state.clearCart)

  useEffect(() => {
    if (!user) {
      router.push('/auth')
    }
  }, [user, router])

  const handleLogout = () => {
    logout()
    clearCart()
    toast.success('Logged out successfully!')
    router.push('/')
  }

  if (!user) {
    return null
  }

  const menuItems = [
    {
      icon: ShoppingBag,
      label: 'My Orders',
      description: 'View your order history',
      href: '/orders',
      badge: null,
    },
    {
      icon: Heart,
      label: 'Wishlist',
      description: 'Your saved items',
      href: '/wishlist',
      badge: user.wishlist.length > 0 ? user.wishlist.length : null,
    },
    {
      icon: MapPin,
      label: 'Addresses',
      description: 'Manage delivery addresses',
      href: '/addresses',
      badge: user.addresses.length > 0 ? user.addresses.length : null,
    },
    {
      icon: Gift,
      label: 'Loyalty Points',
      description: `You have ${user.loyaltyPoints} points`,
      href: '/loyalty',
      badge: user.loyaltyPoints,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Account</h1>
          <p className="text-gray-600">Manage your profile and preferences</p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="mb-6">
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
                {user.name.charAt(0).toUpperCase()}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {user.name}
                </h2>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">+91 {user.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                </div>
              </div>

              {/* Logout Button (Desktop) */}
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="hidden md:flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>

            {/* Logout Button (Mobile) */}
            <Button
              onClick={handleLogout}
              variant="outline"
              size="md"
              fullWidth
              className="md:hidden mt-4 flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </Card>
        </motion.div>

        {/* Menu Items */}
        <div className="grid md:grid-cols-2 gap-4">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Card
                  hover
                  className="cursor-pointer group"
                  onClick={() => {
                    if (item.href === '/orders' || item.href === '/addresses' || item.href === '/loyalty') {
                      toast('Coming soon!', { icon: '🚀' })
                    } else {
                      router.push(item.href)
                    }
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600 group-hover:bg-primary-200 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {item.label}
                      </h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.badge !== null && (
                        <span className="px-2 py-1 bg-primary-500 text-white text-xs font-bold rounded-full">
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Account Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6"
        >
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Account Statistics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 mb-1">0</div>
                <div className="text-sm text-gray-600">Total Orders</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary-600 mb-1">
                  {user.wishlist.length}
                </div>
                <div className="text-sm text-gray-600">Wishlist Items</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600 mb-1">
                  {user.loyaltyPoints}
                </div>
                <div className="text-sm text-gray-600">Loyalty Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {user.addresses.length}
                </div>
                <div className="text-sm text-gray-600">Saved Addresses</div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Member Since */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center mt-6 text-sm text-gray-500"
        >
          Member since {new Date(user.createdAt).toLocaleDateString('en-IN', {
            month: 'long',
            year: 'numeric',
          })}
        </motion.div>
      </div>
    </div>
  )
}
