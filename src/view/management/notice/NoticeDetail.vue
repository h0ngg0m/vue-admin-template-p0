<template>
  <span class="text-sm text-gray-500">{{ title }}</span>
  <Separator class="mb-4" />
  <MarkdownPreview :content="content" />
</template>
<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import MarkdownPreview from '@/component/markdown/MarkdownPreview.vue'
import type { Notice } from '@/view/management/notice/type.ts'
import { getApi } from '@/util/api.ts'
import router from '@/router'
import { toastError } from '@/util/toast.ts'
import { Separator } from '@/component/shadcn/ui/separator'

const props = defineProps<{
  id: number
}>()

const title = ref('')
const content = ref('')

async function getNoticeById(id: number): Promise<void> {
  const { status, data } = await getApi<Notice>(`api/v1/notices/${id}`)
  if (status === 200) {
    title.value = data.data?.title ?? ''
    content.value = data.data?.content ?? ''
  } else {
    await router.push({ name: 'Notice' })
    toastError('Failed to get a notice')
  }
}

onBeforeMount(async () => {
  await getNoticeById(props.id)
})
</script>
