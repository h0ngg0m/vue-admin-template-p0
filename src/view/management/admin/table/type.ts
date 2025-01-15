export interface Admin {
  id: number
  name: string
  loginId: string
  role: 'NORMAL' | 'SUPER'
  createdAt: string
  updatedAt: string
  lastLoginAt: string
}
