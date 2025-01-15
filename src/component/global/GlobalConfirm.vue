<template>
  <AlertDialog :open="cs.open">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{{ cs.title }}</AlertDialogTitle>
        <AlertDialogDescription>{{ cs.content }}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel @click="cs.closeConfirm">{{ cs.cancelButtonTitle }}</AlertDialogCancel>
        <AlertDialogAction @click="cs.doAction">{{ cs.actionButtonTitle }}</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/component/shadcn/ui/alert-dialog'

import { useConfirmStore } from '@/store/confirmStore.ts'
import { onMounted, onUnmounted } from 'vue'

const cs = useConfirmStore()

function handleEsc(event: KeyboardEvent) {
  if (event.key === 'Escape' && cs.open) {
    cs.closeConfirm()
  }
}

onMounted(() => {
  window.addEventListener('keyup', handleEsc)
})

onUnmounted(() => {
  window.removeEventListener('keyup', handleEsc)
})
</script>
