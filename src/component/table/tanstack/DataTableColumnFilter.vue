<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline" class="ml-auto"> Columns </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuCheckboxItem
        v-for="column in table.getAllColumns().filter((c) => c.getCanHide())"
        :key="column.id"
        class="capitalize"
        :checked="column.getIsVisible()"
        @update:checked="
          (value) => {
            column.toggleVisibility(!!value)
          }
        "
      >
        {{ column.id }}
      </DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts" generic="TData">
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/component/shadcn/ui/dropdown-menu'
import { Button } from '@/component/shadcn/ui/button'
import type { Table } from '@tanstack/vue-table'

defineProps<{
  table: Table<TData>
}>()
</script>
