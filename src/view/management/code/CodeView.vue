<template>
  <ResizablePanelGroup id="handle-demo-group-1" direction="horizontal" class="h-full w-full">
    <ResizablePanel id="handle-demo-panel-1" :default-size="40">
      <div class="flex h-full p-6">
        <DataTable />
      </div>
    </ResizablePanel>
    <ResizableHandle id="handle-demo-handle-1" with-handle />
    <ResizablePanel id="handle-demo-panel-2" :default-size="60">
      <div class="flex p-6">
        <CodeUpdate v-if="show" :code="codeToUpdate" />
      </div>
    </ResizablePanel>
  </ResizablePanelGroup>
</template>

<script setup lang="ts">
import DataTable from '@/view/management/code/table/DataTable.vue'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/component/shadcn/ui/resizable'
import CodeUpdate from '@/view/management/code/table/CodeUpdate.vue'
import { codeEventBus } from '@/view/management/code/event.ts'
import { ref } from 'vue'
import { type Code, emptyCode } from '@/view/management/code/type.ts'

const codeToUpdate = ref<Code>(emptyCode())
const show = ref(false)

codeEventBus.on('open-code-update', (code) => {
  show.value = true
  codeToUpdate.value = code
})
</script>
