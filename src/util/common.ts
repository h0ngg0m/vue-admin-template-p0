import dayjs from 'dayjs'
import mitt from 'mitt'

export function formatToDateTime(value: string): string {
  return dayjs(value).isValid() ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : '-'
}

export const eventBus = mitt()
