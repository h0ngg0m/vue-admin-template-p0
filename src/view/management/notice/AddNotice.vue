<template>
  <Input v-model="title" placeholder="Enter a title" class="mb-4" />
  <MarkdownEditor v-model="content" />
  <div class="flex justify-start mt-4">
    <Button variant="outline" :disabled="buttonDisabled" @click="add">Add</Button>
  </div>
</template>
<script setup lang="ts">
import { Button } from '@/component/shadcn/ui/button'
import MarkdownEditor from '@/component/markdown/MarkdownEditor.vue'
import { computed, ref } from 'vue'
import { Input } from '@/component/shadcn/ui/input'
import { postApi } from '@/util/api.ts'
import type { AddNotice } from '@/view/management/notice/type.ts'
import router from '@/router'
import { toastError, toastSuccess } from '@/util/toast.ts'

const title = ref('')
const content = ref('')
const buttonDisabled = computed(() => !title.value || !content.value)

async function add(): Promise<void> {
  const { status } = await postApi<AddNotice, void>('api/v1/notices', {
    title: title.value,
    content: content.value,
  })

  if (status === 201) {
    await goBack()
    toastSuccess('Notice added')
  } else {
    toastError('Failed to add a notice')
  }
}

async function goBack(): Promise<void> {
  await router.push('/management/notice')
}
</script>
