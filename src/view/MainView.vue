<template>
  <v-navigation-drawer
    left
    v-model="sDrawer"
    app
    class="leftSidebar ml-sm-5 mt-sm-5 bg-containerBg"
    elevation="10"
    width="270"
  >
    <div class="pa-5 pl-4">
      <BasicLogo />
    </div>
    <perfect-scrollbar class="scrollnavbar bg-containerBg overflow-y-hidden">
      <v-list class="py-4 px-4 bg-containerBg">
        <template v-for="menu in Menus">
          <NavGroup :menu="menu" v-if="menu.header" :key="menu.header" />
          <NavItem :menu="menu" v-else class="leftPadding" :key="menu.title" />
        </template>
      </v-list>
    </perfect-scrollbar>
  </v-navigation-drawer>
  <div class="container verticalLayout">
    <div class="maxWidth">
      <v-app-bar elevation="0" height="70">
        <div class="d-flex align-center justify-space-between w-100">
          <div>
            <v-btn
              class="hidden-lg-and-up text-muted"
              @click="sDrawer = !sDrawer"
              icon
              variant="flat"
              size="small"
            >
              <Menu2Icon size="20" stroke-width="1.5" />
            </v-btn>
            <NotificationDD />
          </div>
          <div>
            <ProfileDD />
          </div>
        </div>
      </v-app-bar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Menus } from '@/layout/full/vertical-sidebar/menu.ts'
import NavGroup from '@/layout/full/vertical-sidebar/NavGroup.vue'
import NavItem from '@/layout/full/vertical-sidebar/NavItem.vue'
import BasicLogo from '@/layout/full/logo/BasicLogo.vue'
import { Menu2Icon } from 'vue-tabler-icons'
import NotificationDD from '@/layout/full/vertical-header/NotificationBadge.vue'
import ProfileDD from '@/layout/full/vertical-header/DropdownProfile.vue'

const sDrawer = ref(true)
</script>
