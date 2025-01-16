<template>
  <Select v-model="value" :class="clazz">
    <SelectTrigger :class="`w-[${width}px]`">
      <SelectValue :placeholder="placeholder" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>

<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/component/shadcn/ui/select'
import type { SelectOption } from '@/type'
import { useVModel } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    modelValue: string
    clazz?: string
    width?: string | number
    placeholder?: string
    options: SelectOption[]
  }>(),
  {
    width: 180,
  },
)

const emit = defineEmits(['update:modelValue'])

const value = useVModel(props, 'modelValue', emit)
</script>
