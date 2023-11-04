import { axiosClient } from "./axiosClient"
import { PATH } from "./path"

export const authApi = {
  getProflie: (): Promise<any> => {
    const url = PATH.USER_PROFILE
    return axiosClient.get(url)
  },
  postSignIn: <T extends { email: string; password: string }>(data: T): Promise<any> => {
    const url = PATH.USER
    return axiosClient.post(url, { signIn: data })
  },
  postSignUp: <T extends { email: string; username: string; password: string }>(data: T): Promise<any> => {
    const url = PATH.USER
    return axiosClient.post(url, { signUp: data })
  },
  postRefresh: <T extends { refresh: string }>(data: T) => {
    const url = PATH.USER
    return axiosClient.post(url, { refresh: data })
  },
}
