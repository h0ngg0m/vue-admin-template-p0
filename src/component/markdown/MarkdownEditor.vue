<template>
  <VueMarkdownEditor v-model="value" height="800px" />
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import enUS from '@kangc/v-md-editor/lib/lang/en-US'

VueMarkdownEditor.lang.use('en-US', enUS)
VueMarkdownEditor.use(vuepressTheme)

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: string): void
}>()
const value = useVModel(props, 'modelValue', emit)
</script>
