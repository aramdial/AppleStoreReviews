import axios, { AxiosInstance, AxiosRequestConfig, AxiosHeaders } from 'axios';
import { useRef } from 'react'

export const AxiosService = (nodeAddress: string, headers?: AxiosHeaders) => {
  const instance = useRef<AxiosInstance | undefined>(undefined)

  instance.current = axios.create({
    baseURL: nodeAddress,
    headers
  })

  instance.current.interceptors.response.use(
    function (response) {
      console.log(`axios response => ${JSON.stringify(response.data, null, 2)}`)
      return response
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error)
    }
  )

  const get = (uri: string, config?: AxiosRequestConfig) => {
    if (instance.current) return instance.current.get(uri, config)
  }

  const post = (uri: string, data?: any, config?: AxiosRequestConfig) => {
    if (instance.current) return instance.current.post(uri, data, config)
  }

  const remove = (uri: string, config?: AxiosRequestConfig) => {
    if (instance.current) return instance.current.delete(uri, config)
  }
  const patch = (uri: string, data?: any, config?: AxiosRequestConfig) => {
    if (instance.current) return instance.current.patch(uri, data, config)
  }

  return { get, post, remove, patch }
}
