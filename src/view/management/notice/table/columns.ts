import { type Column, createColumnHelper } from '@tanstack/vue-table'
import { Button } from '@/component/shadcn/ui/button'
import { ArrowUpDown } from 'lucide-vue-next'
import { h, type VNode } from 'vue'
import { formatToDateTime } from '@/util/common.ts'
import type { Notice } from '@/view/management/notice/type.ts'
import router from '@/router'
import { AdminRole } from '@/view/management/admin/type.ts'
import DataTableDropdown from '@/view/management/notice/table/DataTableDropdown.vue'
import { useAdminStore } from '@/store/adminStore.ts'

const { details } = useAdminStore()
const ch = createColumnHelper<Notice>()

function sortingButton(label: string, column: Column<Notice>): VNode {
  return h(
    Button,
    {
      variant: 'ghost',
      onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
    },
    () => [label, h(ArrowUpDown, { class: 'h-4 w-4' })],
  )
}

function goToDetail(id: number, title: string): VNode {
  return h(
    'span',
    {
      class: 'text-left ml-4 cursor-pointer underline text-blue-400',
      onClick: async () => {
        await router.push({ name: 'Notice Detail', params: { id: id } })
      },
    },
    title,
  )
}

export const columns = [
  ch.accessor('id', {
    cell: (c) => h('div', { class: 'text-left ml-4' }, c.getValue()),
    header: ({ column }) => sortingButton('ID', column),
  }),
  ch.accessor('title', {
    cell: (c) => goToDetail(c.row.original.id, c.getValue()),
    header: ({ column }) => sortingButton('Title', column),
  }),
  ch.accessor('content', {
    cell: (c) => h('div', { class: 'text-left ml-4' }, c.getValue()),
    header: ({ column }) => sortingButton('Content', column),
  }),
  ch.accessor('createdAt', {
    cell: (c) => formatToDateTime(c.getValue()),
    header: ({ column }) => sortingButton('Created At', column),
  }),
  ch.accessor('updatedAt', {
    cell: (c) => formatToDateTime(c.getValue()),
    header: ({ column }) => sortingButton('Updated At', column),
  }),
  ch.display({
    id: 'actions',
    cell: ({ row }) => {
      const notice = row.original
      if (details.role === AdminRole.SUPER) {
        return h('div', { class: 'relative' }, h(DataTableDropdown, { notice }))
      }
      return ''
    },
  }),
]
