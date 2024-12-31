<template>
  <component :is="item" size="20" stroke-width="1.5" class="iconClass"></component>
</template>

<script lang="ts" setup>
defineProps<{
  item: unknown
}>()
</script>
