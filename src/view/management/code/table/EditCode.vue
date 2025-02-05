<template>
  <div class="grid gap-4 py-4">
    <div class="grid grid-cols-4 items-center gap-4">
      <Label for="id" class="text-left">ID</Label>
      <Input v-model="code.id" id="id" class="col-span-3 bg-gray-200" readonly />
    </div>
    <div class="grid grid-cols-4 items-center gap-4">
      <Label for="role" class="text-left"> Group </Label>
      <Select
        v-model="codeGroupId"
        id="role"
        placeholder="Select a Group"
        clazz="col-span-3"
        :options="codeGroups.map((cg) => ({ value: cg.id.toString(), label: cg.title }))"
      />
    </div>
    <div class="grid grid-cols-4 items-center gap-4">
      <Label for="title" class="text-left">Title</Label>
      <Input v-model="code.title" id="title" class="col-span-3" />
    </div>
    <div class="grid grid-cols-4 items-center gap-4">
      <Label for="value" class="text-left"> Value </Label>
      <Input v-model="code.value" id="value" class="col-span-3" />
    </div>
    <div class="grid items-end gap-4">
      <Button @click="save" :disabled="saveDisabled">Save</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computedAsync, useVModel } from '@vueuse/core'
import type { Code, CodeGroup, UpdateCode } from '@/view/management/code/type.ts'
import { Label } from '@/component/shadcn/ui/label'
import { Input } from '@/component/shadcn/ui/input'
import Select from '@/component/shadcn/custom/form/Select.vue'
import { getApi, putApi, stringifyParams } from '@/util/api.ts'
import type { Page } from '@/type'
import { computed, ref, watch } from 'vue'
import { Button } from '@/component/shadcn/ui/button'

const props = defineProps<{
  modelValue: Code
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', modelValue: Code): void
}>()

const code = useVModel(props, 'modelValue', emits)
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

const saveDisabled = computed(() => {
  return (
    !code.value || !code.value.id || !code.value.title || !code.value.value || !codeGroupId.value
  )
})

async function save(): Promise<void> {
  const { data, status } = await putApi<UpdateCode, Code>(`api/v1/codes/${code.value.id}`, {
    title: code.value.title,
    value: code.value.value,
    codeGroupId: parseInt(codeGroupId.value),
  })
  console.log(data)
  console.log(status)
}

watch(
  () => code.value,
  () => {
    codeGroupId.value = code.value.codeGroup.id.toString()
  },
  { immediate: true },
)
</script>
