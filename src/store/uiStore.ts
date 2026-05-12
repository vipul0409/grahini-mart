import { create } from 'zustand'

interface UIStore {
  isMobileMenuOpen: boolean
  isCartOpen: boolean
  isSearchOpen: boolean
  isAuthModalOpen: boolean
  toggleMobileMenu: () => void
  toggleCart: () => void
  toggleSearch: () => void
  toggleAuthModal: () => void
  closeAll: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  isMobileMenuOpen: false,
  isCartOpen: false,
  isSearchOpen: false,
  isAuthModalOpen: false,

  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),

  toggleAuthModal: () =>
    set((state) => ({ isAuthModalOpen: !state.isAuthModalOpen })),

  closeAll: () =>
    set({
      isMobileMenuOpen: false,
      isCartOpen: false,
      isSearchOpen: false,
      isAuthModalOpen: false,
    }),
}))
