<template>
  <div class="grid gap-4 py-4">
    <div class="grid grid-cols-4 items-center gap-4">
      <Label for="id" class="text-left">ID</Label>
      <Input v-model="value.id" id="id" class="col-span-3 bg-gray-200" readonly />
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
      <Input v-model="value.title" id="title" class="col-span-3" />
    </div>
    <div class="grid grid-cols-4 items-center gap-4">
      <Label for="value" class="text-left"> Value </Label>
      <Input v-model="value.value" id="value" class="col-span-3" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computedAsync, useVModel } from '@vueuse/core'
import type { Code, CodeGroup } from '@/view/management/code/type.ts'
import { Label } from '@/component/shadcn/ui/label'
import { Input } from '@/component/shadcn/ui/input'
import Select from '@/component/shadcn/custom/form/Select.vue'
import { getApi, stringifyParams } from '@/util/api.ts'
import type { Page } from '@/type'
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: Code
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', modelValue: Code): void
}>()

const value = useVModel(props, 'modelValue', emits)
const codeGroupId = ref('')

const codeGroups = computedAsync(async () => {
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

watch(
  () => value.value,
  () => {
    codeGroupId.value = value.value.codeGroup.id.toString()
  },
  { immediate: true },
)
</script>
