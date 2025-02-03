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

export function emptyCode(): Code {
  return {
    id: 0,
    title: '',
    value: '',
    createdAt: '',
    updatedAt: '',
    codeGroup: emptyCodeGroup(),
  }
}

export function emptyCodeGroup(): CodeGroup {
  return {
    id: 0,
    title: '',
    createdAt: '',
    updatedAt: '',
  }
}
