import { axiosClient } from "./axiosClient"
import { PATH } from "./path"

export const chatApi = {
  getSummarized: (): Promise<any> => {
    const url = PATH.CHAT_SUMMARIZED
    return axiosClient.get(url)
  },
  postOriginChat: (payload: { user_id: string }): Promise<any> => {
    const { user_id } = payload
    const url = PATH.CHAT_ORIGIN
    return axiosClient.post(url, { user_id })
  },
}
