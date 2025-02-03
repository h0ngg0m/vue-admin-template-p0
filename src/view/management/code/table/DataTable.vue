<template>
  <div>
    <div class="flex py-4">
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
import { getApi, stringifyParams } from '@/util/api.ts'
import type { Page } from '@/type'
import { usePagination } from '@/composable/usePagination.ts'
import DataTableColumnFilter from '@/component/table/tanstack/DataTableColumnFilter.vue'
import DataTablePagination from '@/component/table/tanstack/DataTablePagination.vue'
import { columns } from '@/view/management/code/table/columns.ts'
import type { Code } from '@/view/management/code/type.ts'

const codes = ref<Code[]>([])
const { pagination, pageCount, handlePaginationChange } = usePagination()

const table = useVueTable<Code>({
  get data() {
    return codes.value
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

async function getCodes(): Promise<void> {
  const { data } = await getApi<Page<Code>>(
    `api/v1/codes?${stringifyParams({
      pageIndex: pagination.value.pageIndex,
      pageSize: pagination.value.pageSize,
      sortBy: 'id',
      sortDesc: true,
    })}`,
  )
  pageCount.value = data?.data?.totalPages ?? 0
  codes.value = data?.data?.content ?? []
}

watch(() => pagination.value, getCodes, { immediate: true, deep: true })
</script>
