import axios, { type AxiosInstance } from 'axios'
import type { ApiResponse } from '@/type/common.ts'
import { BASE_API_URL } from '@/constant/env.ts'
import { stringify } from 'qs'
import { useAdminStore } from '@/store/adminStore.ts'

const instance: AxiosInstance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
  withCredentials: true,
})

instance.interceptors.request.use(
  async (config) => {
    const { jwt } = useAdminStore()
    config.headers.Authorization = `Bearer ${jwt.accessToken}`

    return config
  },
  async (error) => {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  async (response) => {
    return response
  },
  async (error) => {
    return error
  },
)

export async function getApi<R>(url: string): Promise<ApiResponse<R>> {
  return await instance.get<R, ApiResponse<R>, unknown>(url)
}

export async function postApi<D, R>(url: string, data: D): Promise<ApiResponse<R>> {
  return await instance.post<R, ApiResponse<R>, D>(url, data)
}

export async function putApi<D, R>(url: string, data: D): Promise<ApiResponse<R>> {
  return await instance.put<R, ApiResponse<R>, D>(url, data)
}

export async function patchApi<D, R>(url: string, data: D): Promise<ApiResponse<R>> {
  return await instance.patch<R, ApiResponse<R>, D>(url, data)
}

export async function deleteApi<R>(url: string): Promise<ApiResponse<R>> {
  return await instance.delete<R, ApiResponse<R>, unknown>(url)
}

export function stringifyParams(value: unknown): string {
  return stringify(value, { arrayFormat: 'repeat', skipNulls: true })
}
