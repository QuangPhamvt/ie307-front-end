import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios"
import * as SecureToken from "expo-secure-store"
import { Buffer } from "buffer"

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
    console.log("Axios Request: ", config.url)

    const accessToken = await SecureToken.getItemAsync("ie307_access_token")
    if (accessToken && config.url !== "user/signIn" && config.url !== "user/signUp") {
      config.headers["Authorization"] = `Bearer ${accessToken}`
      const parts = accessToken
        .split(".")
        .map((part) => Buffer.from(part.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString())
      const { exp } = JSON.parse(parts[1])
      if (exp && exp < (Date.now() + 1) / 1000) {
        const refreshToken = await SecureToken.getItemAsync("ie307_refresh_token")
        const response = await axios.post(`http://ie307.customafk.com/user`, { refresh: { refresh: refreshToken } })
        const { data } = response
        await SecureToken.setItemAsync("ie307_access_token", data.accessToken)
        await SecureToken.setItemAsync("ie307_refresh_token", data.refreshToken)
        config.headers["Authorization"] = `Bearer ${data.accessToken}`
      }
    }
    return config
  } catch (error: any) {
    console.log(error.response.status)
  }
}
const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  // console.log(error.request?.headers)
  console.log(error.request?.status)
  // console.log(error.request?.data)

  return Promise.reject(error.request)
}
const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response
}
const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  // console.log(error.response?.headers)
  console.error(error.response?.status)
  return Promise.reject(error.response)
}
const setupInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(onRequest, onRequestError)
  axiosInstance.interceptors.response.use(onResponse, onResponseError)
  return axiosInstance
}

setupInterceptors(axiosClient)
export { axiosClient }
