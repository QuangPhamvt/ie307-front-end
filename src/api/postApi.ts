import { axiosClient } from "./axiosClient"
import { PATH } from "./path"

export const postApi = {
  postList: <T extends { limit: number; page: number }>(payload: T): Promise<any> => {
    const url = `${PATH.POST}`
    return axiosClient.post(url, { postList: payload })
  },
  search: <T extends { search: string }>(payload: T): Promise<any> => {
    const url = `${PATH.POST}`
    return axiosClient.post(url, { search: payload })
  },
  originPost: <T extends { postId: string }>(payload: T): Promise<any> => {
    const url = `${PATH.POST}`
    return axiosClient.post(url, { originPost: payload })
  },
  uploadPost: (payload: any): Promise<any> => {
    const url = `${PATH.POST_UPLOAD}`
    return axiosClient.post(url, payload)
  },
}
