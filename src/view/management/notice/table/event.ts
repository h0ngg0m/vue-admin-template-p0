import mitt, { type Emitter } from 'mitt'

type NoticeEvents = {
  'notice-deleted': void
}

export const noticeEventBus: Emitter<NoticeEvents> = mitt<NoticeEvents>()
