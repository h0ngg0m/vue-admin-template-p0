<template>
  <div class="flex justify-end space-x-2">
    <span class="text-sm text-muted-foreground mt-1">
      {{ `${pageIndex + 1} of ${pageCount}` }}
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
</template>

<script setup lang="ts" generic="TData">
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-vue-next'
import { Button } from '@/component/shadcn/ui/button'
import type { Table } from '@tanstack/vue-table'

defineProps<{
  table: Table<TData>
  pageIndex: number
  pageCount: number
}>()
</script>
