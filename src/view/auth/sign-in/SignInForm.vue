<template>
  <div class="d-flex align-center text-center mb-6">
    <div class="text-h6 w-100 px-5 font-weight-regular auth-divider position-relative">
      <span class="bg-surface px-5 py-3 position-relative text-subtitle-1 text-grey100"
        >Sign In</span
      >
    </div>
  </div>
  <div>
    <v-row class="mb-3">
      <v-col cols="12">
        <v-label class="font-weight-medium mb-1">ID</v-label>
        <v-text-field
          v-model.trim="loginId"
          variant="outlined"
          class="pwdInput"
          hide-details
          color="primary"
          @keydown.enter="signIn"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-label class="font-weight-medium mb-1">Password</v-label>
        <v-text-field
          v-model.trim="password"
          variant="outlined"
          class="border-borderColor"
          type="password"
          hide-details
          color="primary"
          @keydown.enter="signIn"
        ></v-text-field>
      </v-col>
      <v-col cols="12 " class="py-0">
        <div class="d-flex flex-wrap align-center w-100">
          <v-checkbox hide-details color="primary">
            <template #label>Remeber this Device</template>
          </v-checkbox>
          <div class="ml-sm-auto">
            <RouterLink
              to=""
              @click="unimplemented"
              class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium"
            >
              Forgot Password ?
            </RouterLink>
          </div>
        </div>
      </v-col>
      <v-col cols="12">
        <v-btn
          :disabled="signInBtnDisabled"
          :loading="signLoading"
          @click="signIn"
          size="large"
          rounded="pill"
          color="primary"
          class="rounded-pill"
          block
          flat
          >Sign In
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { unimplemented } from '@/util/toast.ts'
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
      toast('로그인에 실패했습니다. 다시 시도해 주세요.', { type: 'error' })
    }
  } catch (e) {
    console.error(e)
    toast('로그인에 실패했습니다. 다시 시도해 주세요.', { type: 'error' })
  } finally {
    signLoading.value = false
  }
}
</script>
