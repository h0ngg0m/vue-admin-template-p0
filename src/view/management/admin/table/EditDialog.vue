<template>
  <Dialog :open="show">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit admin</DialogTitle>
        <DialogDescription> Edit the admin's information. </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="id" class="text-left"> ID </Label>
          <Input v-model="admin.id" id="id" class="col-span-3 bg-gray-200" readonly />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="loginId" class="text-left"> Login ID </Label>
          <Input v-model="admin.loginId" id="loginId" class="col-span-3 bg-gray-200" readonly />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="password" class="text-left"> Password </Label>
          <Input v-model.trim="newPassword" id="password" type="password" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-left"> Name </Label>
          <Input v-model.trim="admin.name" id="name" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="role" class="text-left"> Role </Label>
          <Select
            v-model="admin.role"
            id="role"
            placeholder="Select a Role"
            clazz="col-span-3"
            :options="Object.keys(AdminRole).map((key) => ({ value: key, label: key }))"
          />
        </div>
      </div>
      <DialogFooter>
        <Button :disabled="!editable" @click="save"> Save changes </Button>
      </DialogFooter>
      <DialogClose
        @click="show = false"
        class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
      >
        <X class="w-4 h-4" />
      </DialogClose>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { Button } from '@/component/shadcn/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/component/shadcn/ui/dialog'
import { Input } from '@/component/shadcn/ui/input'
import { Label } from '@/component/shadcn/ui/label'
import { useVModels } from '@vueuse/core'
import { type Admin, AdminRole, type AdminUpdate } from '@/view/management/admin/type.ts'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { DialogClose } from 'radix-vue'
import { X } from 'lucide-vue-next'
import Select from '@/component/shadcn/custom/form/Select.vue'
import { putApi } from '@/util/api.ts'
import { sha512 } from 'js-sha512'
import { toastError, toastSuccess } from '@/util/toast.ts'
import { adminEventBus } from '@/view/management/admin/table/event.ts'

const props = defineProps<{
  show: boolean
  admin: Admin
}>()

const emits = defineEmits<{
  (e: 'update:show', payload: boolean): void
  (e: 'update:admin', payload: Admin): void
}>()

const { show, admin } = useVModels(props, emits)
const editable = computed(
  () => admin.value.id && admin.value.loginId && admin.value.name && admin.value.role,
)
const newPassword = ref('')

async function save(): Promise<void> {
  const response = await putApi<AdminUpdate, void>(`api/v1/admins/${admin.value.id}`, {
    name: admin.value.name,
    role: admin.value.role,
    password: newPassword.value ? sha512(newPassword.value) : '',
  })

  if (response.status === 200) {
    show.value = false
    toastSuccess(
      'The admin has been updated. The changes will take effect the next time the admin logs in.',
    )
    adminEventBus.emit('admin-updated')
  } else {
    toastError('Failed to save changes. Please try again later.')
  }
}

function handleEsc(event: KeyboardEvent) {
  if (event.key === 'Escape' && show.value) {
    show.value = false
  }
}

onMounted(() => {
  window.addEventListener('keyup', handleEsc)
})

onUnmounted(() => {
  window.removeEventListener('keyup', handleEsc)
})
</script>
