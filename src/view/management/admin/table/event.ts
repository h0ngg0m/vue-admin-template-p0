import mitt, { type Emitter } from 'mitt'
import type { Admin } from '@/view/management/admin/type.ts'

type AdminEvents = {
  'open-update-dialog': Admin
  'admin-deleted': void
  'admin-updated': void
}

export const adminEventBus: Emitter<AdminEvents> = mitt<AdminEvents>()
