import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios"
import * as SecureToken from "expo-secure-store"

// Boot Instance
const axiosClient = axios.create({
  // `baseURL` will be prepended to `url` unless `url` is absolute.
  // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
  // to methods of that instance.
  baseURL: "http://ie307.customafk.com/",
})

// Setup Interceptors
// Interceptor Request
const onRequest = async (config: any) => {
  try {
    console.log(config.headers)
    const accessToken = await SecureToken.getItemAsync("ie307_access_token")
    if (accessToken) config.headers["Authorization"] = `Bearer ${accessToken}`
    return config
  } catch (error) {}
}
const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.log(error.request?.headers)
  console.log(error.request?.status)
  console.log(error.request?.data)

  return Promise.reject(error.request)
}
const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response
}
const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  console.log(error.response?.headers)
  console.log(error.response?.status)
  console.log(error.response?.data)
  return Promise.reject(error.response)
}
const setupInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(onRequest, onRequestError)
  axiosInstance.interceptors.response.use(onResponse, onResponseError)
  return axiosInstance
}

setupInterceptors(axiosClient)
export { axiosClient }
