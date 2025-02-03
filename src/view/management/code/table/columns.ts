import { type Column, createColumnHelper } from '@tanstack/vue-table'
import { Button } from '@/component/shadcn/ui/button'
import { ArrowUpDown } from 'lucide-vue-next'
import { h, type VNode } from 'vue'
import { formatToDateTime } from '@/util/common.ts'
import type { Code } from '@/view/management/code/type.ts'

const ch = createColumnHelper<Code>()

function sortingButton(label: string, column: Column<Code>): VNode {
  return h(
    Button,
    {
      variant: 'ghost',
      onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
    },
    () => [label, h(ArrowUpDown, { class: 'h-4 w-4' })],
  )
}

export const columns = [
  ch.accessor('id', {
    cell: (c) => h('div', { class: 'text-left ml-4' }, c.getValue()),
    header: ({ column }) => sortingButton('ID', column),
  }),
  ch.accessor('codeGroup.title', {
    cell: (c) => h('div', { class: 'text-left ml-4' }, c.getValue()),
    header: ({ column }) => sortingButton('Group', column),
  }),
  ch.accessor('title', {
    cell: (c) => h('div', { class: 'text-left ml-4' }, c.getValue()),
    header: ({ column }) => sortingButton('Title', column),
  }),
  ch.accessor('value', {
    cell: (c) => h('div', { class: 'text-left ml-4' }, c.getValue()),
    header: ({ column }) => sortingButton('Value', column),
  }),
  ch.accessor('createdAt', {
    cell: (c) => formatToDateTime(c.getValue()),
    header: ({ column }) => sortingButton('Created At', column),
  }),
  ch.accessor('updatedAt', {
    cell: (c) => formatToDateTime(c.getValue()),
    header: ({ column }) => sortingButton('Updated At', column),
  }),
]
