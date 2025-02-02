<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="openEditDialog(admin)">
        <Edit />
        Edit
      </DropdownMenuItem>
      <DropdownMenuItem
        @click="
          () => {
            openConfirm(
              async () => {
                await deleteAdmin(admin)
              },
              'Delete admin',
              'Are you sure you want to delete this admin?',
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
import { Edit, MoreHorizontal, Trash } from 'lucide-vue-next'
import { type Admin } from '@/view/management/admin/type.ts'
import { useConfirmStore } from '@/store/confirmStore.ts'
import { deleteApi } from '@/util/api.ts'
import type { ApiResponse } from '@/type'
import { toastError, toastSuccess } from '@/util/toast.ts'
import { adminEventBus } from '@/view/management/admin/table/event.ts'

const { openConfirm } = useConfirmStore()

defineProps<{
  admin: Admin
}>()

function openEditDialog(admin: Admin) {
  adminEventBus.emit('open-edit-dialog', admin)
}

async function deleteAdmin(admin: Admin): Promise<void> {
  const response = await deleteApi<ApiResponse<void>>(`api/v1/admins/${admin.id}`)
  if (response.status === 204) {
    adminEventBus.emit('admin-deleted')
    toastSuccess('The admin has been deleted.')
  } else {
    toastError('Failed to delete the admin.')
  }
}
</script>
