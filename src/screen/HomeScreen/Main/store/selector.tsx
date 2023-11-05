import { selector, selectorFamily } from "recoil"
import { TPostListState, postListState } from "./atom"
import { postApi } from "../../../../api"

export const getDataPostList = selector({
  key: "getDataPostList",
  get: ({ get }) => {
    return get(postListState).data
  },
})
export const getStatePostList = selector({
  key: "getStatePostList",
  get: ({ get }) => {
    return get(postListState).state
  },
})
