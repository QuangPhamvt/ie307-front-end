import { axiosClient } from "./axiosClient"
import { PATH } from "./path"

export const UserApi = {
  postOriginUser: <T extends { user_id: string }>(payload: T): Promise<any> => {
    const { user_id } = payload
    const url = PATH.ORIGIN_USER
    return axiosClient.post(url, { user_id })
  },
}
