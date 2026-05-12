import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '@/types'

interface UserStore {
  user: User | null
  setUser: (user: User | null) => void
  updateUser: (updates: Partial<User>) => void
  addToWishlist: (productId: string) => void
  removeFromWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  logout: () => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,

      setUser: (user) => set({ user }),

      updateUser: (updates) => {
        const currentUser = get().user
        if (currentUser) {
          set({ user: { ...currentUser, ...updates } })
        }
      },

      addToWishlist: (productId) => {
        const user = get().user
        if (user && !user.wishlist.includes(productId)) {
          set({
            user: {
              ...user,
              wishlist: [...user.wishlist, productId],
            },
          })
        }
      },

      removeFromWishlist: (productId) => {
        const user = get().user
        if (user) {
          set({
            user: {
              ...user,
              wishlist: user.wishlist.filter((id) => id !== productId),
            },
          })
        }
      },

      isInWishlist: (productId) => {
        const user = get().user
        return user ? user.wishlist.includes(productId) : false
      },

      logout: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
    }
  )
)
