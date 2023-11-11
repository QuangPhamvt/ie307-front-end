import { axiosClient } from "./axiosClient"
import { PATH } from "./path"

export const chatApi = {
  getSummarized: (): Promise<any> => {
    const url = PATH.CHAT_SUMMARIZED
    return axiosClient.get(url)
  },
  postOriginChat: (payload: string): Promise<any> => {
    const url = PATH.CHAT_ORIGIN
    return axiosClient.post(url, { detail: { receiver_id: payload } })
  },
}
