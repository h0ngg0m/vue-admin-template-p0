<template>
  <v-card elevation="10" class="overflow-hidden">
    <v-card-item class="v-card-item bg-surface pt-4 pb-2">
      <div class="d-sm-flex align-center justify-space-between">
        <v-card-title class="text-h5">
          <BasicLogo />
        </v-card-title>
        <slot name="action"></slot>
      </div>
    </v-card-item>
    <v-divider></v-divider>
    <v-card-text>
      <slot />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import BasicLogo from '@/layout/full/logo/BasicLogo.vue'
</script>
