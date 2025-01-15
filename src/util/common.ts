import dayjs from 'dayjs'

export function formatToDateTime(value: string): string {
  return dayjs(value).isValid() ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : '-'
}
