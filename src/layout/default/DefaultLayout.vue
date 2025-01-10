<template>
  <v-app>
    <v-layout class="rounded rounded-md">
      <MenuItems />
      <v-app-bar>
        <v-menu>
          <template #activator="{ props }">
            <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
          </template>
          <v-list>
            <v-list-item link prepend-icon="mdi-logout" title="Sign Out" @click="signOut" />
          </v-list>
        </v-menu>
      </v-app-bar>
      <v-main class="d-flex align-center justify-center" style="min-height: 300px">
        <RouterView />
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import MenuItems from '@/layout/default/menu/MenuItems.vue'
import { useAdminStore } from '@/store/adminStore.ts'
import router from '@/router'

const { clearAdminInfo } = useAdminStore()

async function signOut(): Promise<void> {
  clearAdminInfo()
  await router.push('/auth/sign-in')
}
</script>
