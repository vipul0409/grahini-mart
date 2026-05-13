export interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  image?: string
  isActive: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}
