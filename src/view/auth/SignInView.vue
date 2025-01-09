<template>
  <div class="d-flex justify-center align-center fill-height">
    <v-card width="500" elevation="4">
      <v-card-title>Sign In</v-card-title>
      <v-card-text>
        <v-label class="mt-2">ID</v-label>
        <v-text-field
          v-model.trim="loginId"
          variant="outlined"
          class="pwdInput"
          hide-details
          color="primary"
          @keydown.enter="signIn"
        ></v-text-field>
        <v-label class="mt-2">Password</v-label>
        <v-text-field
          v-model.trim="password"
          variant="outlined"
          class="border-borderColor"
          type="password"
          hide-details
          color="primary"
          @keydown.enter="signIn"
        ></v-text-field>
        <v-btn
          class="w-100 mt-3"
          color="primary"
          :loading="signLoading"
          :disabled="signInBtnDisabled"
          @click="signIn"
        >
          Sign In
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
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
