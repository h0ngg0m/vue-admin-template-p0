<template>
  <div>
    <div class="flex items-center py-4">
      <DataTableColumnFilter :table="table" />
    </div>
    <div class="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <template v-for="row in table.getRowModel().rows" :key="row.id">
              <TableRow :data-state="row.getIsSelected() ? 'selected' : undefined">
                <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                  <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                </TableCell>
              </TableRow>
            </template>
          </template>
          <template v-else>
            <TableRow>
              <TableCell :colspan="columns.length" class="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </div>
    <div class="flex flex-col">
      <DataTablePagination
        :table="table"
        :pageIndex="pagination.pageIndex"
        :pageCount="pageCount"
      />
    </div>
  </div>

  <EditDialog v-model:show="showEditDialog" v-model:admin="adminToEdit" />
</template>

<script setup lang="ts">
import { FlexRender, getCoreRowModel, getSortedRowModel, useVueTable } from '@tanstack/vue-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/component/shadcn/ui/table'
import { ref, watch } from 'vue'
import { columns } from '@/view/management/admin/table/columns.ts'
import { type Admin, emptyAdmin } from '@/view/management/admin/type.ts'
import { getApi, stringifyParams } from '@/util/api.ts'
import type { Page } from '@/type'
import { usePagination } from '@/composable/usePagination.ts'
import DataTableColumnFilter from '@/component/table/tanstack/DataTableColumnFilter.vue'
import DataTablePagination from '@/component/table/tanstack/DataTablePagination.vue'
import { adminEventBus } from '@/view/management/admin/table/event.ts'
import EditDialog from '@/view/management/admin/table/EditDialog.vue'

const admins = ref<Admin[]>([])
const { pagination, pageCount, handlePaginationChange } = usePagination()

const table = useVueTable<Admin>({
  get data() {
    return admins.value
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  manualPagination: true,
  get pageCount() {
    return pageCount.value
  },
  state: {
    pagination: pagination.value,
  },
  onPaginationChange: (updater) => {
    handlePaginationChange(updater)
  },
})

async function getAdmins(): Promise<void> {
  const { data } = await getApi<Page<Admin>>(
    `api/v1/admins?${stringifyParams({
      pageIndex: pagination.value.pageIndex,
      pageSize: pagination.value.pageSize,
      sortBy: 'id',
      sortDesc: true,
    })}`,
  )
  pageCount.value = data?.data?.totalPages ?? 0
  admins.value = data?.data?.content ?? []
}

adminEventBus.on('admin-deleted', getAdmins)
adminEventBus.on('admin-updated', getAdmins)

const showEditDialog = ref(false)
const adminToEdit = ref<Admin>(emptyAdmin())
adminEventBus.on('open-edit-dialog', (admin) => {
  showEditDialog.value = true
  adminToEdit.value = admin
})

watch(() => pagination.value, getAdmins, { immediate: true, deep: true })
</script>
