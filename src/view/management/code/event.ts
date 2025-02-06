import mitt, { type Emitter } from 'mitt'
import type { Code } from '@/view/management/code/type.ts'

type CodeEvents = {
  'open-code-update': Code
  'code-updated': void
}

export const codeEventBus: Emitter<CodeEvents> = mitt<CodeEvents>()
