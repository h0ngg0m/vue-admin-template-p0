<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem
        @click="
          () => {
            openConfirm(
              async () => {
                await deleteNotice(notice)
              },
              'Delete notice',
              'Are you sure you want to delete this notice?',
              'Delete',
            )
          }
        "
      >
        <Trash />
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { Button } from '@/component/shadcn/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/component/shadcn/ui/dropdown-menu'
import { MoreHorizontal, Trash } from 'lucide-vue-next'
import { useConfirmStore } from '@/store/confirmStore.ts'
import { deleteApi } from '@/util/api.ts'
import type { ApiResponse } from '@/type'
import { toastError, toastSuccess } from '@/util/toast.ts'
import { noticeEventBus } from '@/view/management/notice/table/event.ts'
import type { Notice } from '@/view/management/notice/type.ts'

const { openConfirm } = useConfirmStore()

defineProps<{
  notice: Notice
}>()

async function deleteNotice(notice: Notice): Promise<void> {
  const response = await deleteApi<ApiResponse<void>>(`api/v1/notices/${notice.id}`)
  if (response.status === 204) {
    noticeEventBus.emit('notice-deleted')
    toastSuccess('The notice has been deleted.')
  } else {
    toastError('Failed to delete the notice.')
  }
}
</script>
