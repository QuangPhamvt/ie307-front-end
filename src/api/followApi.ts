import { axiosClient } from "./axiosClient"
import { PATH } from "./path"

export const followApi = {
  getFollowList: (): Promise<any> => {
    const url = PATH.FOLLOW_LIST
    return axiosClient.get(url)
  },
  postFollowing: <T extends { following_id: string }>(payload: T) => {
    const { following_id } = payload
    const url = PATH.POST_FOLLOWING
    return axiosClient.post(url, { following_id })
  },
  postUnFollowing: <T extends { following_id: string }>(payload: T) => {
    const { following_id } = payload
    const url = PATH.POST_UN_FOLLOWING
    return axiosClient.post(url, { following_id })
  },
}
