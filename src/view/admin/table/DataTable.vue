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
      <div class="flex justify-end space-x-2">
        <span class="text-sm text-muted-foreground mt-1">
          {{ `${pagination.pageIndex + 1} of ${pageCount}` }}
        </span>
      </div>
      <div class="flex items-center justify-end py-4 space-x-2">
        <Button
          variant="outline"
          size="sm"
          @click="() => table.setPageIndex(0)"
          :disabled="!table.getCanPreviousPage()"
        >
          <ChevronsLeft />
        </Button>
        <Button
          variant="outline"
          size="sm"
          @click="() => table.previousPage()"
          :disabled="!table.getCanPreviousPage()"
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          size="sm"
          @click="() => table.nextPage()"
          :disabled="!table.getCanNextPage()"
        >
          <ChevronRight />
        </Button>
        <Button
          variant="outline"
          size="sm"
          @click="() => table.setPageIndex(table.getPageCount() - 1)"
          :disabled="!table.getCanNextPage()"
        >
          <ChevronsRight />
        </Button>
      </div>
    </div>
  </div>
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
import { Button } from '@/component/shadcn/ui/button'
import { ref, watch } from 'vue'
import { columns } from '@/view/admin/table/columns.ts'
import type { Admin } from '@/view/admin/table/type.ts'
import { getApi, stringifyParams } from '@/util/api.ts'
import type { ApiResponse, Page } from '@/type/common.ts'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-vue-next'
import { usePagination } from '@/composable/usePagination.ts'
import DataTableColumnFilter from '@/component/table/tanstack/DataTableColumnFilter.vue'

const admins = ref<Admin[]>([])
const { pagination, pageCount, handlePaginationChange } = usePagination()

const table = useVueTable({
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
  const { data } = await getApi<ApiResponse<Page<Admin>>>(
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

watch(
  () => pagination.value,
  async () => {
    await getAdmins()
  },
  { immediate: true, deep: true },
)
</script>
