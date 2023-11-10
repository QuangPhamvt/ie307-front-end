import { axiosClient } from "./axiosClient"
import { PATH } from "./path"

export const chatApi = {
  getSummarized: (): Promise<any> => {
    const url = PATH.CHAT_SUMMARIZED
    return axiosClient.get(url)
  },
}
