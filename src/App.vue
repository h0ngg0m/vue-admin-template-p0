<template>
  <RouterView />
  <GlobalConfirm />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import GlobalConfirm from '@/component/global/GlobalConfirm.vue'
</script>
