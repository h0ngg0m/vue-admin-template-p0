<template>
  <v-app>
    <v-layout class="rounded rounded-md">
      <MenuItems />
      <v-app-bar title="Application bar"></v-app-bar>
      <v-main class="d-flex align-center justify-center" style="min-height: 300px">
        <RouterView />
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import MenuItems from '@/layout/default/menu/MenuItems.vue'
</script>
