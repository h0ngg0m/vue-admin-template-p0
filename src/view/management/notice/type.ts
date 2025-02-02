export interface Notice {
  id: number
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export interface AddNotice {
  title: string
  content: string
}
