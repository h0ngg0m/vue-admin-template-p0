export interface ApiResponse<T> {
  data: T | null
  message: string
  code: string
}

export interface Page<T> {
  content: T[]
  totalElements: number
  totalPages: number
  size: number
}

export interface Jwt {
  accessToken: string
}
