export const AdminRole = {
  NORMAL: 'NORMAL',
  MANAGER: 'MANAGER',
} as const

export type TAdminRole = (typeof AdminRole)[keyof typeof AdminRole]
