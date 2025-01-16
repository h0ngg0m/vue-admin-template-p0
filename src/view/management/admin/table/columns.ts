import { type Column, createColumnHelper } from '@tanstack/vue-table'
import { type Admin, AdminRole } from '@/view/management/admin/table/type.ts'
import { Button } from '@/component/shadcn/ui/button'
import { ArrowUpDown } from 'lucide-vue-next'
import { h, type VNode } from 'vue'
import { formatToDateTime } from '@/util/common.ts'
import DataTableDropdown from '@/view/management/admin/table/DataTableDropdown.vue'
import { useAdminStore } from '@/store/adminStore.ts'

const { details } = useAdminStore()
const ch = createColumnHelper<Admin>()

function sortingButton(label: string, column: Column<Admin>): VNode {
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
  ch.accessor('name', {
    cell: (c) => h('div', { class: 'text-left ml-4' }, c.getValue()),
    header: ({ column }) => sortingButton('Name', column),
  }),
  ch.accessor('loginId', {
    cell: (c) => h('div', { class: 'text-left ml-4' }, c.getValue()),
    header: ({ column }) => sortingButton('Login ID', column),
  }),
  ch.accessor('role', {
    cell: (c) => h('div', { class: 'text-left ml-4' }, c.getValue()),
    header: ({ column }) => sortingButton('Role', column),
  }),
  ch.accessor('createdAt', {
    cell: (c) => formatToDateTime(c.getValue()),
    header: ({ column }) => sortingButton('Created At', column),
  }),
  ch.accessor('updatedAt', {
    cell: (c) => formatToDateTime(c.getValue()),
    header: ({ column }) => sortingButton('Updated At', column),
  }),
  ch.accessor('lastLoginAt', {
    cell: (c) => formatToDateTime(c.getValue()),
    header: ({ column }) => sortingButton('Last Login At', column),
  }),
  ch.display({
    id: 'actions',
    cell: ({ row }) => {
      const admin = row.original
      if (admin.id === details.id) {
        return "It's you!"
      }
      if (details.role === AdminRole.SUPER) {
        return h('div', { class: 'relative' }, h(DataTableDropdown, { admin }))
      }
      return ''
    },
  }),
]
