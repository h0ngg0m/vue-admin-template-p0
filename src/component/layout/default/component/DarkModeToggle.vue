<template>
  <Icon
    v-if="mode === 'light'"
    icon="radix-icons:moon"
    @click="mode = 'dark'"
    class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
  />
  <Icon
    v-else
    icon="radix-icons:sun"
    @click="mode = 'light'"
    class="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
  />
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useColorMode } from '@vueuse/core'

const mode = useColorMode()
</script>
