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
        <EditCode v-if="show" :code="codeToEdit" />
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
import EditCode from '@/view/management/code/table/EditCode.vue'
import { codeEventBus } from '@/view/management/code/event.ts'
import { ref } from 'vue'
import { type Code, emptyCode } from '@/view/management/code/type.ts'

const codeToEdit = ref<Code>(emptyCode())
const show = ref(false)

codeEventBus.on('open-edit-code', (code) => {
  show.value = true
  codeToEdit.value = code
})
</script>
