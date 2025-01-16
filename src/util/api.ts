import axios, { type AxiosInstance, type AxiosResponse } from 'axios'
import type { ApiResponse } from '@/type'
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

export async function getApi<R>(url: string): Promise<AxiosResponse<ApiResponse<R>>> {
  return await instance.get<R, AxiosResponse<ApiResponse<R>>, unknown>(url)
}

export async function postApi<T, R>(url: string, data: T): Promise<AxiosResponse<ApiResponse<R>>> {
  return await instance.post<R, AxiosResponse<ApiResponse<R>>, T>(url, data)
}

export async function putApi<T, R>(url: string, data: T): Promise<AxiosResponse<ApiResponse<R>>> {
  return await instance.put<R, AxiosResponse<ApiResponse<R>>, T>(url, data)
}

export async function patchApi<T, R>(url: string, data: T): Promise<AxiosResponse<ApiResponse<R>>> {
  return await instance.patch<R, AxiosResponse<ApiResponse<R>>, T>(url, data)
}

export async function deleteApi<R>(url: string): Promise<AxiosResponse<ApiResponse<R>>> {
  return await instance.delete<R, AxiosResponse<ApiResponse<R>>, unknown>(url)
}

export function stringifyParams(value: unknown): string {
  return stringify(value, { arrayFormat: 'repeat', skipNulls: true })
}
