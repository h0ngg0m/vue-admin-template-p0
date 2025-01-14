<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Open menu</span>
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="copy(payment.id)"> Copy payment ID </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { Button } from '@/shadcn/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shadcn/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-vue-next'

defineProps<{
  payment: {
    id: string
  }
}>()

function copy(id: string) {
  navigator.clipboard.writeText(id)
}
</script>
