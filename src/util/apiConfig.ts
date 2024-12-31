import axios, { type AxiosInstance, type AxiosResponse } from 'axios'
import type { ApiResponse } from '@/type/common.ts'

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
  withCredentials: true,
})

instance.interceptors.request.use(
  async (config) => {
    // TODO: jwt 전송
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

export async function postApi<D, R>(url: string, data: D): Promise<AxiosResponse<ApiResponse<R>>> {
  return await instance.post<R, AxiosResponse<ApiResponse<R>>, D>(url, data)
}

export async function putApi<D, R>(url: string, data: D): Promise<AxiosResponse<ApiResponse<R>>> {
  return await instance.put<R, AxiosResponse<ApiResponse<R>>, D>(url, data)
}

export async function patchApi<D, R>(url: string, data: D): Promise<AxiosResponse<ApiResponse<R>>> {
  return await instance.patch<R, AxiosResponse<ApiResponse<R>>, D>(url, data)
}

export async function deleteApi<R>(url: string): Promise<AxiosResponse<ApiResponse<R>>> {
  return await instance.delete<R, AxiosResponse<ApiResponse<R>>, unknown>(url)
}
