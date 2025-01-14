import type { PaginationState, Updater } from '@tanstack/vue-table'
import { ref } from 'vue'

export function usePagination(pageIndex = 0, pageSize = 1) {
  const pagination = ref<PaginationState>({
    pageIndex: pageIndex,
    pageSize: pageSize, // items per page
  })

  const pageCount = ref(0) // total pages

  function setPagination({ pageIndex, pageSize }: PaginationState): PaginationState {
    pagination.value.pageIndex = pageIndex
    pagination.value.pageSize = pageSize
    return { pageIndex, pageSize }
  }

  function handlePaginationChange(updater: Updater<PaginationState>) {
    if (typeof updater === 'function') {
      setPagination(
        updater({
          pageIndex: pagination.value.pageIndex,
          pageSize: pagination.value.pageSize,
        }),
      )
    } else {
      setPagination(updater)
    }
  }

  return { pagination, pageCount, handlePaginationChange }
}
