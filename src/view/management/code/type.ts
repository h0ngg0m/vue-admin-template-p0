export interface Code {
  id: number
  title: string
  value: string
  createdAt: string
  updatedAt: string
  codeGroup: CodeGroup
}

export interface CodeGroup {
  id: number
  title: string
  createdAt: string
  updatedAt: string
}
