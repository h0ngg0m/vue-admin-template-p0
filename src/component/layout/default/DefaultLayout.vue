<template>
  <SidebarProvider>
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem @click="goHome">
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <SidebarMenuButton
                  size="lg"
                  class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div
                    class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
                  >
                    <UserCog />
                  </div>
                  <div class="grid flex-1 text-left text-sm leading-tight">
                    <span class="truncate font-semibold">Admin</span>
                    <span class="truncate text-xs">Template</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenus />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <FooterDropdownMenus />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
    <SidebarInset>
      <header
        class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
      >
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
          <DarkModeToggle />
        </div>
      </header>
      <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div>
          <RouterView />
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/component/shadcn/ui/sidebar'
import SidebarMenus from '@/component/layout/default/component/SidebarMenus.vue'
import FooterDropdownMenus from '@/component/layout/default/component/FooterDropdownMenus.vue'
import DarkModeToggle from '@/component/layout/default/component/DarkModeToggle.vue'
import { DropdownMenu, DropdownMenuTrigger } from '@/component/shadcn/ui/dropdown-menu'
import { UserCog } from 'lucide-vue-next'
import router from '@/router'

async function goHome(): Promise<void> {
  if (router.currentRoute.value.name === 'Home') return
  await router.push({ name: 'Home' })
}
</script>
