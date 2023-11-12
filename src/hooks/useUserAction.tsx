import { useRecoilState, useResetRecoilState } from "recoil"
import { authState } from "../recoil/atom"
import { authApi } from "../api"
import * as SecureStore from "expo-secure-store"
import React from "react"
import { useNavigation } from "@react-navigation/native"

export const useUserAction = () => {
  const [_, setAuth] = useRecoilState(authState)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const navigation = useNavigation()

  const logIn = React.useCallback(async <T extends { email: string; password: string }>(payload: T) => {
    setIsLoading(true)
    try {
      const response = await authApi.postSignIn(payload)
      if (response.status === 200) {
        await SecureStore.setItemAsync("ie307_access_token", response.data.accessToken)
        await SecureStore.setItemAsync("ie307_refresh_token", response.data.refreshToken)
        await getUserProfile()
      }
      setIsLoading(false)
    } catch (error: any) {
      console.log(error)
      if (error.status === 400) {
        console.log("response")
        setAuth({ state: "hasError", data: { message: error.data.message } })
      }
      setIsLoading(false)
    }
  }, [])

  const logOut = React.useCallback(async () => {
    await SecureStore.deleteItemAsync("ie307_access_token")
    await SecureStore.deleteItemAsync("ie307_refresh_token")
    setAuth({ state: "idle", data: {} })
    navigation.reset
  }, [])

  const getUserProfile = React.useCallback(async () => {
    setIsLoading(true)
    const response = await authApi.getProflie()
    if (response.status === 200) {
      setAuth({ state: "hasValue", data: response.data })
    }
    setIsLoading(false)
  }, [])
  const register = React.useCallback(
    async <T extends { email: string; password: string; username: string }>(payload: T) => {
      setIsLoading(true)
      try {
        const response = await authApi.postSignUp(payload)
        if (response.status === 200) {
          await SecureStore.setItemAsync("ie307_access_token", response.data.accessToken)
          await SecureStore.setItemAsync("ie307_refresh_token", response.data.refreshToken)
          await getUserProfile()
        }
        setIsLoading(false)
      } catch (error: any) {
        console.log(error)
        setAuth({ state: "hasError", data: { message: error.data.message } })
        setIsLoading(false)
      }
    },
    [],
  )
  return { isLoading, register, logIn, logOut, getUserProfile }
}
