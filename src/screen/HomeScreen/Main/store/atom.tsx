import { atom } from "recoil"

export type TPostItem = {
  id: string
  image: string
  heightImage: number
}
export type TPostListState = {
  state: "idle" | "loading" | "hasValue" | "hasError"
  data: {
    postList: TPostItem[]
    limt: number
    nextPage: number
  }
}
export const postListState = atom<TPostListState>({
  key: "postListState",
  default: {
    state: "idle",
    data: {
      postList: [],
      limt: 5,
      nextPage: 1,
    },
  },
})
