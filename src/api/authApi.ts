import { axiosClient } from "./axiosClient"
import { PATH } from "./path"

export const authApi = {
  getProfile: (): Promise<any> => {
    const url = PATH.USER_PROFILE
    return axiosClient.get(url)
  },
  postSignIn: <T extends { email: string; password: string }>(payload: T): Promise<any> => {
    const { email, password } = payload
    const url = PATH.LOG_IN
    return axiosClient.post(url, { email, password })
  },
  postSignUp: <T extends { email: string; username: string; password: string }>(props: T): Promise<any> => {
    const { email, username, password } = props
    const url = PATH.SIGN_UP
    return axiosClient.post(url, { email, username, password })
  },
  postRefresh: <T extends { refresh: string }>(data: T) => {
    const url = PATH.USER
    return axiosClient.post(url, { refresh: data })
  },
  postUploadAvatar: <T extends { avatar: string }>(payload: T): Promise<any> => {
    const { avatar } = payload
    const url = PATH.USER_UPLOAD
    return axiosClient.post(url, { avatar })
  },
}
