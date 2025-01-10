<template>
  <SidebarMenu>
    <Collapsible
      v-for="item in data.navMain"
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
            <SidebarMenuSubItem v-for="subItem in item.items" :key="subItem.title">
              <SidebarMenuSubButton as-child>
                <a :href="subItem.url">
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
} from '@/component/ui/sidebar'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/component/ui/collapsible'
import { ChevronRight, Settings2 } from 'lucide-vue-next'

interface Menu {
  name: string
  url: string
  icon: string
}

// const menus: Menu[] = [
//   { name: 'User', icon: 'mdi-account', url: '/user' },
//   { name: 'Setting', icon: 'mdi-cog', url: '/setting' },
// ]

const menus = {
  navMain: [
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Team',
          url: '#',
        },
        {
          title: 'Billing',
          url: '#',
        },
        {
          title: 'Limits',
          url: '#',
        },
      ],
    },
  ],
}
</script>
