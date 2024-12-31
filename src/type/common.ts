export interface ApiResponse<R> {
  data: R | null
  message: string
  code: string
}

export interface Jwt {
  accessToken: string
}
