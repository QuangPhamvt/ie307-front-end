import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil"
import { authState } from "../recoil/atom"
import { authApi } from "../api"
import React from "react"
import { SetAccessTokenSecureStore, SetRefreshTokenSecureStore, encodeJWT } from "../utilities"
import { logInState } from "../screen/LogInScreen/store"
import { registerFormState } from "~/src/screen/RegisterScreen/store"
import { postListState } from "../screen/HomeScreen/Main/store"

const useLogIn = () => {
  const setAuthState = useSetRecoilState(authState)
  const {
    contents: { email, password },
  } = useRecoilValue(logInState)

  const handleLogIn = React.useCallback(async () => {
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
      setAuthState((preState) => ({ ...preState, state: "hasError", message: error.data.message }))
    }
  }, [email, password])
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
  const handleLogOut = () => {
    resetLogIn()
    resetRegister()
    resetPostList()
    resetAuth()
  }
  return { handleLogOut }
}

const Auth = {
  useLogIn,
  useRegister,
  useLogOut,
}
export default Auth