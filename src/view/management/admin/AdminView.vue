<template>
  <ResizablePanelGroup id="handle-demo-group-1" direction="horizontal" class="h-full w-full">
    <ResizablePanel id="handle-demo-panel-1" :default-size="55">
      <div class="flex h-full p-6">
        <DataTable />
      </div>
    </ResizablePanel>
    <ResizableHandle id="handle-demo-handle-1" with-handle />
    <ResizablePanel id="handle-demo-panel-2" :default-size="45">
      <div class="flex h-full p-6">
        <div>do something</div>
      </div>
    </ResizablePanel>
  </ResizablePanelGroup>
</template>

<script setup lang="ts">
import DataTable from '@/view/management/admin/table/DataTable.vue'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/component/shadcn/ui/resizable'
</script>
