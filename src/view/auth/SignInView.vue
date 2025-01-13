<template>
  <Card class="w-full max-w-sm">
    <CardHeader>
      <CardTitle class="text-2xl"> Sign in </CardTitle>
      <CardDescription> Enter your ID below to sign in to your account. </CardDescription>
    </CardHeader>
    <CardContent class="grid gap-4">
      <div class="grid gap-2">
        <Label for="email">Email</Label>
        <Input v-model.trim="loginId" id="email" type="text" required @keydown.enter="signIn" />
      </div>
      <div class="grid gap-2">
        <Label for="password">Password</Label>
        <Input
          v-model.trim="password"
          id="password"
          type="password"
          required
          @keydown.enter="signIn"
        />
      </div>
    </CardContent>
    <CardFooter>
      <Button class="w-full" :disabled="signInBtnDisabled" @click="signIn"> Sign in </Button>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import { Button } from '@/shadcn/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shadcn/ui/card'
import { Input } from '@/shadcn/ui/input'
import { Label } from '@/shadcn/ui/label'
import { computed, ref } from 'vue'
import axios, { type AxiosResponse } from 'axios'
import { BASE_API_URL } from '@/constant/env.ts'
import type { ApiResponse, Jwt } from '@/type/common.ts'
import { sha512 } from 'js-sha512'
import { toast } from 'vue3-toastify'
import { useAdminStore } from '@/store/adminStore.ts'
import router from '@/router'

const loginId = ref('')
const password = ref('')
const signLoading = ref(false)
const signInBtnDisabled = computed(() => loginId.value === '' || password.value === '')

interface AdminSignIn {
  loginId: string
  password: string
}

async function signIn(): Promise<void> {
  try {
    signLoading.value = true
    const { data } = await axios.post<Jwt, AxiosResponse<ApiResponse<Jwt>>, AdminSignIn>(
      `${BASE_API_URL}api/v1/admins/sign-in`,
      {
        loginId: loginId.value,
        password: sha512(password.value),
      },
    )
    if (data?.data?.accessToken) {
      const { saveJwt } = useAdminStore()
      await saveJwt(data.data)
      await router.push('/')
    } else {
      toast('Failed to sign in, Please check your ID and password.', { type: 'error' })
    }
  } catch (e) {
    console.error(e)
    toast('Failed to sign in, Please check your ID and password.', { type: 'error' })
  } finally {
    signLoading.value = false
  }
}
</script>
