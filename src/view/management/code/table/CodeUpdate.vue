<template>
  <div class="grid gap-4 py-4">
    <div class="grid grid-cols-4 items-center gap-4">
      <Label for="id" class="text-left">ID</Label>
      <Input v-model="id" id="id" class="col-span-3 bg-gray-200" readonly />
    </div>
    <div class="grid grid-cols-4 items-center gap-4">
      <Label for="group" class="text-left"> Group </Label>
      <Select
        v-model="codeGroupId"
        id="group"
        placeholder="Select a Group"
        clazz="col-span-3"
        :options="codeGroups.map((cg) => ({ value: cg.id.toString(), label: cg.title }))"
      />
    </div>
    <div class="grid grid-cols-4 items-center gap-4">
      <Label for="title" class="text-left">Title</Label>
      <Input v-model="title" id="title" class="col-span-3" />
    </div>
    <div class="grid grid-cols-4 items-center gap-4">
      <Label for="value" class="text-left"> Value </Label>
      <Input v-model="value" id="value" class="col-span-3" />
    </div>
    <div class="grid items-end gap-4">
      <Button @click="update" :disabled="!updatable">Update</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computedAsync } from '@vueuse/core'
import type { Code, CodeGroup, UpdateCode } from '@/view/management/code/type.ts'
import { Label } from '@/component/shadcn/ui/label'
import { Input } from '@/component/shadcn/ui/input'
import Select from '@/component/shadcn/custom/form/Select.vue'
import { getApi, putApi, stringifyParams } from '@/util/api.ts'
import type { Page } from '@/type'
import { computed, ref, watch } from 'vue'
import { Button } from '@/component/shadcn/ui/button'
import { toastError, toastSuccess } from '@/util/toast.ts'
import { codeEventBus } from '@/view/management/code/event.ts'

const props = defineProps<{
  code: Code
}>()

const id = ref('')
const title = ref('')
const value = ref('')
const codeGroupId = ref('')

const codeGroups = computedAsync<CodeGroup[]>(async () => {
  const { data } = await getApi<Page<CodeGroup>>(
    `api/v1/code-groups?${stringifyParams({
      pageIndex: 0,
      pageSize: -1,
      sortBy: 'id',
      sortDesc: true,
    })}`,
  )
  return data.data?.content ?? []
}, [])

const updatable = computed(() => {
  return id.value && title.value && value.value && codeGroupId.value
})

async function update(): Promise<void> {
  const { status } = await putApi<UpdateCode, Code>(`api/v1/codes/${id.value}`, {
    title: title.value,
    value: value.value,
    codeGroupId: parseInt(codeGroupId.value),
  })
  if (status === 200) {
    toastSuccess('The code has been updated.')
    codeEventBus.emit('code-updated')
  } else {
    toastError('Failed to update the code.')
  }
}

watch(
  () => props.code,
  (newCode) => {
    id.value = newCode.id.toString()
    title.value = newCode.title
    value.value = newCode.value
    codeGroupId.value = newCode.codeGroup.id.toString()
  },
  { immediate: true },
)
</script>
