<template>
  <v-navigation-drawer>
    <v-list>
      <v-list-item class="cursor-pointer" title="Admin" @click="router.push('/')"></v-list-item>
      <v-divider></v-divider>
      <template v-for="menu in menus" :key="menu.url">
        <v-list-item :prepend-icon="menu.icon" link :to="menu.url" :title="menu.name"></v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import router from '@/router'

interface Menu {
  name: string
  url: string
  icon: string
}

const menus: Menu[] = [
  { name: 'user', icon: 'mdi-account', url: '/user' },
  { name: 'setting', icon: 'mdi-cog', url: '/setting' },
]
</script>
