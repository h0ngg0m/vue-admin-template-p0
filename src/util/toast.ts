import { toast } from 'vue3-toastify'

export function toastSuccess(content: string) {
  toast(content, { type: 'success' })
}

export function toastError(content: string) {
  toast(content, { type: 'error' })
}

export function toastInfo(content: string) {
  toast(content, { type: 'info' })
}

export function toastWarning(content: string) {
  toast(content, { type: 'warning' })
}
