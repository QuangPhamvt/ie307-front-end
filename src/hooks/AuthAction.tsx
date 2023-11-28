import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil"
import { authState, followListState } from "../recoil/atom"
import { authApi } from "../api"
import React from "react"
import { SetAccessTokenSecureStore, SetRefreshTokenSecureStore, checkIsMail, encodeJWT } from "../utilities"
import { logInState } from "../screen/LogInScreen/store"
import { registerFormState } from "~/src/screen/RegisterScreen/store"
import { postListState } from "../screen/HomeScreen/Main/store"
import { followApi } from "~/src/api/followApi"
import { websocketState } from "../websocket/store"

const useLogIn = () => {
  const setAuthState = useSetRecoilState(authState)
  const {
    contents: { email, password },
  } = useRecoilValue(logInState)

  const handleLogIn = async () => {
    try {
      setAuthState((preState) => ({ ...preState, state: "isLoading" }))
      if (!email || !password) throw { data: { message: "Some thing wrong" } }

      const {
        data: { message, data },
      } = await authApi.postSignIn({ email, password })
      await SetAccessTokenSecureStore(data[0].access_token)
      await SetRefreshTokenSecureStore(data[0].refresh_token)
      const { id, username, avatar } = encodeJWT(data[0].access_token)
      setAuthState({
        state: "hasValue",
        message: message,
        contents: { id, username, avatar },
      })
    } catch (error: any) {
      console.error("response")
      console.error(error.data)
      const message = error.data.message
      setAuthState((preState) => ({ ...preState, state: "hasError", message }))
    }
  }
  return { handleLogIn }
}

const useRegister = () => {
  const {
    contents: { email, username, password },
  } = useRecoilValue(registerFormState)
  const setAuthState = useSetRecoilState(authState)
  const resetRegisterForm = useResetRecoilState(registerFormState)
  const handleRegister = async () => {
    try {
      if (!email || !username || !password) {
        console.log("error")
        throw { data: { message: "Some thing wrong" } }
      }
      if (!checkIsMail(email)) {
        console.log("error")
        throw { data: { message: "Email not accept" } }
      }
      setAuthState((preState) => ({ ...preState, state: "isLoading" }))
      const {
        data: { message, data },
      } = await authApi.postSignUp({ email, password, username })
      await SetAccessTokenSecureStore(data[0].access_token)
      await SetRefreshTokenSecureStore(data[0].refresh_token)
      const { id, username: Username, avatar } = encodeJWT(data[0].access_token)
      setAuthState({
        state: "hasValue",
        message: message,
        contents: { id, username: Username, avatar },
      })
      resetRegisterForm()
    } catch (error: any) {
      console.error("response")
      console.error(error.data)
      setAuthState((preState) => ({ ...preState, state: "hasError", message: error.data.message }))
    }
  }
  return { handleRegister }
}
const useLogOut = () => {
  const resetLogIn = useResetRecoilState(logInState)
  const resetRegister = useResetRecoilState(registerFormState)
  const resetAuth = useResetRecoilState(authState)
  const resetPostList = useResetRecoilState(postListState)
  const resetFollowList = useResetRecoilState(followListState)
  const resetWebsocket = useResetRecoilState(websocketState)
  const handleLogOut = () => {
    resetLogIn()
    resetRegister()
    resetPostList()
    resetFollowList()
    resetAuth()
    resetWebsocket()
  }
  return { handleLogOut }
}

const useGetFollowList = () => {
  const setFollowListState = useSetRecoilState(followListState)
  const handleGetFollowList = async () => {
    try {
      setFollowListState({ state: "isLoading", message: null, contents: [] })
      const {
        data: { data, message },
      } = await followApi.getFollowList()
      setFollowListState({ state: "hasValue", message, contents: data })
    } catch (error: any) {
      console.log(error.data)
      setFollowListState({ state: "hasError", message: error.data.message, contents: [] })
    }
  }
  return { handleGetFollowList }
}

const Auth = {
  useLogIn,
  useRegister,
  useLogOut,
  useGetFollowList,
}
export default Auth
