<template>
  <div class="mb-1">
    <v-list-item
      :to="menu.to"
      rounded
      :class="'bg-hover-' + menu.BgColor"
      :color="menu.BgColor"
      :ripple="false"
    >
      <template #prepend>
        <div :class="'navbox  bg-hover-' + menu.BgColor">
          <span class="icon-box">
            <IconWrapper
              :item="menu.icon"
              :class="'position-relative z-index-2 texthover-' + menu.BgColor"
            />
          </span>
        </div>
      </template>
      <v-list-item-title class="text-subtitle-1 font-weight-medium" :color="menu.BgColor"
        >{{ menu.title }}
      </v-list-item-title>
    </v-list-item>
  </div>
</template>

<script lang="ts" setup>
import IconWrapper from './IconWrapper.vue'
import type { Menu } from '@/layout/full/vertical-sidebar/menu.ts'

defineProps<{
  menu: Menu
}>()
</script>
