<template>
  <div class="flex gap-4 p-4 pt-0 h-full">
    <div>
      <DataTable />
    </div>
    <div>
      <Separator orientation="vertical" />
    </div>
    <div>do something</div>
  </div>
</template>

<script setup lang="ts">
import DataTable from '@/view/management/notice/table/DataTable.vue'
import { Separator } from '@/component/shadcn/ui/separator'
</script>
