import { toast } from 'vue3-toastify'

export function unimplemented() {
  toast('구현되지 않은 기능입니다.', { type: 'error' })
}
