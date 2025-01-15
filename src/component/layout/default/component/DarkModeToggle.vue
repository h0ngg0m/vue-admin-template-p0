<template>
  <Button v-if="mode === 'light'" @click="mode = 'dark'" variant="ghost">
    <Moon
      class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
    />
  </Button>
  <Button v-else @click="mode = 'light'" variant="ghost">
    <Sun
      class="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
    />
  </Button>
</template>

<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import { Button } from '@/component/shadcn/ui/button'
import { Moon, Sun } from 'lucide-vue-next'

const mode = useColorMode()
</script>
