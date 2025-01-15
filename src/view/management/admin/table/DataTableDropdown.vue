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
                console.log('delete', admin.id)
              },
              'Delete admin',
              'Are you sure you want to delete this admin?',
              'Delete',
            )
          }
        "
      >
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
import { MoreHorizontal } from 'lucide-vue-next'
import type { Admin } from '@/view/management/admin/table/type.ts'
import { useConfirmStore } from '@/store/confirmStore.ts'

defineProps<{
  admin: Admin
}>()

const { openConfirm } = useConfirmStore()
</script>
