<template>
  <div>{{ value.value }}</div>
  <div>{{ value.title }}</div>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import type { Code } from '@/view/management/code/type.ts'

const props = defineProps<{
  modelValue: Code
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', modelValue: Code): void
}>()

const value = useVModel(props, 'modelValue', emits)
</script>
