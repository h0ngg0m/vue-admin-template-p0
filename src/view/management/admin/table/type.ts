export interface Admin {
  id: number
  name: string
  loginId: string
  role: TAdminRole
  createdAt: string
  updatedAt: string
  lastLoginAt: string
}

export const AdminRole = {
  NORMAL: 'NORMAL',
  SUPER: 'SUPER',
} as const

export type TAdminRole = (typeof AdminRole)[keyof typeof AdminRole]

export interface AdminUpdate {
  name: string
  password: string
  role: TAdminRole
}

export function emptyAdmin(): Admin {
  return {
    id: 0,
    name: '',
    loginId: '',
    role: AdminRole.NORMAL,
    createdAt: '',
    updatedAt: '',
    lastLoginAt: '',
  }
}
