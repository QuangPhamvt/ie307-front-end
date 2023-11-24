import { axiosClient } from "./axiosClient"
import { PATH } from "./path"

export const postApi = {
  postList: <T extends { limit: number; page: number }>(payload: T): Promise<any> => {
    const { limit, page } = payload
    const url = PATH.POST_LIST
    return axiosClient.post(url, { limit, page })
  },
  search: <T extends { search: string }>(payload: T): Promise<any> => {
    const { search } = payload
    const url = PATH.POST_SEARCH
    return axiosClient.post(url, { search })
  },
  originPost: <T extends { post_id: string }>(payload: T): Promise<any> => {
    const { post_id } = payload
    const url = PATH.POST_ORIGIN
    return axiosClient.post(url, { post_id })
  },
  uploadPost: <T extends { title: string; image: string }>(payload: T): Promise<any> => {
    const { title, image } = payload
    const url = `${PATH.POST_UPLOAD}`
    return axiosClient.post(url, { title, image })
  },
}
