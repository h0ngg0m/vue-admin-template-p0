import { jwtDecode } from 'jwt-decode'
import { defineStore } from 'pinia'
import type { Jwt } from '@/type'
import router from '@/router'
import dayjs from 'dayjs'
import type { TAdminRole } from '@/view/management/admin/type.ts'

interface AdminDetails {
  id: number
  name: string
  loginId: string
  role: TAdminRole | null
}

interface AdminInfo {
  jwt: Jwt
  details: AdminDetails
}

const ACCESS_TOKEN_KEY = 'admin-web-template-access-token'

export const useAdminStore = defineStore('admin', {
  state: (): AdminInfo => ({
    jwt: {
      accessToken: '',
    },
    details: {
      id: 0,
      name: '',
      loginId: '',
      role: null,
    },
  }),
  getters: {
    isAuthenticated: (state: AdminInfo): boolean =>
      !!state.jwt.accessToken && !!state.details.id && !!localStorage.getItem(ACCESS_TOKEN_KEY),
  },
  actions: {
    clearAdminInfo(): void {
      window.localStorage.removeItem(ACCESS_TOKEN_KEY)
      this.jwt.accessToken = ''
      this.details.id = 0
      this.details.name = ''
      this.details.loginId = ''
      this.details.role = null
    },
    async saveJwt(jwt: Jwt): Promise<void> {
      try {
        this.jwt = jwt
        window.localStorage.setItem(ACCESS_TOKEN_KEY, jwt.accessToken)

        const decoded = jwtDecode<AdminDetails>(jwt.accessToken)
        this.details.id = decoded.id
        this.details.name = decoded.name
        this.details.loginId = decoded.loginId
        this.details.role = decoded.role
      } catch (e) {
        console.error(e)
        this.clearAdminInfo()
        await router.push('/auth/sign-in')
      }
    },
    isTokenExpired(): boolean {
      try {
        const decoded = jwtDecode(this.jwt.accessToken)
        return dayjs((decoded?.exp ?? 0) * 1000).isBefore(dayjs())
      } catch (e) {
        console.warn(e)
        return true
      }
    },
  },
  persist: true,
})
