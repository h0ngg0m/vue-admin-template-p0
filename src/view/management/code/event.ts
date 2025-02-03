import mitt, { type Emitter } from 'mitt'
import type { Code } from '@/view/management/code/type.ts'

type CodeEvents = {
  'open-edit-code': Code
}

export const codeEventBus: Emitter<CodeEvents> = mitt<CodeEvents>()
