<template>
  <VMdPreview
    :text="content"
    :height="height"
    left-toolbar="h bold italic strikethrough quote | ul ol table | link image code"
  />
</template>

<script setup lang="ts">
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'

VMdPreview.use(vuepressTheme)

withDefaults(
  defineProps<{
    content: string
    height?: string
  }>(),
  {
    height: '800px',
  },
)
</script>
