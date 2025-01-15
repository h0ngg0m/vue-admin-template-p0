<template>
  <SidebarMenu>
    <Collapsible
      v-for="item in menus"
      :key="item.title"
      as-child
      :default-open="item.isActive"
      class="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger as-child>
          <SidebarMenuButton :tooltip="item.title">
            <component :is="item.icon" />
            <span>{{ item.title }}</span>
            <ChevronRight
              class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
            />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            <SidebarMenuSubItem
              v-for="subItem in item.items"
              :key="subItem.title"
              class="cursor-pointer"
            >
              <SidebarMenuSubButton as-child>
                <a @click="router.push(subItem.url)">
                  <span>{{ subItem.title }}</span>
                </a>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  </SidebarMenu>
</template>

<script setup lang="ts">
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/component/shadcn/ui/sidebar'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/component/shadcn/ui/collapsible'
import { ChevronRight, Settings2 } from 'lucide-vue-next'
import type { FunctionalComponent } from 'vue'
import router from '@/router'

interface Menu {
  title: string
  url: string
  icon: FunctionalComponent
  items?: SubMenu[]
  isActive?: boolean
}

interface SubMenu {
  title: string
  url: string
}

const menus: Menu[] = [
  {
    title: 'Management',
    url: '#',
    icon: Settings2,
    items: [
      {
        title: 'Admin',
        url: '/management/admin',
      },
      {
        title: 'User',
        url: '/management/user',
      },
      {
        title: 'Setting',
        url: '/management/setting',
      },
    ],
  },
]
</script>
